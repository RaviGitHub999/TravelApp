import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Home from '../../../home/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Demo1=()=><></>
const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();
// const HomeStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="dummy" component={Demo1} />
//       {/* <Stack.Screen name="OtherScreen" component={OtherScreen} /> */}
//     </Stack.Navigator>
//   );
// };

const CustomerBottomNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Demo1} />
      <Tab.Screen name="Settings" component={Demo1} />
      <Tab.Screen name="Profile" component={Demo1} />
    </Tab.Navigator>
  )
}

export default CustomerBottomNavigation