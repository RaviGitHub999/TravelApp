import { View, Text, TouchableOpacity, FlatList,ScrollView } from 'react-native'
import React, { useState } from 'react'
import { styles } from './styles'
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveScale'
import SearchInputs from '../common/searchInputs/SearchInputs'
import DropDown from '../common/dropDown/DropDown'
import CustomButton from '../common/customButton/CustomButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux'
import { handleDepartureDateChange, handleReturnDateChange } from '../../redux/reducers/flightSearch'
import { RootState } from '../../redux/store'
const btns=["One Way","Round Trip"]
interface CalenderOpen{
  departureCalender?:boolean,
  returCalender?:boolean
}
const FlightsSearch = () => {
 const[active,setActive]=useState(btns[0])
 const[calenderOpen,setCalenderOpen]=useState<CalenderOpen>({departureCalender:false,returCalender:false})
 const {departure,returnDate,dateValue}=useSelector((State:RootState)=>State.flightReducer)
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
  dispatch(handleDepartureDateChange(selectedDate));
  setCalenderOpen({ departureCalender:false});
}

const handleSelectedReturnDate=(event: DateTimePickerEvent, selectedDate?: Date)=>
{
  dispatch(handleReturnDateChange(selectedDate));
  setCalenderOpen({returCalender:false});
}
const handleOpenCalender = () => {
  setCalenderOpen({ departureCalender: true });
};
const handleOpenReturnCalender = () => {
  setCalenderOpen({ returCalender: true });
};
  return (
    <View style={styles.subContainer}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom:responsiveHeight(10)}}>
     <FlatList data={btns} renderItem={handleRender} keyExtractor={item=>item}  horizontal/>
    <View style={styles.fieldsContainer}>
    <SearchInputs btn={false} dropDown={false} placeholder='Origin'/>
     <SearchInputs btn={false} dropDown={false} placeholder='Destination'/>
    <View {...active==="Round Trip"&& {style:{flexDirection:'row',justifyContent:'space-between'}}}>
    <SearchInputs datePick='departure' btn={true} dropDown={false} placeholder={departure}{...active==="Round Trip"&&{customStyles:{width:responsiveWidth(41)}}} handleDatePicker={handleOpenCalender}/>
    {active==="Round Trip"&& <SearchInputs  datePick="return" btn={true} dropDown={false} placeholder={returnDate} customStyles={{width:responsiveWidth(41)}} handleDatePicker={handleOpenReturnCalender}/>}
    </View>
   <View style={{flexDirection:"row",justifyContent:'space-between'}}>
   <DropDown length={10} particularState='adults'/>
   <DropDown length={9} particularState='children'/>
   <DropDown length={9} particularState='infants'/>
   </View>
     <SearchInputs btn={true} dropDown={true} placeholder='Origin'/>
     <CustomButton title='Search Flight' handleSubmit={()=>{}}/>
    </View>
    {calenderOpen.departureCalender&&<DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleSelectedDate}
          minimumDate={new Date()}
        />}
        {calenderOpen.returCalender&&<DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleSelectedReturnDate}
          minimumDate={dateValue}
        />}
    </ScrollView>
     </View>
  )
}

export default FlightsSearch