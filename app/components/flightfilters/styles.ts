import { StyleSheet } from "react-native";
import { responsiveHeight } from "../../utils/responsiveScale";
import { colors, fonts } from "../../config/theme";

export const styles=StyleSheet.create({
    upArrowIconmainContainer:
    {
borderWidth:1
    },
    upArrowIcon:{
        alignItems:'center',
        justifyContent:'center'
    },
    filterHeader:{
        fontSize:responsiveHeight(2.8),
        color:colors.black,
        fontFamily:fonts.textFont
    },
    filtersIconContainer:{
        flexDirection:'row',
        columnGap:responsiveHeight(1),
        alignItems:'center'
    },
})