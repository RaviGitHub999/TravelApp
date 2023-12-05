import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState,useCallback } from 'react'
import { styles } from './styles'
import { responsiveWidth } from '../../utils/responsiveScale'
import SearchInputs from '../common/searchInputs/SearchInputs'
import DropDown from '../common/dropDown/DropDown'
import CustomButton from '../common/customButton/CustomButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeTextInput, handleDepartureDateChange, handleOriginSelectedAirPort, handleReturnDateChange } from '../../redux/reducers/flightSearch'
import { selectDestinationWithDebounce } from "../../redux/reducers/flightSearch"
import { AppDispatch, RootState } from '../../redux/store'
const btns = ["One Way", "Round Trip"]
interface CalenderOpen {
  departureCalender?: boolean,
  returCalender?: boolean
}
const FlightsSearch = () => {
  const [active, setActive] = useState(btns[0])
  const [calenderOpen, setCalenderOpen] = useState<CalenderOpen>({ departureCalender: false, returCalender: false })
  const { departure, returnDate, dateValue, returnDateValue, origin, destination, airportOriginLoading, airportOriginData, desRes } = useSelector((State: RootState) => State.flightReducer)
  const dispatch: AppDispatch = useDispatch()
  const handleRender = useCallback(({ item }: { item: string }) => {
    return (
      <TouchableOpacity style={[styles.btnsContainer, active === item && styles.active]}
        onPress={() => setActive(item)}>
        <Text style={[styles.btnTitle, active === item && styles.activeText]}>{item}</Text>
      </TouchableOpacity>
    );
  }, [active, setActive]);
  const handleSelectedDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setCalenderOpen({ departureCalender: false });
    dispatch(handleDepartureDateChange(selectedDate));
  }, [dispatch]);

  const handleSelectedReturnDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    setCalenderOpen({ returCalender: false });
    dispatch(handleReturnDateChange(selectedDate));
  }, [dispatch]);
  const handleOpenCalender = useCallback(() => {
    setCalenderOpen({ departureCalender: true });
  }, []);
  const handleOpenReturnCalender = useCallback(() => {
    setCalenderOpen({ returCalender: true });
  }, []);
  const handleChange = (e: string, name: string) => {
    dispatch(handleChangeTextInput({ e, name }))
    if (name === "origin") {
      dispatch(selectDestinationWithDebounce(e));
    }
  }
  return (
    <View style={styles.subContainer}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
        <FlatList data={btns} renderItem={handleRender} keyExtractor={item => item} horizontal />
        <View style={styles.fieldsContainer}>
          <SearchInputs btn={false} dropDown={false} placeholder='Origin' handleChangeText={handleChange} Value={origin} stateName="origin" />
          {
            desRes ?
              <View >
                {airportOriginLoading ? (
                  <Text>Loading......</Text>
                ) : airportOriginData.length === 0 ?
                  <Text>No Data!!!</Text> : <View style={{ flex: 1 }}>
                    <FlatList data={airportOriginData} renderItem={({ item }) => {
                      return (
                       <TouchableOpacity style={styles.renderItemsContainer} onPress={()=>dispatch(handleOriginSelectedAirPort(item))}>
                        <View>
                          <Text>{`${item.address.cityName},${item.address.countryName}`}</Text>
                          <Text style={styles.airportName}>{item.name}</Text>
                        </View>
                        <View>
                          <Text>{item.iataCode}</Text>
                        </View>
                        </TouchableOpacity>
                      )
                    }} nestedScrollEnabled style={styles.airportOriginDataContainer}/>
                  </View>}
              </View> : null
          }
          <SearchInputs btn={false} dropDown={false} placeholder='Destination' handleChangeText={handleChange} Value={destination} stateName="destination" />
          <View {...active === "Round Trip" && { style: { flexDirection: 'row', justifyContent: 'space-between' } }}>
            <SearchInputs datePick='departure' btn={true} dropDown={false} placeholder={departure}{...active === "Round Trip" && { customStyles: { width: responsiveWidth(41) } }} handleDatePicker={handleOpenCalender} />
            {active === "Round Trip" && <SearchInputs datePick="return" btn={true} dropDown={false} placeholder={returnDate} customStyles={{ width: responsiveWidth(41) }} handleDatePicker={handleOpenReturnCalender} />}
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-between' }}>
            <DropDown length={10} particularState='adults' />
            <DropDown length={9} particularState='children' />
            <DropDown length={9} particularState='infants' />
          </View>
          <SearchInputs btn={true} dropDown={true} placeholder='Origin' />
          <CustomButton title='Search Flight' handleSubmit={() => { }} />
        </View>
        {calenderOpen.departureCalender && <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleSelectedDate}
          minimumDate={new Date()}
        />}
        {calenderOpen.returCalender && <DateTimePicker
          value={returnDateValue}
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