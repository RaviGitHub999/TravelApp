import { View, Text, TouchableOpacity,FlatList, Button, ActivityIndicator} from 'react-native'
import React ,{useState} from 'react'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
import FlightDataCard from './FlightDataCard'
import { responsiveHeight } from '../../utils/responsiveScale'
const FlightsRes = (props: any) => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const {flightsData,flightSearchLoading}=useSelector((state:RootState)=>state.flightReducer)
    const data=flightsData.flat(1)
    const [showAll, setShowAll] = useState(Array(data.length).fill(false));
    const { destinationSelectedAirPort, departureformattedDate, originSelectedAirport, returnDate, departure, adults, children, infants, returnformattedDate, classes } = useSelector((state: RootState) => state.flightReducer)
    const travellers = adults + children + infants

    const handleSeeAll = (index:any) => {
      setShowAll((prevShowAll) => {
        const updatedShowAll = [...prevShowAll];
        updatedShowAll[index] = !updatedShowAll[index];
        return updatedShowAll;
      });
    }
    const MyListItem =  React.memo(({ item, index }:{item:any,index:number}) =>{
     const singleCard=item[0].Segments.flat(1)
     const farePrice=item[0].Fare.OfferedFare
    return (
          <View key={`${index}-0`} style={{marginTop:20,paddingHorizontal:10}}>
          <FlightDataCard airlineCode={singleCard[0].Airline.AirlineCode} airlineName={singleCard[0].Airline.AirlineName} flightsNumdata={singleCard} price={farePrice}/>
          </View>
    )})
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{`${originSelectedAirport.address.cityName} to ${destinationSelectedAirPort.address.cityName}`}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() =>props.navigation.goBack()}>
                        <IconSwitcher componentName='MaterialIcons' iconName='edit' color={colors.white} iconsize={2.3} />
                    </TouchableOpacity>
                </View>
                <View style={styles.travellerDescription}>
                    <Text style={styles.descriptionTitles}>{`${departureformattedDate}`}</Text>
                    {returnformattedDate.length !== 0 && <Text style={styles.descriptionTitles}>{` - ${returnformattedDate}`}</Text>}
                    <Text style={styles.descriptionTitles}>{` | ${travellers} ${travellers <= 1 ? "traveller" : "travellers"} | `}</Text>
                    <Text style={styles.descriptionTitles}>{classes}</Text>
                </View>
            </View>

              {/*flightsRes */}

            <View style={styles.activeIndicatorMainContainer}>
           {flightSearchLoading?<ActivityIndicator size={responsiveHeight(5)} color={colors.facebook} style={styles.activeIndicator}/>:flightsData.length===0?<Text>No data</Text>:<FlatList
        data={data}
        renderItem={({ item ,index}) => <MyListItem item={item} index={index} />}
        keyExtractor={(item, index) => String(index)}
     contentContainerStyle={{paddingBottom:responsiveHeight(25)}} 
     windowSize={5}  
    maxToRenderPerBatch={5}/>}
            </View>
        </View>
    )
}

export default FlightsRes