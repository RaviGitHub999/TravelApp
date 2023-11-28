import { StyleSheet } from "react-native"
import { responsiveHeight, responsiveWidth } from "../../utils/responsiveScale"
export const styles=StyleSheet.create({
    mainContainer:{
flex:1,
justifyContent:'center',
rowGap:responsiveHeight(4),
paddingHorizontal:responsiveWidth(10)
    }
})