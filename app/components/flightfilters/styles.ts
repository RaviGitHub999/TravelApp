import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveScale";
import { colors, fonts } from "../../config/theme";

export const styles=StyleSheet.create({
    upArrowIconmainContainer:
    {
borderWidth:1,
paddingHorizontal:responsiveWidth(2),
paddingTop:responsiveHeight(2)
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
    filtersmainContainer:{
        marginTop:responsiveHeight(2),
        rowGap:responsiveHeight(2),
        paddingHorizontal:responsiveWidth(3)
    },
    filterTitles:{
        fontSize:responsiveHeight(2.3),
        letterSpacing:responsiveWidth(0.2),
        fontFamily:fonts.textFont,
        color:colors.black
    },
    sunImges:{
        height:responsiveHeight(6),
        width:responsiveHeight(6),
    },
    mappedSunImgContainer:{
        flexDirection:'row',
        columnGap:responsiveWidth(2),
        marginTop:responsiveHeight(1)
    },
    sunimgCardContainer:{
        // borderWidth:1,
        alignItems:"center",
        justifyContent:'center',
        padding:responsiveHeight(1)
    },
    title:{
        fontSize:responsiveHeight(1.5)
    },
    selected: {
        backgroundColor: 'green',
      },
})