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
    },
    header:{
        flexDirection:'row',
        alignItems:'center',
        columnGap:responsiveHeight(1.2),
    },
    title:{
        fontFamily:fonts.primary,
        color:colors.white,
        fontSize:responsiveFontSize(2.8),
        width:"90%"
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
    },
    activeIndicatorMainContainer:{
        flex:1
    },
    activeIndicator:{ 
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
}
})