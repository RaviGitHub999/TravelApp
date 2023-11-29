import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveScale";
import { colors, fonts } from "../../config/theme";

export const styles = StyleSheet.create({
    mainConatiner: {
        borderWidth: 1,
        flex: 1,
        justifyContent: 'center'
    },
    subContainer: {
        borderWidth: 2,
        height: '60%',
        paddingHorizontal: responsiveWidth(5)
    },
    btnsContainer: {
        marginRight:responsiveWidth(5),
        borderWidth:1,
        paddingHorizontal:responsiveWidth(4),
        paddingVertical:responsiveHeight(1),
        borderRadius:responsiveHeight(3),
        marginTop:responsiveHeight(2)
    },
    active:{
backgroundColor:colors.primary
    },
    activeText:{
        color:colors.white
    },
    btnTitle:{
        fontSize:responsiveFontSize(2.1),
        fontFamily:fonts.primary,
        color:colors.lightGray
    }
})