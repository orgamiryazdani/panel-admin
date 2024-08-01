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