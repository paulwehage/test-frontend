import { Box, Button, Stack, Typography, Card, Divider } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import * as React from 'react';
import { Auth } from 'aws-amplify';
import { DocumentationButton, HeaderSection, LogoutButton, Wrapper } from './styles';
import { useEffect, useState } from 'react';
import LanguageSwitcher from '../languageSwitcher';
import { useTranslation } from 'react-i18next';
import logo from "../../assets/Logo_pl-x_1652x385.png";

function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [name, setName] = useState('');
    
    const handleSignOut = async () => {
        try {
            const signOutRedirectUrl = `${process.env.REACT_APP_REDIRECT_SIGN_OUT}`;
    
            await Auth.signOut({
                global: true,
            }).then(() => window.location.href = 'http://localhost:3000')
    
            
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {        
        Auth.currentAuthenticatedUser()
            .then((user) => {
                setLoggedIn(true);
                setName(
                    user.attributes.given_name +
                        ' ' +
                        user.attributes.family_name
                );
            })
            .catch((e) => {
                console.error(e);
                setLoggedIn(false);
            });
    }, [loggedIn]);

    const { t } = useTranslation();

    return (
        <Wrapper
            id="mainHeader"
            
        >
            <HeaderSection />
            <Box
                component="a"
                href="/"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box
                    component="img"
                    sx={{
                        display: 'block',
                        width: 240,
                        margin: 0,
                    }}
                    src={logo}
                    alt=""
                />
                <Divider style={{ marginTop: '5px', width: '100%' }} />
                <Typography color="gray" fontSize={15}>Version Tracker</Typography>
            </Box>

            <HeaderSection>
                <Stack alignItems="flex-end" spacing={0.5}>
                    { loggedIn && (
                        <Box
                            display="flex"
                            gap="0.6rem"
                            alignContent="center"
                            justifyContent="center"
                        >
                            <Typography alignSelf="center" color="black">
                                {t('home.header.hello')} {name}
                            </Typography>
                            <Typography color="black" alignSelf="center" fontWeight="bold">
                                |
                            </Typography>
                            <Typography>
                                <LogoutButton
                                    variant="text"
                                    type="button"
                                    name="logout"
                                    className="btn-style"
                                    onClick={() => handleSignOut()}
                                    style={{
                                      textTransform: 'none',
                                      minWidth: 0,
                                      padding: '5px 0',
                                    }}
                                >
                                    {t('home.header.logout')}
                                </LogoutButton>
                            </Typography>
                        </Box>
                    )}
                    
                    <LanguageSwitcher />
                </Stack>
            </HeaderSection>
        </Wrapper>
    );
}

export default Header;
