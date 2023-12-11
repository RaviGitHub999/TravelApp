import {StyleSheet} from "react-native";
import { responsiveFontSize, responsiveHeight, responsiveWidth } from "../../utils/responsiveScale";
import { colors, fonts } from "../../config/theme";
export const styles=StyleSheet.create({
    mainContainer:{
        flex:1
    },
    headerContainer:{
        paddingHorizontal:responsiveWidth(3),
        backgroundColor:colors.primary,
        paddingVertical:responsiveHeight(2),
        rowGap:responsiveHeight(1.5),
        borderWidth:1,
       
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        columnGap:responsiveHeight(1.2),
        // paddingTop:responsiveHeight(2)
        // justifyContent:'space-between',
        // borderWidth:1,
        //  paddingHorizontal:responsiveWidth(3),
        
    },
    title:{
        fontFamily:fonts.primary,
        color:colors.white,
        fontSize:responsiveFontSize(2.8)
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