import {StyleSheet} from "react-native"
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveScale"
import { colors, fonts } from "../../config/theme"
export const styles=StyleSheet.create({
    container: {
        flex: 1,
      },
    scrollContainer: {
        flexGrow: 1,
      },
    signUpMethodsContainer:{
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        rowGap: responsiveHeight(3)
    },
    signUpmethodsTitle:{
        fontSize:responsiveFontSize(2.6),
        fontFamily:fonts.textInput,
        color:colors.black
    },
  signUpIconsMainContainer:{
        flexDirection: 'row',
        columnGap: responsiveHeight(2)
    },
    iconContainer1:{
        height: responsiveWidth(13),
        width: responsiveWidth(13),
        borderRadius: responsiveHeight(8),
        backgroundColor: colors.facebook,
        alignItems: "center",
        justifyContent: 'center'
    },
    iconContainer2: {
        height: responsiveWidth(13),
        width: responsiveWidth(13),
        borderRadius: responsiveHeight(8),
        backgroundColor: colors.google,
        alignItems: "center",
        justifyContent: 'center'
    },
    signupPageSwitchContainer:{
        flexDirection:'row',
        columnGap:responsiveWidth(1)
    },
    signUpPageSwitch:{
        fontSize:responsiveFontSize(1.9),
        fontFamily:fonts.textInput,
        color:colors.black
    },
    loginText:{
        textDecorationLine:"underline",
        color:colors.facebook
    },
    mainContainer:
    {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        textAlign: 'center',
        fontSize: responsiveHeight(4.5),
        fontFamily: fonts.textFont,
        color: colors.primary,
        marginBottom: responsiveHeight(4)
    },
    inputBoxes:{
        paddingHorizontal: responsiveWidth(10),
        rowGap: responsiveHeight(4.5)
    },
    btnContainer: {
        marginHorizontal: responsiveWidth(18),
        marginTop: responsiveHeight(5)
    },
})