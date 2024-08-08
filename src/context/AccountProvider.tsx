import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { dataLoginType, UserAccount } from "../types/Auth";
import { cleanupOldAccounts } from "../utils/cleanupOldAccounts";
import Cookies from "universal-cookie";

interface AccountContextProps {
  allUserAccount: UserAccount[];
  changeAccount: (email: string) => void;
  updateAccount: (data: dataLoginType) => void;
  saveAccount: (data: dataLoginType) => void;
  removeAccount: () => void;
  logout: (email: string | undefined) => void;
}

const cookies = new Cookies();

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined,
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [allUserAccount, setAllUserAccount] = useState<UserAccount[]>(
    JSON.parse(localStorage.getItem("AllEmailAccount") || "[]"),
  );

  useEffect(() => {
    cleanupOldAccounts(); // فراخوانی تابع پاکسازی
  }, []);

  const changeAccount = (email: string) => {
    const updatedAccounts = allUserAccount.map((account) => ({
      ...account,
      selected: account.email === email,
    }));

    setAllUserAccount(updatedAccounts);
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    window.location.reload();
  };

  let updatedAccounts: UserAccount[] = [];

  const updateAccount = (data: dataLoginType) => {
    updatedAccounts = [
      ...allUserAccount.filter((account) => account.email !== data.email),
      { email: data.email, selected: false, addedTime: Date.now() }, // افزودن تایم‌استمپ
    ];
    setAllUserAccount(updatedAccounts); // این خط اضافه شد
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
  };

  const saveAccount = (data: dataLoginType) => {
    updatedAccounts.forEach((account) => {
      account.selected = account.email === data.email;
    });
    setAllUserAccount(updatedAccounts); // این خط اضافه شد
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
  };

  const removeAccount = () => {
    localStorage.setItem("AllEmailAccount", JSON.stringify(allUserAccount));
  };

  const logout = (email: string | undefined) => {
    const accountRemove = allUserAccount.filter(
      (account) => account.email !== email,
    );
    localStorage.setItem("AllEmailAccount", JSON.stringify(accountRemove));
    cookies.remove(`access-token-${email}`);
    cookies.remove(`refresh-token-${email}`);
    window.location.reload();
  };

  return (
    <AccountContext.Provider
      value={{
        allUserAccount,
        changeAccount,
        updateAccount,
        saveAccount,
        removeAccount,
        logout,
      }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => {
  const context = useContext(AccountContext);

  if (context === undefined)
    throw new Error("useAccount must be used within a AccountProvider");

  return context;
};
