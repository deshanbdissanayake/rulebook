import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import QuoteAddScreen from '../screens/QuoteAddScreen';
import QuoteListScreen from '../screens/QuoteListScreen';

const Stack = createStackNavigator();

const QuoteNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Quote List" component={QuoteListScreen} options={{headerShown: false}} />
        <Stack.Screen name="Add Quote" component={QuoteAddScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default QuoteNav

const styles = StyleSheet.create({})