import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const RemainingFlights = () => {
//    const{RemainingFlights}=useSelector((state:RootState)=>state.flightReducer)
//    RemainingFlights.map((ele)=>
//    {
//     ele.Segments.flat(1).map((item)=>
//     {
//         console.log(item.FareClassification.Type)
//     })
//    })
// console.log(RemainingFlights)
//    const rr=RemainingFlights.map(ele=>ele.Segments)
//    const r1=rr.flat(2)
//  const ff=r1.map((ele,ind)=>
//  {
// if(ind>0)
// {
//     console.log(ele)
//    return<Text>{ele.FareClassification.Type}{ele.Fare
//    }</Text>
// }
//  })
  
  return (
    <View>
        {/* {ff} */}
    </View>
  )
}

export default RemainingFlights