import { ReactNode } from "react";

export interface ApiError {
    response?: {
        data?: {
            message: string;
        };
    };
}

export interface FormData {
    title: string;
    price: number;
    description: string;
    categoryId: string;
}

export interface CreateProduct {
    title: string;
    price: number;
    description: string;
    categoryId: number;
}

export type sizeType = {
    size: number;
};

export type UiComponentType = {
    title: string;
    description?: string;
    cancelBtn?: string;
    acceptBtn?: string | ReactNode;
    onClick: () => void;
    children: ReactNode;
    trigger: ReactNode;
}