import { View, Text, BackHandler, StatusBar, TouchableOpacity, KeyboardAvoidingView, ScrollView, Alert, Button,ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomInput from '../common/customInput/CustomInput';
import CustomButton from '../common/customButton/CustomButton';
import { styles } from './styles';
import IconSwitcher from '../common/icons/IconSwitcher';
import { colors } from '../../config/theme';
import { translate } from '../../config/i18n';
import en from "../../config/locales/en"
import {useSelector,useDispatch} from "react-redux"
import { AppDispatch, RootState } from '../../redux/store';
import { handleOnChangeText, loginAction } from '../../redux/reducers/auth';
import auth from '@react-native-firebase/auth';
interface IProps{
  navigation:{
    navigate:(name:string)=>void,
    isFocused:()=>boolean,
  } 
}
const Login:React.FC<IProps> = ({navigation:{navigate,isFocused}}) => {
  const {userRole,loading,email,password}=useSelector((state:RootState)=>state.Auth)
  const dispatch:AppDispatch=useDispatch()
  const handleNavigation= async()=>
  {
    dispatch(loginAction({navigate}))
  }
  const handleChangeText=(event:string,name:string)=>
  {
dispatch(handleOnChangeText({event,name}))
  }
  // const handleSignOut = async () => {
  //   try {
  //     await auth().signOut();
  //     console.log('User signed out');
  //     // You can navigate to another screen or perform actions after successful sign-out
  //   } catch (erro:any) {
  //     console.error('Error signing out:', error.message);
  //     Alert.alert('Error', error.message);
  //   }
  // };
  // useEffect(() => {
  //   // Subscribe to changes in the user authentication state
  //   const unsubscribe = auth().onAuthStateChanged((authUser) => {
  //     setUser(authUser);
  //   });

  //   // Clean up the subscription when the component unmounts
  //   return () => unsubscribe();
  // }, []);
  // const handleCheckLoginStatus = () => {
  //   if (user) {
  //     // User is logged in
  //     console.log('User is logged in:', user.email);
  //   } else {
  //     // User is not logged in
  //     console.log('User is not logged in');
  //   }
  // };
  //()=>{dispatch(handletoken({navigate}))}
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFocused()) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [isFocused]);
  return (
   <KeyboardAvoidingView style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollContainer}>
      {loading&&<View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.facebook} />
        </View>}
     <View style={styles.mainContainer}>
      <StatusBar hidden={false} />
      <Text style={styles.title}>{translate(en.login.login)}</Text>
      <View style={styles.inputContainer}>
        <CustomInput iconComponentName={en.login.iconComponentName1} name={en.login.iconName1} placeHolder={en.login.placeHolder1} title={en.login.title1} iconsize={3.6} handleChange={handleChangeText} stateName='email' value={email}/>
        <CustomInput iconComponentName={en.login.iconComponentName2} name={en.login.iconName2} placeHolder={en.login.placeHolder2} title={en.login.title2} iconsize={3.6} handleChange={handleChangeText} stateName='password' value={password}/></View>
      <Text style={styles.forgotPassword}>{translate(en.login.forgotpassword)}</Text>
      <View style={styles.btnContainer}>
        <CustomButton title={translate(en.login.login)} handleSubmit={handleNavigation}/>
      </View>
      <View style={styles.loginMethodsContainer}>
        <Text style={styles.loginmethodsTitle}>{translate(en.login.loginMethosTitle)}</Text>
        <View style={styles.loginIconsMainContainer}>
          <View style={styles.iconContainer1}>
            <IconSwitcher componentName={en.login.iconComponentName3} iconName={en.login.iconName3} color={colors.white} iconsize={5.5} />
          </View>
          <View style={styles.iconContainer2}>
            <IconSwitcher componentName={en.login.iconComponentName4} iconName={en.login.iconName4} color={colors.white} iconsize={3.2} />
          </View>
        </View>
        {
          userRole==="admin"&&
          <View style={styles.loginPageSwitchContainer}>
          <Text style={styles.loginPageSwitch}>{translate(en.login.notamember)}</Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.signupText}>{en.login.signUpLink}</Text>
          </TouchableOpacity>
          {/* <Button title="Sign Out" onPress={handleSignOut} />
          <Button title="Check Login Status" onPress={handleCheckLoginStatus} /> */}
        </View>
          
        }
      </View>
    </View>
     </ScrollView>
   </KeyboardAvoidingView>
   
  )
}
export default Login