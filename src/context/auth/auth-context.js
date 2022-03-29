/*
Created by: kathe
On: 26-Nov-21 : 26-Nov
*/
import React, { useEffect, useState } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { children } = props;

  useEffect(() => {
    const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedUserLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoOutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  const logInHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  // eslint-disable-next-line max-len
  return <AuthContext.Provider value={{ isLoggedIn, onLogout: logoOutHandler, onLogin: logInHandler }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
