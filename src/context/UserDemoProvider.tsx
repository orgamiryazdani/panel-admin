import { createContext, useState, ReactNode, useContext } from "react";
import { UserType } from "../types/Auth";

type UserDemoContextType = {
  userDemoData: Omit<UserType, "id">;
  setUserDemoData: React.Dispatch<React.SetStateAction<Omit<UserType, "id">>>;
  updateUserDemoField: (
    field: keyof Omit<UserType, "id">,
    value: string | string[],
  ) => void;
};

const UserDemoContext = createContext<UserDemoContextType | undefined>(
  undefined,
);

export const UserDemoProvider = ({ children }: { children: ReactNode }) => {
  const [userDemoData, setUserDemoData] = useState<Omit<UserType, "id">>({
    name: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
  });

  const updateUserDemoField = (
    field: keyof Omit<UserType, "id">,
    value: string | string[],
  ) => {
    setUserDemoData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  return (
    <UserDemoContext.Provider
      value={{ userDemoData, setUserDemoData, updateUserDemoField }}>
      {children}
    </UserDemoContext.Provider>
  );
};

export const useUserDemo = () => {
  const context = useContext(UserDemoContext);

  if (context === undefined)
    throw new Error("useUserDemo must be used within a UserDemoProvider");

  return context;
};
