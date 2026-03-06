import type { Product } from "./product";

export type CartItem = {
    productId: string;
    title: string;
    price: number;
    image: { url: string; alt: string };
    quantity: number;
};