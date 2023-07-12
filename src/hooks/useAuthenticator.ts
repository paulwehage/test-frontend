/* eslint-disable no-console */
import { useState, useEffect, useCallback } from 'react';
import  { Amplify, Auth, Hub } from 'aws-amplify';

export default function useAuthenticator() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState('');

  const fetchToken = useCallback(() => {
    const getToken = async () => {
      const stoken = (await Auth.currentSession()).getIdToken().getJwtToken();
      return stoken;
    };
    return getToken();
  }, []);

  useEffect(() => {
    const apiName = process.env.API_DOMAIN;
    Amplify.configure({
        Auth: {
          region: 'eu-central-1',
              userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
              userPoolId: process.env.REACT_APP_USER_POOL_ID,
              oauth: {
                  domain: process.env.REACT_APP_AUTH_DOMAIN,
                  scope: ['email', 'openid', 'aws.cognito.signin.user.admin'],
                  redirectSignIn: process.env.REACT_APP_REDIRECT_SIGN_IN,
                  redirectSignOut: process.env.REACT_APP_REDIRECT_SIGN_OUT,
                  responseType: 'token',
              },
              federationTarget: 'COGNITO_USER_POOLS',
              API: {
                  endpoints: [
                      {
                          name: 'linksplitter',
                          endpoint: apiName,
                          custom_header: async () => ({
                              Authorization: `Bearer ${fetchToken()}`,
                          }),
                      },
                  ],
              },
          },
      });
  }, [fetchToken]);

  const handleLogin = useCallback(() => {
    const sigIngOptions = {
      customProvider: process.env.REACT_APP_AUTH_PROVIDER || '',
    };
    Auth.federatedSignIn(sigIngOptions);
  }, []);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    Auth.currentSession()
      .then((session) => {
        if (session.getIdToken().getJwtToken()) {
          setToken(session.getIdToken().getJwtToken());
        }
      })
      .catch((err) => {
        console.error(err);
        if (window.location.pathname !== '/') {
          window.location.replace('/');
        }
      });
  }, []);

  useEffect(() => {
    Hub.listen('auth', ({ payload: { event, data } }) => {
      const signUser = () => {
        setCurrentUser(data);
      };

      if (event === 'signIn') {
        signUser();
      } else if (event === 'signOut') {
        setCurrentUser(null);
      } else if (event === 'customOAuthState') {
        signUser();
      }
    });
  }, []);

  useEffect(() => {
    setIsAuthenticated(token.length > 0);
  }, [token]);

  return {
    currentUser,
    isAuthenticated,
    token,
    handleLogin,
    fetchToken,
  };
}
