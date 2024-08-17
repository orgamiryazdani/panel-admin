export type product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
}

export type queryStringType = {
    title: string
    offset: number;
    limit: number;
    price_min: number;
    price_max: number;
    categoryId: number
}