import * as DevClient from 'expo-dev-client';
import React, { useState, useEffect } from 'react';
import { Keyboard, StyleSheet, StatusBar, Platform, Alert } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';

import { AppProvider, useAppContext } from './context/AppContext';
import { colors } from './assets/colors/colors';

import SplashScreen from './screens/SplashScreen';
import LoginNav from './navigation/LoginNav';
import BottomNav from './navigation/BottomNav';
import DrawerNav from './navigation/DrawerNav';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createStackNavigator();

const App = () => {

  useEffect(()=>{
    // unfocus from text inputs when keyboard hides
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      // This will blur the currently focused input field
      Keyboard.dismiss();
    });

    return () => {
      keyboardDidHideListener.remove();
    };

  }, []);

  // load fonts
  const [fontsLoaded] = useFonts({
    'ms-light': require('./assets/fonts/Montserrat-Light.ttf'),
    'ms-regular': require('./assets/fonts/Montserrat-Regular.ttf'),
    'ms-semibold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
    'ms-bold': require('./assets/fonts/Montserrat-Bold.ttf'),
  }); 

  if (!fontsLoaded) {
    return <SplashScreen/>
  }

  return (
    <NavigationContainer>
      <AppProvider>
        <AppContent/>
      </AppProvider>
    </NavigationContainer>
  );
}

const AppContent = () => {
  const { isLoggedIn, navType, themeColor } = useAppContext();

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar backgroundColor={colors.white} barStyle="dark-content" />
        <Stack.Navigator>
          {!isLoggedIn ? (
            <Stack.Screen name="LoginNav" component={LoginNav} options={{headerShown: false}} />
          ) : (
            <>
              {navType == 'drawer' ? (
                <Stack.Screen name="DrawerNav" component={DrawerNav} options={{headerShown: false}} />
              ) : (
                <Stack.Screen name="BottomNav" component={BottomNav} options={{headerShown: false}} />
              )}
            </>
          )}
        </Stack.Navigator>
      </GestureHandlerRootView>
    </SafeAreaView>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
