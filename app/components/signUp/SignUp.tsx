// import { View, Text,TouchableOpacity,KeyboardAvoidingView,ScrollView } from 'react-native'
// import React from 'react'
// import { translate } from '../../config/i18n'
// import en from '../../config/locales/en'
// import CustomInput from '../common/customInput/CustomInput'
// import CustomButton from '../common/customButton/CustomButton'
// import IconSwitcher from '../common/icons/IconSwitcher'
// import { colors } from '../../config/theme'
// import { styles } from './styles'
// interface IProps{
//   navigation:{
//     navigate:(name:string)=>void
//   } 
// }
// const SignUp:React.FC<IProps> = ({navigation:{navigate}}) => {
//   const handleNavigation=()=>
//   {
//     navigate("Login")  
    
//   }
//   return (
//     <KeyboardAvoidingView style={styles.container}>
// <ScrollView contentContainerStyle={styles.scrollContainer}>
// <View style={styles.mainContainer}>
//       <Text style={styles.title}>{translate(en.signup.signUp)}</Text>
//       <View style={styles.inputBoxes}>
//         <CustomInput iconComponentName={en.signup.iconComponentName1} name={en.signup.iconName1} placeHolder={en.signup.placeHolder1} title={en.signup.title1} iconsize={3.6}/>
//         <CustomInput iconComponentName={en.signup.iconComponentName2} name={en.signup.iconName2} placeHolder={en.signup.placeHolder1} title={en.signup.title2} iconsize={3.6}/>
//         <CustomInput iconComponentName={en.signup.iconComponentName3} name={en.signup.iconName3} placeHolder={en.signup.placeHolder1} title={en.signup.title3} iconsize={3.6}/>
//       </View>
//       <View style={styles.btnContainer}>
//         <CustomButton title={en.signup.signUp}/>
//       </View>
//       <View style={styles.signUpMethodsContainer}>
//         <Text style={styles.signUpmethodsTitle}>{translate(en.signup.signupMethosTitle)}</Text>
//         <View style={styles.signUpIconsMainContainer}>
//           <View style={styles.iconContainer1}>
//             <IconSwitcher componentName={en.signup.iconComponentName4} iconName={en.signup.iconName4} color={colors.white} iconsize={5.5} />
//           </View>
//           <View style={styles.iconContainer2}>
//             <IconSwitcher componentName={en.signup.iconComponentName5} iconName={en.signup.iconName5} color={colors.white} iconsize={3.2} />
//           </View>
//         </View>
//         <View style={styles.signupPageSwitchContainer}>
//           <Text style={styles.signUpPageSwitch}>{translate(en.signup.alreadyamember)}</Text>
//           <TouchableOpacity onPress={handleNavigation}>
//             <Text style={styles.loginText}>{en.signup.loginLink}</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
// </ScrollView>
//     </KeyboardAvoidingView>
    
//   )
// }

// export default SignUp