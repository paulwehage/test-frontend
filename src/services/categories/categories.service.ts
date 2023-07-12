import { api } from "../../utils/api"
import { Category } from "./categories.interface";

const URL = '/categories'

const get = async () => {  
  const response = await api(URL)    
  const data: Category = await response.json();

  return data.body.map(option => ({
    value: option,
    label: `${option.charAt(0).toUpperCase()}${option.slice(1)}` 
  }))
}

export const CategoriesService = {
  URL,
  get
} as const;