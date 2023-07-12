import useAuthenticator from "../hooks/useAuthenticator";
import { AuthService } from "../services/auth/auth.service";
import React, { ReactNode, createContext, useContext } from "react"



type AuthorizationContextType = {
    userHasPermission: boolean
    loading: boolean
    alreadyChecked: boolean
}

type Props = {
    children: ReactNode;
};

const authorizationDefaultValues: AuthorizationContextType = {
    userHasPermission: false,
    loading: false,
    alreadyChecked: false
}

const AuthorizationContext = createContext<AuthorizationContextType>(authorizationDefaultValues);

export const useAuthorization = () => useContext(AuthorizationContext);

export const AuthorizationProvider = ({ children }: Props) => {
    const { token } = useAuthenticator()
    const [userHasPermission, setUserHasPermission] = React.useState<boolean>(false);
    const [alreadyChecked, setAlreadyChecked] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const requestStarted = React.useRef(false);

    React.useEffect(() => {         
        if (token.length === 0 || requestStarted.current) return;
        setLoading(true);
        const checkUserPermission = async () => {
            requestStarted.current = true;
            const { statusCode } = await AuthService.get()
            setUserHasPermission(statusCode === 201)
            setLoading(false);
            setAlreadyChecked(true);            
        }
        checkUserPermission();
    }, [token])
        
    return (
        <AuthorizationContext.Provider value={{ userHasPermission, loading, alreadyChecked }}>
            {children}
        </AuthorizationContext.Provider>
    )
}