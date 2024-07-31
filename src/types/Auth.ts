export type dataLoginType = {
    email: string;
    password: string;
}

export type dataSignUpType = {
    name: string;
    email: string;
    password: string;
}

export type UserAccount = {
    email: string;
    selected: boolean;
}

export type UserType = {
    id: number;
    email: string;
    password: string;
    name: string;
    role: string;
    avatar: string;
}