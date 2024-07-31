// AppContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAsyncData } from '../assets/data/async_storage';
import SplashScreen from '../screens/SplashScreen';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [navType, setNavType] = useState('drawer');
  const [userType, setUserType] = useState(null); //customer/vendor

  useEffect(()=>{
    checkUserExist();
  },[])

  const checkUserExist = async () => {
    try {
        let res = await getAsyncData('username');
        if (res) { // Check if `res` is not null or undefined
            setIsLoggedIn(true); // Update the logged-in state
        } else {
            setIsLoggedIn(false); // Optionally handle the case when no user exists
        }
    } catch (error) {
        console.error('Error at AppContext.js -> checkUserExist: ', error);
    } finally {
      setLoading(false);
    }
  };


  if(loading){
    return <SplashScreen/>
  }

  return (
    <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, isLoading, setIsLoading, navType, setNavType, userType, setUserType }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
    return useContext(AppContext);
}
