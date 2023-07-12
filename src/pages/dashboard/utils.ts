import { ProductStatus } from "../../services/product-details/product-details.interface";
import { differenceInMonths } from "date-fns";

import config from "../../products-config.json";

type Args = {
    productStatus?: ProductStatus
    product: string
}

type ReturnType = "success" | "warning" | "error" | undefined;

const CUSTOM_CONFIGURATION = ["wordpress", "laravel"]

export const checkProductsReleases = ({ productStatus, product }: Args): ReturnType => {
    if (!productStatus) return;

    if (CUSTOM_CONFIGURATION.includes(product)) {        
        return customConfiguration(productStatus, product);
    }
    
    if (isHigherThanThreshold(productStatus.eol, product) || isHigherThanThreshold(productStatus.support, product)) {
        return "success";
    }

    if (isBetweenThreshold(productStatus.eol, product) || isBetweenThreshold(productStatus.support, product)) {
        return "warning";
    }

    return "error";
}

const customConfiguration = (productStatus: ProductStatus, product: string): ReturnType => {
    if (product === "wordpress") return wordpressConfiguration(productStatus);
    return laravelConfiguration(productStatus)
}

const wordpressConfiguration = (productStatus: ProductStatus): ReturnType => {    
    if (productStatus.support === undefined) return;
    if (productStatus.support === false) return "error";
    if (productStatus.support === true) return "success";
    if (isHigherThanThreshold(productStatus.support, "wordpress")) return "success";
    if (isBetweenThreshold(productStatus.support, "wordpress")) return "warning";
    return "error";
}

const laravelConfiguration = (productStatus: ProductStatus): ReturnType => {    
    if (isHigherThanThreshold(productStatus.support, "laravel")) return "success";
    if (isBetweenThreshold(productStatus.support, "laravel")) return "warning";
    return "error";
}

const isHigherThanThreshold = (date: boolean | string, product: string) => {
    const configuration: any = config;
    const [_, maxThreshold] = configuration[product].threshold_to_outdate_in_months
    return typeof date === 'string' && differenceInMonths(new Date(date), Date.now()) > maxThreshold;
}

const isBetweenThreshold = (date: boolean | string, product: string) => {
    if (typeof date !== 'string') return false;
    const configuration: any = config;
    const [minThreshold, maxThreshold] = configuration[product].threshold_to_outdate_in_months
    const diffSupportDate = differenceInMonths(new Date(date), Date.now());
    return diffSupportDate >= minThreshold && diffSupportDate < maxThreshold;
}

export const buildKey = (name: string, cycle: string) => `${name}|${cycle}`;

export const getName = (key?: string) => key?.split("|")[0];

export const getCycle = (key?: string) => key?.split("|")[1];