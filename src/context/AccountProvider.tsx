import { createContext, useState, ReactNode, useContext } from "react";
import { AccountContextProps, dataLoginType, UserAccount } from "../types/Auth";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const AccountContext = createContext<AccountContextProps | undefined>(
  undefined,
);

export const AccountProvider = ({ children }: { children: ReactNode }) => {
  const [allUserAccount, setAllUserAccount] = useState<UserAccount[]>(
    JSON.parse(localStorage.getItem("AllEmailAccount") || "[]"),
  );

  const changeAccount = (email: string) => {
    const updatedAccounts = allUserAccount.map((account) => ({
      ...account,
      selected: account.email === email,
    }));

    setAllUserAccount(updatedAccounts);
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
    window.location.reload();
  };

  const saveAccount = (data: dataLoginType) => {
    const updatedAccounts = [
      ...allUserAccount.filter((account) => account.email !== data.email),
      { email: data.email, selected: true, addedTime: Date.now() },
    ];
    setAllUserAccount(updatedAccounts);
    localStorage.setItem("AllEmailAccount", JSON.stringify(updatedAccounts));
  };

  const updateAccount = () => {
    if (allUserAccount.length > 1) {
      setAllUserAccount((prevAccounts) => {
        if (prevAccounts.length === 0) return prevAccounts; // اگر لیست خالی است، هیچ تغییری ایجاد نکنید

        const updatedAccounts = prevAccounts.map((account, index, array) => ({
          ...account,
          selected: index === array.length - 1, // آخرین اکانت selected = true است
        }));

        localStorage.setItem(
          "AllEmailAccount",
          JSON.stringify(updatedAccounts),
        );
        return updatedAccounts;
      });
    }
  };

  const removeAccount = () => {
    setAllUserAccount((prevAccounts) => prevAccounts.slice(0, -1));
    localStorage.setItem("AllEmailAccount", JSON.stringify(allUserAccount));
  };

  const removeAccountAfterReload = () => {
    localStorage.setItem(
      "AllEmailAccount",
      JSON.stringify(allUserAccount.slice(0, -1)),
    );
  };

  const logout = (email: string | undefined) => {
    const accountRemove = allUserAccount.filter(
      (account) => account.email !== email,
    );
    if (accountRemove.length > 0) {
      accountRemove[0].selected = true;
    }
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
        saveAccount,
        updateAccount,
        removeAccount,
        removeAccountAfterReload,
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