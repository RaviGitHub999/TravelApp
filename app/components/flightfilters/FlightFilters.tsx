import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { handleFlightNames, handleFlightsFilter } from '../../redux/reducers/flightSearch'
import { styles } from './styles'
import en from '../../config/locales/en'
import { translate } from '../../config/i18n'
const sunImg=[
{
title:"Before 6 AM",
url:"https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_inactive.png",
clicked:false
},
{
  title:"6 AM - 12 PM",
  url:"https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/noon_inactive.png",
  clicked:false
},
{
  title:"12 PM - 6 PM",
  url:"https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/evening_inactive.png",
  clicked:false
},
{
  title:"After 6 PM",
  url:"https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/night_inactive.png",
  clicked:false
}
]



const FlightFilters = () => {
    const dispatch:AppDispatch=useDispatch()
    const [times, setTimes] = useState(sunImg);
    const{singleSigment,flightsNamesList}=useSelector((state:RootState)=>state.flightReducer)
    let flightNames
    useEffect(()=>
    {
      dispatch(handleFlightNames())
    },[])
   
   console.log(flightNames,"lluuuu")
    const toggleSelection = (index:number) => {
      const updatedTimes = [...times];
      updatedTimes[index].clicked = !updatedTimes[index].clicked;
      setTimes(updatedTimes);
    };
    const img= times.map((item,index)=>
    {
      return(
        <TouchableOpacity key={item.title}  onPress={() => toggleSelection(index)} style={[styles.sunimgCardContainer, item.clicked && styles.selected]}>
          <Image source={{uri:item.url}} style={styles.sunImges}/>
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
      )
    })

    const handleFlightsNames=({item}:{item:string})=>
    {
      return(
        <TouchableOpacity>
          <Text>{item}</Text>
        </TouchableOpacity>
      )
    }
    return (
    <View style={styles.upArrowIconmainContainer}>
        <View style={styles.filtersIconContainer}>
        <IconSwitcher  componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3}/>
        <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
        </View>
   <View style={styles.filtersmainContainer}>
   <View>
      <Text style={styles.filterTitles}>{translate(en.flightsRes.airline)}</Text>
      {/* <FlatList data={flightsNamesList} renderItem={handleFlightsNames} numColumns={3}/> */}
    </View>
    <View>
      <Text style={styles.filterTitles}>{translate(en.flightsRes.stops)}</Text>
    </View>
    <View>
      <Text style={styles.filterTitles}>{translate(en.flightsRes.departureTime)}</Text>
      <View style={styles.mappedSunImgContainer}>
      {img}
      </View>
    </View>
    <View>
      <Text style={styles.filterTitles}>{translate(en.flightsRes.arrivalTime)}</Text>
      <View style={styles.mappedSunImgContainer}>
      {img}
      </View>
    </View>
    <View>
      <Text style={styles.filterTitles}>{translate(en.flightsRes.sort)}</Text>
    </View>
   </View>
    <TouchableOpacity style={styles.upArrowIcon} onPress={()=>dispatch(handleFlightsFilter(false))}>
        <IconSwitcher componentName='Ionicons' iconName='chevron-up' color={colors.black} iconsize={3.5}/>
    </TouchableOpacity>
    </View>
  )
}

export default FlightFilters
