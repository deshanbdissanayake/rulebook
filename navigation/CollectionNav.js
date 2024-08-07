import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import CollectionListScreen from '../screens/CollectionListScreen';
import CollectionAddScreen from '../screens/CollectionAddScreen';

const Stack = createStackNavigator();

const CollectionNav = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Collection List" component={CollectionListScreen} options={{headerShown: false}} />
        <Stack.Screen name="Add Collection" component={CollectionAddScreen} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}

export default CollectionNav