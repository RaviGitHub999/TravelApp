import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../../splash/Splash';
import Login from '../../login/Login';
import SignUp from '../../signUp/SignUp';
import Role from '../../role/Role';
import CustomerNavigation from './customerNavigation/CustomerNavigation';
import CustomerBottomNavigation from './customerNavigation/CustomerBottomNavigation';
const Stack = createNativeStackNavigator();
const AuthNavigation=()=>
{
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Splash" component={Splash} />
    {/* <Stack.Screen name="Role" component={Role} /> */}
    <Stack.Screen name="Login" component={Login} />
    {/* <Stack.Screen name="SignUp" component={SignUp} /> */}
    {/* <Stack.Screen name="CustomerBottomNavigation" component={CustomerBottomNavigation}/> */}
  </Stack.Navigator>
  )
}
const MainNavigation:React.FC<{userRole:string}>=({userRole})=>{
    switch (userRole) {
        case "user":
          return <CustomerNavigation/>;
          case "admin":
            return <></>;
        default:
            return <></>
    }

}



const AppNavigation = () => {
 const{userRole,token}= useSelector((state:RootState)=>state.Auth)
  // return token?  <MainNavigation userRole={userRole}/>:<AuthNavigation/>
  return token?<CustomerBottomNavigation/>:<AuthNavigation/>
}

export default AppNavigation