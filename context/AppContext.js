// AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [navType, setNavType] = useState('drawer');
  const [userType, setUserType] = useState(null); //customer/vendor

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, navType, setNavType, userType, setUserType }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    return useContext(AppContext);
}
