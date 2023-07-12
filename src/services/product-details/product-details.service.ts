import { api } from "../../utils/api";
import { ProductDetailsResponse, ProductStatus } from "./product-details.interface";
import { sanitizeProductStatus } from "./utils";

export type ProductDetails = {
    [key: string]: {
        [key: string]: ProductStatus
    }
}

const URL = "/products";

const get = async (): Promise<ProductDetails> => {
    const response = await api(URL);    
    const data: ProductDetailsResponse = await response.json();
    
    return data.body.reduce((acc, { name, status, version }) => ({
        ...acc,
        [name]: {
            ...acc[name],
            [version]: sanitizeProductStatus(status),
        }
    }), {} as ProductDetails);
}

export const ProductDetailsService = {
    get
} as const