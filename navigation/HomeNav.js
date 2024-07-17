import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Vendor/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Notification Screen" component={NotificationScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav