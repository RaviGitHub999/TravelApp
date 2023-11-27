import { View, Text,TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'

const CustomButton = ({title}:{title:string}) => {
  return (
    <View>
   <TouchableOpacity style={styles.btn}>
    <Text style={styles.btnText}>{title}</Text>
   </TouchableOpacity>
    </View>
  )
}

export default CustomButton