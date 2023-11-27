import { View, Text, Image } from 'react-native'
import React, { useEffect } from 'react'
import { splashimg } from './assets';

const Splash = ({navigation:{navigate}}) => {
    useEffect(()=>
    {
       setTimeout(() => {
        navigate("Login")
       }, 2000); 
    },[])
  return  <Image source={splashimg}  style={{height:"100%",width:"100%"}}/>
}
export default Splash