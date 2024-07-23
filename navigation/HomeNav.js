import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen';
import QuoteAddScreen from '../screens/QuoteAddScreen';

const Stack = createStackNavigator();

const HomeNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Home Screen" component={HomeScreen} options={{headerShown: false}} />
        <Stack.Screen name="Add Quote" component={QuoteAddScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default HomeNav