import { api } from "../../utils/api"
import { AuthResponse } from "./auth.interface"

const URL = "/auth"

const get = async (): Promise<AuthResponse> => {    
    try {
        const response = await api(URL);    
        const data = await response.json();
    
        return data;
    } catch (err) {        
        return { statusCode: 401 }
    }
    
}

export const AuthService = {
    get
} as const