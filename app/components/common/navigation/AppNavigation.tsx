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
    <Stack.Screen name="CustomerBottomNavigation" component={CustomerBottomNavigation}/>
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
// import React, { useEffect, useState } from 'react';
// import { Alert } from 'react-native';
// import { useSelector } from 'react-redux';
// import { RootState } from '../../../redux/store';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Splash from '../../splash/Splash';
// import Login from '../../login/Login';
// import CustomerBottomNavigation from './customerNavigation/CustomerBottomNavigation';
// const Stack = createNativeStackNavigator();
// const AuthNavigation = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen name="Splash" component={Splash} />
//       <Stack.Screen name="Login" component={Login} />
//       <Stack.Screen name="CustomerBottomNavigation" component={CustomerBottomNavigation}/>
//     </Stack.Navigator>
//   );
// };

// const AppNavigation = () => {
//   const { token } = useSelector((state: RootState) => state.Auth);
//   const [alertVisible, setAlertVisible] = useState(false);

//   useEffect(() => {
//     if (token && !alertVisible) {
//       // Display an alert when a token is present
//       Alert.alert(
//         'Token Present',
//         'Click OK to navigate to home page',
//         [
//           {
//             text: 'OK',
//             onPress: () => setAlertVisible(true),
//           },
//         ],
//         { cancelable: false }
//       );
//     }
//   }, [token, alertVisible]);

//   useEffect(() => {
//     if (alertVisible) {
//       // Perform the navigation to the home page
//       // (e.g., navigate to CustomerBottomNavigation)
//       console.log('Navigating to home page...');
//     }
//   }, [alertVisible]);

//   return token ? <CustomerBottomNavigation /> : <AuthNavigation />;
// };

// export default AppNavigation;
