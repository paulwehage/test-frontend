import React from 'react';
import { Box, Button, CardContent, Container, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as S from "./styles";
import logo from "../../assets/Logo_pl-x_1652x385.png";
import LanguageSwitcher from '../languageSwitcher';
import {ReactComponent as MicrosoftLogo} from '../../assets/MSFT.svg';
import useAuthenticator from '../../hooks/useAuthenticator';


interface iCard {
    title: string;
    content: string;
  }

function MainCard({ title, content} : iCard) {
  const { t } = useTranslation();
  const { handleLogin: login } = useAuthenticator();

  const handleLogin = () => login();

  return (
    <Box margin="auto 0">
      <S.CustonCard>
        <S.LogoContainer>
          <S.LogoImage src={logo} />
        </S.LogoContainer>
        <CardContent style={{ padding: 0 }}>
          <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
            <Typography variant="h5" component="div" fontWeight="bold" color="text.secondary" style={{ fontSize: "17px"}}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" style={{ margin: "20px 0" }}>
              {content}
            </Typography>
            <Button variant="contained" startIcon={<MicrosoftLogo style={{height:15, width:15}} />} onClick={handleLogin} style={{ margin: 0, textTransform:'none', fontWeight:'bold' }}>{t('welcome.login')}</Button>
          </Box>
        </CardContent>
        <Box style={{ position: 'absolute', right: 20, top: 20 }}>
          <LanguageSwitcher />
        </Box>
      </S.CustonCard>
    </Box>
  );
}

export default MainCard;