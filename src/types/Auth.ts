export type dataLoginType = {
    email: string;
    password: string;
}

export type dataSignUpType = {
    name: string;
    email: string;
    password: string;
}

export interface UserAccount {
    email: string;
    selected: boolean;
    addedTime: number;
}


export type UserType = {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}

export interface AccountContextProps {
    allUserAccount: UserAccount[];
    changeAccount: (email: string) => void;
    saveAccount: (data: dataLoginType) => void;
    updateAccount: () => void;
    removeAccount: () => void;
    removeAccountAfterReload: () => void;
    logout: (email: string | undefined) => void;
  }
  