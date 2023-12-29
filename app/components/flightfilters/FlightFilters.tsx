import { View, Text, TouchableOpacity, Image, FlatList, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { applyFilters, handleFlightNames, handleFlightsFilter, handleSelectFlightName } from '../../redux/reducers/flightSearch'
import { styles } from './styles'
import en from '../../config/locales/en'
import { translate } from '../../config/i18n'
import CustomRadioButton from '../common/customRadioButton/CustomRadioButton'
const sunImg = [
  {
    title: "Before 6 AM",
    url: "https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/morning_inactive.png",
    clicked: false
  },
  {
    title: "6 AM - 12 PM",
    url: "https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/noon_inactive.png",
    clicked: false
  },
  {
    title: "12 PM - 6 PM",
    url: "https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/evening_inactive.png",
    clicked: false
  },
  {
    title: "After 6 PM",
    url: "https://imgak.mmtcdn.com/flights/assets/media/dt/listing/left-filters/night_inactive.png",
    clicked: false
  }
]

const FlightFilters = () => {
  console.log("filterComponent")
  const dispatch: AppDispatch = useDispatch()
  const [times, setTimes] = useState(sunImg);
  // const [selectFlightName, setFlightName] = useState<string>("")
  const [selectedStops, setSelectedStops] = useState<number | null>(null);
  // const { singleSigment, flightsNamesList,filters } = useSelector((state: RootState) => state.flightReducer)
  const toggleSelection = (index: number) => {
    const updatedTimes = [...times];
    updatedTimes[index].clicked = !updatedTimes[index].clicked;
    setTimes(updatedTimes);
  };
  const img = times.map((item, index) => {
    return (
      <TouchableOpacity key={item.title} onPress={() => toggleSelection(index)} style={[styles.sunimgCardContainer, item.clicked && styles.selected]}>
        <Image source={{ uri: item.url }} style={styles.sunImges} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    )
  })
  // const handleFlightName = (item: string) => {
  //   if (selectFlightName.includes(item)) {
  //     setFlightName("")
  //   }
  //   else {
  //     setFlightName(item)
  //   }

  // }
  // console.log(selectFlightName)
  // const handleFlightsNames = ({ item }: { item: string }) => {
  //   return (
  //     <TouchableOpacity style={[styles.flightNameBtn, filters.selectFlightName === item && styles.selectedFlightNameBtn]} onPress={() => dispatch(handleSelectFlightName(item))}>
  //       <Text style={[styles.flightName, filters.selectFlightName === item && styles.selectedFlightName]}>{item}</Text>
  //     </TouchableOpacity>
  //   )
  // }
  const handleFlightStops=(item:number)=>
  {
if(item===selectedStops)
{
  setSelectedStops(null)
}
else{
  setSelectedStops(item)
}
  }
  return (
    <ScrollView nestedScrollEnabled style={styles.upArrowIconmainContainer}>
      <View style={styles.filtersIconContainer}>
        <IconSwitcher componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3} />
        <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
      </View>
      <View style={styles.filtersmainContainer}>
        <View>
          <Text style={styles.filterTitles}>{translate(en.flightsRes.airline)}</Text>
          {/* <FlatList data={flightsNamesList} renderItem={handleFlightsNames} numColumns={4} style={styles.flightNamesRenderContainer} nestedScrollEnabled /> */}
        </View>
        <View>
          <Text style={styles.filterTitles}>{translate(en.flightsRes.stops)}</Text>
          <View style={styles.stopsContainer}>
            <CustomRadioButton
              label="Nonstop only"
              selected={selectedStops === 0}
              onSelect={() => handleFlightStops(0)}
            />
            <CustomRadioButton
              label="1 stop or fewer"
              selected={selectedStops === 1}
              onSelect={() => handleFlightStops(1)}
            />
            <CustomRadioButton
              label="2 stops or fewer"
              selected={selectedStops === 2}
              onSelect={() => handleFlightStops(2)}
            />
          </View>
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
      <TouchableOpacity style={styles.upArrowIcon} onPress={() => dispatch(handleFlightsFilter(false))}>
        <IconSwitcher componentName='Ionicons' iconName='chevron-up' color={colors.black} iconsize={3.5} />
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>dispatch(applyFilters())}>
        <Text>Apply</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default React.memo(FlightFilters)
