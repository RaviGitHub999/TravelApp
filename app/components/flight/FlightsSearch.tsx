import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveScale'
const btns=["One Way","Round Trip"]
const FlightsSearch = () => {
 const[active,setActive]=useState(btns[0])
  const handleRender=({item}:{item:string})=>
  {
    return(
      <TouchableOpacity style={[styles.btnsContainer,active===item&&styles.active]}
      onPress={()=>setActive(item)}>
       <Text style={[styles.btnTitle,active===item&&styles.activeText]}>{item}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.mainConatiner}>
     <View style={styles.subContainer}>
     <View>
     <FlatList data={btns} renderItem={handleRender} keyExtractor={item=>item}  horizontal/>
     </View>
     </View>
    </View>
  )
}

export default FlightsSearch