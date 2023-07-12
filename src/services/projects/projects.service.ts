import { api } from "../../utils/api";
import { ProjectsResponse, Projects } from "./projects.interface";

const URL = '/categories/:category/projects'

const get = async (category: string): Promise<Record<string, Projects[]>> => {  
  const response = await api(URL.replace(":category", category))
  const data: ProjectsResponse = await response.json();
  
  const removeWhenAPiReturnsTheCorrectValue = data.body.map(project => ({
    ...project,
    products: project.products.map((product) => ({
      ...product,
      cycle: product.cycle! || product.version!
    }))
  }))
  return { [category]: removeWhenAPiReturnsTheCorrectValue }
}

export const ProjectsService = {
  URL,
  get
} as const;