import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../../home/Home';
const Demo1=()=><></>
const Tab = createBottomTabNavigator();
const CustomerBottomNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Demo1} />
      <Tab.Screen name="Settings" component={Demo1} />
      <Tab.Screen name="Profile" component={Demo1} />
    </Tab.Navigator>
  )
}

export default CustomerBottomNavigation