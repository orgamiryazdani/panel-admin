// import { UseFormRegister, RegisterOptions } from "react-hook-form";

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

// export interface InputProps {
//     type?: string;
//     name: keyof FormData;
//     register: UseFormRegister<FormData>; // تایپ‌گذاری register با UseFormRegister<FormData>
//     validationSchema: RegisterOptions;
//     errors?: Record<keyof FormData, { message: string }>; // تایپ‌گذاری errors با Record<keyof FormData, { message: string }>
//     placeholder: string;
// }

export interface CreateProduct {
    title: string;
    price: number;
    description: string;
    categoryId: number;
}