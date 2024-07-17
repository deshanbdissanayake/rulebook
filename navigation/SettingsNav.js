import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SettingsScreen from '../screens/Vendor/SettingsScreen';
import ProfileScreen from '../screens/Vendor/ProfileScreen';
import ProfileEditScreen from '../screens/Vendor/ProfileEditScreen';
import PasswordChange from '../screens/Vendor/PasswordChange';

const Stack = createStackNavigator();

const SettingsNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Settings Screen" component={SettingsScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile Screen" component={ProfileScreen} options={{headerShown: false}} />
        <Stack.Screen name="Profile Edit Screen" component={ProfileEditScreen} options={{headerShown: false}} />
        <Stack.Screen name="Password Change Screen" component={PasswordChange} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default SettingsNav