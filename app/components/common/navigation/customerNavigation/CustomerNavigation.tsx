import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../../../login/Login';
import CustomerBottomNavigation from './CustomerBottomNavigation';
const Stack = createNativeStackNavigator();
const CustomerNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}} >
    <Stack.Screen name="CustomerBottomNavigation" component={CustomerBottomNavigation} />
  </Stack.Navigator>
  )
}

export default CustomerNavigation