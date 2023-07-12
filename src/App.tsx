import React from 'react';
import styles from './styles/Home.module.css';
import Header from './components/header';
import MainCard from './components/card';
import { useTranslation } from 'react-i18next';
import Dashboard from './pages/dashboard';
import useAuthenticator from './hooks/useAuthenticator';
import { Box } from '@mui/material';
import { useAuthorization } from './context/authorization';
import { useNavigate } from 'react-router-dom';

export default function App() {
    const { t } = useTranslation();
    const { isAuthenticated } = useAuthenticator();
    const { userHasPermission, loading, alreadyChecked } = useAuthorization()    
    const navigate = useNavigate()


    React.useEffect(() => {             
        if (isAuthenticated && !userHasPermission && alreadyChecked) {
            navigate("/error/permission-denied")
        }
    }, [isAuthenticated, userHasPermission, alreadyChecked]);

    if (loading) {
        return (
            <Box display='flex' width='100%' height='100vh' alignItems='center' justifyContent='center'>
                <div className="lds-dual-ring"></div>
            </Box>
        );
    }
    
    return (
        !isAuthenticated && !userHasPermission ? (
            <main className={styles.main}>            
                <MainCard 
                    title={t('welcome.welcomeToPX')}
                    content={`${t('welcome.pleaseSignIn')}`}
                />
            </main>
        ): 
        <main className={styles.main}>
            <Header />
            <Dashboard/>            
        </main>
            
    );
}
