type ProductResponse = {
    name: string
    cycle?: string
    version?: string
}

type Product = {
    name: string
    cycle: string
}

export type ProjectsResponse = {
    body: Array<{
        category: string
        domain: string
        products: ProductResponse[]
    }>
}

export type Projects = {
    category: string
    domain: string
    products: Product[]
}