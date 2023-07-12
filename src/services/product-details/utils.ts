import { ProductStatus, ProductStatusResponse } from "./product-details.interface";

export const sanitizeProductStatus = (productStatus: ProductStatusResponse): ProductStatus => {
    const objectKeys = Object.keys(productStatus);
    return objectKeys.reduce((acc, key) => ({
        ...acc,
        [key]: castStringToBoolean(productStatus[key])  
    }), {} as ProductStatus)
}

export const sanitizeProductVersion = (productVersion: string) => {
    const versionSplited = productVersion.split('.');
    return versionSplited.length === 3 ? versionSplited.slice(0, 2).join(".") : versionSplited.join(".");
}

const castStringToBoolean = (value: string | boolean) => {
    if (value === 'false') return false;
    if (value === 'true') return true;
    return value;
}
