import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { styles } from './styles'
import { responsiveWidth } from '../../utils/responsiveScale'
import SearchInputs from '../common/searchInputs/SearchInputs'
import DropDown from '../common/dropDown/DropDown'
import CustomButton from '../common/customButton/CustomButton'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux'
import { handleChangeOriginTextInput, handleChangeDestinationTextInput, handleDepartureDateChange, handleOriginSelectedAirPort, handleReturnDateChange, selectDestinationWithDebounce, selectOriginWithDebounce, handleDestinationSelectedAirPort, handleJourneyWay, flightSearching, SelectedFlightObj, fetchFlightsLogos } from '../../redux/reducers/flightSearch'
import { AppDispatch, RootState } from '../../redux/store'
const btns = [{ journeyType: "One Way", journeyTypeNo: "1" }, { journeyType: "Round Trip", journeyTypeNo: "2" }]
interface IBtns {
  journeyType: string,
  journeyTypeNo: string
}
interface CalenderOpen {
  departureCalender?: boolean,
  returCalender?: boolean
}
interface IProps{
  navigation:{
    navigate:(arg:string)=>void
  }
}
const FlightsSearch:React.FC<IProps> = ({navigation:{navigate}}) => {
  const [active, setActive] = useState(btns[0].journeyType)
  const [calenderOpen, setCalenderOpen] = useState<CalenderOpen>({ departureCalender: false, returCalender: false })
  const { departure,departureformattedDate, returnDate, dateValue, returnDateValue, origin, destination, airportOriginLoading, airportDestinationLoading, airportOriginData, desRes, airportDestinationData, oriRes, originSelectedAirport, destinationSelectedAirPort, originselected, destinationselected } = useSelector((State: RootState) => State.flightReducer)
  const dispatch: AppDispatch = useDispatch()
  const handleActive = useCallback((item: IBtns) => {
    setActive(item.journeyType);
    dispatch(handleJourneyWay(item.journeyTypeNo));
  }, [dispatch]);
  const handleRender = useCallback(({ item }: { item: IBtns }) => {
    
    return (
      <TouchableOpacity style={[styles.btnsContainer, active === item.journeyType && styles.active]}
        onPress={() => handleActive(item)}>
        <Text style={[styles.btnTitle, active === item.journeyType && styles.activeText]}>{item.journeyType}</Text>
      </TouchableOpacity>
    );
  }, [active, setActive]);
  const handleSelectedDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    console.log("clicked");
    // debugger
    if (event.type === 'set') {
      setCalenderOpen({ departureCalender: false });
      dispatch(handleDepartureDateChange(selectedDate));
    } else {
      setCalenderOpen({ departureCalender: false });
    }
  }, [dispatch]);

  const handleSelectedReturnDate = useCallback((event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set') {
      setCalenderOpen({ returCalender: false });
      dispatch(handleReturnDateChange(selectedDate));
    } else {
      setCalenderOpen({ returCalender: false });
    }
  }, [dispatch]);
  const handleOpenCalender = useCallback(() => {
    setCalenderOpen((prevState) => ({ ...prevState, departureCalender: true }));
  }, []);
  const handleOpenReturnCalender = useCallback(() => {
    setCalenderOpen((prevState) => ({ ...prevState, returCalender: true }));
  }, []);
  const handleChange = (e: string, name: string) => {

    if (name === "origin") {
      dispatch(selectOriginWithDebounce(e));
      dispatch(handleChangeOriginTextInput({ e, name }))
    }
    else {
      dispatch(selectDestinationWithDebounce(e))
      dispatch(handleChangeDestinationTextInput({ e, name }))
    }
  }
  const MemoizedAirportItem = React.memo(( item:SelectedFlightObj ) => (
    <TouchableOpacity style={styles.renderItemsContainer} onPress={() => dispatch(handleOriginSelectedAirPort(item))}>
    <View>
      <Text>{`${item.address.cityName},${item.address.countryName}`}</Text>
      <Text style={styles.airportName}>{item.name}</Text>
    </View>
    <View>
      <Text>{item.iataCode}</Text>
    </View>
  </TouchableOpacity>
  ));
const handleSearch=()=>
{
 
if(originSelectedAirport.address.cityName&&destinationSelectedAirPort.address.cityName&&departureformattedDate.length!==0)
  {
    navigate("OneWayFlights")
    dispatch(flightSearching()) 
    dispatch(fetchFlightsLogos())
  }
  
}



  return (
    <View style={styles.subContainer}>
      <ScrollView style={{ flex: 1}} showsVerticalScrollIndicator={false} >
        <FlatList data={btns} renderItem={handleRender} keyExtractor={item => item.journeyType} horizontal style={styles.btnContainer}/>
        <View style={styles.fieldsContainer}>
          <SearchInputs btn={false} dropDown={false} placeholder='Origin' handleChangeText={handleChange} Value={origin} stateName="origin" selectedObj={originSelectedAirport} selected={originselected} />
          {
            oriRes ?
              <View >
                {airportOriginLoading ? (
                  <Text>Loading......</Text>
                ) : airportOriginData.length === 0 ?
                  <Text>No Data!!!</Text> : <View style={{ flex: 1 }}>
                    <FlatList data={airportOriginData} renderItem={({ item }:any) => <MemoizedAirportItem {...item} />} nestedScrollEnabled style={styles.airportOriginDataContainer} />
                  </View>}
              </View> : null
          }
          <SearchInputs btn={false} dropDown={false} placeholder='Destination' handleChangeText={handleChange} Value={destination} stateName="destination" selectedObj={destinationSelectedAirPort} selected={destinationselected} />
          {
            desRes ?
              <View >
                {airportDestinationLoading ? (
                  <Text>Loading......</Text>
                ) : airportDestinationData.length === 0 ?
                  <Text>No Data!!!</Text> : <View style={{ flex: 1 }}>
                    <FlatList data={airportDestinationData} renderItem={({ item }) => {
                      return (
                        <TouchableOpacity style={styles.renderItemsContainer} onPress={() => dispatch(handleDestinationSelectedAirPort(item))}>
                          <View>
                            <Text>{`${item.address.cityName},${item.address.countryName}`}</Text>
                            <Text style={styles.airportName}>{item.name}</Text>
                          </View>
                          <View>
                            <Text>{item.iataCode}</Text>
                          </View>
                        </TouchableOpacity>
                      )
                    }} nestedScrollEnabled style={styles.airportOriginDataContainer} />
                  </View>}
              </View> : null
          }
          <View {...active === "Round Trip" && { style: { flexDirection: 'row', justifyContent: 'space-between' } }}>
            <SearchInputs datePick='departure' btn={true} dropDown={false} placeholder={departure}{...active === "Round Trip" && { customStyles: { width: responsiveWidth(41) } }} handleDatePicker={handleOpenCalender} />
            {active === "Round Trip" && <SearchInputs datePick="return" btn={true} dropDown={false} placeholder={returnDate} customStyles={{ width: responsiveWidth(41) }} handleDatePicker={handleOpenReturnCalender} />}
          </View>
          <View style={{ flexDirection: "row", justifyContent: 'space-evenly' }}>
            <DropDown length={10} particularState='adults' />
            <DropDown length={9} particularState='children' />
            <DropDown length={9} particularState='infants' />
          </View>
          <SearchInputs btn={true} dropDown={true} placeholder='Origin' />
         <View style={styles.searchFlightsBtnConatainer}>
         <CustomButton title='Search Flight' handleSubmit={handleSearch} />
         </View>
        </View>
        {calenderOpen.departureCalender && <DateTimePicker
          value={dateValue}
          mode="date"
          display="default"
          onChange={handleSelectedDate}
          minimumDate={new Date()}
          is24Hour={true}
        />}
        {calenderOpen.returCalender && <DateTimePicker
          value={returnDateValue}
          mode="date"
          display="default"
          onChange={handleSelectedReturnDate}
          minimumDate={dateValue}
          is24Hour={true}
        />}
      </ScrollView>
    </View>
  )
}

export default FlightsSearch