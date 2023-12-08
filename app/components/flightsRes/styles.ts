import {StyleSheet} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveScale";
import { colors, fonts } from "../../config/theme";
export const styles=StyleSheet.create({
    mainContainer:{
        flex:1
    },
    headerContainer:{
        paddingHorizontal:responsiveWidth(5),
        backgroundColor:colors.primary,
        paddingVertical:responsiveHeight(2),
        rowGap:responsiveHeight(1.5)
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        columnGap:responsiveHeight(1.2),
        // paddingTop:responsiveHeight(2)
    },
    title:{
        fontFamily:fonts.primary,
        color:colors.white,
        fontSize:responsiveFontSize(3)
    },
    editButton:{
        backgroundColor:colors.highlight,
        height:responsiveHeight(3.8),
        width:responsiveHeight(3.8),
        borderRadius:responsiveHeight(3),
        alignItems:'center',
        justifyContent:'center',
    },
    travellerDescription:{
        flexDirection:'row'
    },
    descriptionTitles:{
color:colors.white,
fontSize:responsiveFontSize(2),
fontFamily:fonts.textFont
    }
})