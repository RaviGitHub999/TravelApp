import { View, Text, BackHandler, StatusBar, TouchableOpacity, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import CustomInput from '../common/customInput/CustomInput';
import CustomButton from '../common/customButton/CustomButton';
import { styles } from './styles';
import IconSwitcher from '../common/icons/IconSwitcher';
import { colors } from '../../config/theme';
import { translate } from '../../config/i18n';
import en from "../../config/locales/en"
interface IProps{
  navigation:{
    navigate:(name:string)=>void
  } 
}
const Login:React.FC<IProps> = ({navigation:{navigate}}) => {
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //     BackHandler.exitApp();
  //     return true;
  //   });
  //   return () => backHandler.remove();
  // }, []);
  const handleNavigation=()=>
  {
    navigate("SignUp")
  }
  return (
   <KeyboardAvoidingView style={styles.container}>
     <ScrollView contentContainerStyle={styles.scrollContainer}>
     <View style={styles.mainContainer}>
      <StatusBar hidden={false} />
      <Text style={styles.title}>{translate(en.login.login)}</Text>
      <View style={styles.inputContainer}>
        <CustomInput iconComponentName={en.login.iconComponentName1} name={en.login.iconName1} placeHolder={en.login.placeHolder1} title={en.login.title1} iconsize={3.6} />
        <CustomInput iconComponentName={en.login.iconComponentName2} name={en.login.iconName2} placeHolder={en.login.placeHolder2} title={en.login.title2} iconsize={3.6} /></View>
      <Text style={styles.forgotPassword}>{translate(en.login.forgotpassword)}</Text>
      <View style={styles.btnContainer}>
        <CustomButton title={translate(en.login.login)} />
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
        <View style={styles.loginPageSwitchContainer}>
          <Text style={styles.loginPageSwitch}>{translate(en.login.notamember)}</Text>
          <TouchableOpacity onPress={handleNavigation}>
            <Text style={styles.signupText}>{en.login.signUpLink}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
     </ScrollView>
   </KeyboardAvoidingView>
   
  )
}
export default Login