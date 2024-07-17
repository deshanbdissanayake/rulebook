import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import OrderListScreen from '../screens/Vendor/OrderListScreen';
import OrderSingleScreen from '../screens/Vendor/OrderSingleScreen';

const Stack = createStackNavigator();

const ProductNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Order List Screen" component={OrderListScreen} options={{headerShown: false}} />
        <Stack.Screen name="Order Single Screen" component={OrderSingleScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default ProductNav