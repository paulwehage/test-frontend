export type ProductStatusResponse = Record<string, string>

export type ProductStatus = Record<string, any>

type ProductDetails = {
    name: string
    version: string
    status: ProductStatusResponse  
}

export type ProductDetailsResponse = {
    body: ProductDetails[]
}