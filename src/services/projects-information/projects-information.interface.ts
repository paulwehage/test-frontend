type Product = {
    name: string
    version: string
}

export type ProjectsInformationResponse = {
    body: {
        category: string
        domain: string
        products: Product[]
    }
}

export type ProjectsInformation = {
    category: string
    domain: string
    products: Product[]
}