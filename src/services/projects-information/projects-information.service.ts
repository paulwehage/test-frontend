import { api } from "../../utils/api";
import { ProjectsInformation, ProjectsInformationResponse } from "./projects-information.interface";

const URL = '/categories/:category/projects/:project'

const get = async (category: string, project: string): Promise<ProjectsInformation> => {    
  const response = await api(URL.replace(":category", category).replace(":project", project))
  const data: ProjectsInformationResponse = await response.json();
  
  return data.body
}

export const ProjectsInformationService = {
  URL,
  get
} as const;