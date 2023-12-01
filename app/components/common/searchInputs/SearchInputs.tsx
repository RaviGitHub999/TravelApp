// import { View, Text, TextInput, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'
// import IconSwitcher from '../icons/IconSwitcher'
// import { useDispatch, useSelector,} from 'react-redux'
// import{RootState} from "../../../redux/store"
// import { handleClass } from '../../../redux/reducers/flightSearch'
// const dropDownList=["Economy","Premium Economy","Business","First","Any cabin class"]
// interface IProps{
//     btn:boolean,
//     dropDown:boolean
// }
// interface DropDownState{
//     dropDownArrow?:boolean,
//     dropDownHandle?:boolean
// }
// const SearchInputs:React.FC<IProps> = ({btn,dropDown}) => {
//     const{classes}=useSelector((state:RootState)=>state.flightReducer)
//     const dispatch=useDispatch()
//     const[active,setActive]=useState(false)
//     const[activeBtn,setActiveBtn]=useState(false)
//     const[dropDownState,setDropDownState]=useState<DropDownState>({dropDownArrow:false,dropDownHandle:false})
//     const handleFocus=(name:string)=>
//     {
//         if(name==="input")
//         {
//             setActive(true)
//         }
//         else{
//             setActiveBtn(true)
//             setDropDownState({dropDownArrow:!dropDownState.dropDownArrow,dropDownHandle:!dropDownState.dropDownHandle})
//         }
//     }
//     const handleBlur=()=>
//     {
//             setActive(false);
//     }
//     const handlePressOut = () => {
//         setTimeout(() => {
//           setActiveBtn(false);
//         }, 500);
//       };
//       const handleDropDown=(ele:string)=>
//       {
// dispatch(handleClass(ele))
// setTimeout(() => {
//     setDropDownState({dropDownHandle:!dropDownState.dropDownHandle})
// }, 500);
//       }
//   return (
//     <View>
//        {btn?
//     <View>
//      <View style={[{backgroundColor:"rgb(24, 246, 246)",height:70,justifyContent:'center',borderRadius:15,paddingHorizontal:20},activeBtn&&{borderColor:"red",borderWidth:3}]}>
//      <TouchableOpacity  onPressIn={()=>handleFocus("btn")}
//       onPressOut={handlePressOut} style={{width:"100%",height:"100%",alignItems:"center",flexDirection:'row',justifyContent:'space-between'}}>
//      <Text style={{fontSize:25}}>{dropDown?classes:"Depature"}</Text>
//     {dropDown&& dropDownState.dropDownArrow?<IconSwitcher componentName='AntDesign' iconName='caretup' iconsize={2.2}/>:<IconSwitcher componentName='AntDesign' iconName='caretdown' iconsize={2.2}/>}
//      </TouchableOpacity>
//     </View>
//     {
//         dropDownState.dropDownHandle&&<View style={{borderWidth:1,height:196}}>
//         {
//             dropDownList.map((ele)=>
//             {
//                 return(
//                     <TouchableOpacity key={ele} style={[{paddingLeft:10,paddingVertical:9},classes===ele&&{backgroundColor:'blue'}]} onPress={()=>handleDropDown(ele)}>
//                         <Text>{ele}</Text>
//                     </TouchableOpacity>
//                 )
//             })
//         }
//     </View>
//     }
//     </View>
//    :
//     (
//      <View style={[{backgroundColor:"rgb(246, 246, 246)",height:70,justifyContent:'center',borderRadius:15,paddingHorizontal:20},active&&{borderColor:"red",borderWidth:3}]}>
//      <TextInput style={{fontSize:25}} placeholder='Origin' onFocus={()=>handleFocus("input")} onBlur={handleBlur}/>
//     </View>
//     )}
//     </View>
//   )
// }

// export default SearchInputs
import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateSelector = () => {
  const [departureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showDeparturePicker, setShowDeparturePicker] = useState(false);
  const [showReturnPicker, setShowReturnPicker] = useState(false);

  const handleDepartureDateChange = (event, selectedDate) => {
    setShowDeparturePicker(false);
    if (selectedDate) {
      setDepartureDate(selectedDate);
    }
  };

  const handleReturnDateChange = (event, selectedDate) => {
    setShowReturnPicker(false);
    if (selectedDate) {
      setReturnDate(selectedDate);
    }
  };

  const openReturnPicker = () => {
    setShowReturnPicker(true);
  };

  const handleReturnDateClick = () => {
    // Format the selected return date to "MMM d" (e.g., "Dec 5")
    const formattedReturnDate = returnDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    // Handle the formatted return date
    console.log('Return Date Clicked:', formattedReturnDate);
  };

  return (
    <View>
      <Text>Departure Date:</Text>
      <Button
        title="Select Departure Date"
        onPress={() => setShowDeparturePicker(true)}
      />
      {showDeparturePicker && (
        <DateTimePicker
          value={departureDate}
          mode="date"
          display="default"
          onChange={handleDepartureDateChange}
          minimumDate={new Date()}
        />
      )}

      <Text>Return Date:</Text>
      <Button title="Select Return Date" onPress={openReturnPicker} />
      {showReturnPicker && (
        <DateTimePicker
          value={returnDate}
          mode="date"
          display="default"
          minimumDate={departureDate}
          onChange={handleReturnDateChange}
          onTouchCancel={handleReturnDateClick}
        />
      )}

      <Button
        title="Submit"
        onPress={() => {
          // Handle the selected dates, e.g., send them to a server or perform other actions
          const formattedDepartureDate = departureDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          const formattedReturnDate = returnDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          });

          console.log('Departure Date:', formattedDepartureDate);
          console.log('Return Date:', formattedReturnDate);
        }}
      />
    </View>
  );
};

export default DateSelector;




