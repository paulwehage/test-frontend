import React from 'react';
import styles from "../../styles/Home.module.css";
import { Box, Icon, Typography } from '@mui/material';
import * as S from './styles';
import { useTranslation } from 'react-i18next';
import Header from '../../components/header';
import CancelIcon from '@mui/icons-material/Cancel';



const PermissionDenied = () => {
    const { t } = useTranslation();
    return (
        <main className={styles.main}>
            <Header />
            <S.MainBox>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <CancelIcon style={{ color: '#e53e3e', width: "4.5rem", height: "4.5rem" }} />
                </Box>                
                <Typography textAlign="center" mt="1.5rem" variant="h2" color="#474b4d" fontSize="32px" mb="1.5rem">{t('permissionDenied.headline')}</Typography>
                <Typography fontSize="16px" color="#2b2d2e" mb="2rem">{t('permissionDenied.text')}</Typography>
                <Typography color="#2b2d2e" fontSize="16px">{t('permissionDenied.footer')}</Typography>
            </S.MainBox>
        </main>
    )
}

export default PermissionDenied;