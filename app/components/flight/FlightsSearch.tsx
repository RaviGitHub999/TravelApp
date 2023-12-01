import { View, Text, TouchableOpacity, FlatList,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveScale'
import SearchInputs from '../common/searchInputs/SearchInputs'
import DropDown from '../common/dropDown/DropDown'
import CustomButton from '../common/customButton/CustomButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch } from 'react-redux'
import { handleDepartureDateChange } from '../../redux/reducers/flightSearch'
const btns=["One Way","Round Trip"]
const FlightsSearch = () => {
 const[active,setActive]=useState(btns[0])
 const dispatch=useDispatch()
  const handleRender=({item}:{item:string})=>
  {
    return(
      <TouchableOpacity style={[styles.btnsContainer,active===item&&styles.active]}
      onPress={()=>setActive(item)}>
       <Text style={[styles.btnTitle,active===item&&styles.activeText]}>{item}</Text>
      </TouchableOpacity>
    )
  }
const handleSelectedDate=(event: DateTimePickerEvent, selectedDate?: Date)=>
{
  if (selectedDate !== undefined)
 {
  dispatch(handleDepartureDateChange(selectedDate));
 }
}

  return (
    <View style={styles.subContainer}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:responsiveHeight(10)}}>
     <FlatList data={btns} renderItem={handleRender} keyExtractor={item=>item}  horizontal/>
    <View style={styles.fieldsContainer}>
    <SearchInputs btn={false} dropDown={false} placeholder='Origin'/>
     <SearchInputs btn={false} dropDown={false} placeholder='Destination'/>
    <View {...active==="Round Trip"&& {style:{flexDirection:'row',justifyContent:'space-between'}}}>
    <SearchInputs datePick='departure' btn={true} dropDown={false} placeholder='Departure Date' {...active==="Round Trip"&&{customStyles:{width:responsiveWidth(41)}}}/>
    {active==="Round Trip"&& <SearchInputs  datePick="return" btn={true} dropDown={false} placeholder='Return Date' customStyles={{width:responsiveWidth(41)}}/>}
    </View>
   <View style={{flexDirection:"row",justifyContent:'space-between'}}>
   <DropDown length={10} particularState='adults'/>
   <DropDown length={9} particularState='children'/>
   <DropDown length={9} particularState='infants'/>
   </View>
     <SearchInputs btn={true} dropDown={true} placeholder='Origin'/>
     <CustomButton title='Search Flight' handleSubmit={()=>{}}/>
    </View>
    <DateTimePicker
          value={new Date()}
          mode="date"
          display="default"
          onChange={handleSelectedDate}
          minimumDate={new Date()}
        />
    </ScrollView>
     </View>
  )
}

export default FlightsSearch