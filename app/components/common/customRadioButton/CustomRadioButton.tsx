import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { responsiveHeight } from '../../../utils/responsiveScale';
interface IProps{
    label?:string,
    selected:boolean,
    onSelect:()=>void
}
const CustomRadioButton:React.FC<IProps>= ({ label, selected, onSelect }) => ( 
    <TouchableOpacity 
        style={[styles.radioButton,selected&&{borderColor: '#007BFF'  }]} 
        onPress={onSelect} 
    > 
    <View style={[styles.innerCircle,selected&&{ backgroundColor: '#007BFF'  }]}/>
    </TouchableOpacity> 
); 
  
const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: '#F5F5F5', 
    }, 
    innerCircle:{
        height:responsiveHeight(1),
        width:responsiveHeight(1),
        borderRadius:responsiveHeight(2)
    },
    radioButton: { 
        borderWidth: responsiveHeight(0.2), 
        borderColor: 'black', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height:responsiveHeight(2),
        width:responsiveHeight(2),
        borderRadius:responsiveHeight(2)
    }, 
    radioButtonText: { 
        fontSize: 16, 
    }, 
}); 
  export default CustomRadioButton