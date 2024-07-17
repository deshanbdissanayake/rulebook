import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductListScreen from '../screens/Vendor/ProductListScreen';
import ProductAddScreen from '../screens/Vendor/ProductAddScreen';
import ProductSingleScreen from '../screens/Vendor/ProductSingleScreen';

const Stack = createStackNavigator();

const ProductNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Product List Screen" component={ProductListScreen} options={{headerShown: false}} />
        <Stack.Screen name="Product Add Screen" component={ProductAddScreen} options={{headerShown: false}} />
        <Stack.Screen name="Product Single Screen" component={ProductSingleScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default ProductNav