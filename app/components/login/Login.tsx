import { View, Text, BackHandler } from 'react-native'
import React, { useEffect } from 'react'

const Login = () => {
    useEffect(() => {
        // Set up the event listener for the hardware back button
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          // Perform any additional checks if needed
          // For example, if you want to confirm the exit with a dialog
    
          // Exit the app
          BackHandler.exitApp();
          return true; // Prevent default behavior (closing the app)
        });
    
        // Clean up the event listener when the component is unmounted
        return () => backHandler.remove();
      }, []);
  return (
    <View>
      <Text>Login</Text>
    </View>
  )
}

export default Login