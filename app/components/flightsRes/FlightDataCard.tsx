import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils/responsiveScale';
import IconSwitcher from '../common/icons/IconSwitcher';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { colors, fonts } from '../../config/theme';
import { handleViewAllFlights } from '../../redux/reducers/flightSearch';
import RemainingFlights from './RemainingFlights';
interface LogosData {
    id: string,
    url: string
}[]
interface IProps {
    flightsNumdata:{
        Airline:{
            AirlineCode: string,
            AirlineName: string,
            FareClass:string,
            FlightNumber: string,
        },
        AccumulatedDuration:number,
        Origin:{
            DepTime:string,
            Airport:{
                AirportCode:string
            }
        },
        Destination:{
            ArrTime:string ,
            Airport:{
                AirportCode:string
            }
        },
        GroundTime:number
    } [],
    price: number,
    singleItem:any,
    i:number
}
const FlightDataCard: React.FC<IProps> = React.memo(({flightsNumdata, price,singleItem,i }) => {
   const dispatch=useDispatch()
    const [modalVisible, setModalVisible] = useState(false);
    const[viewAll,setViewAll]=useState(false)
    const { originSelectedAirport, destinationSelectedAirPort ,airlinelogos} = useSelector((state: RootState) => state.flightReducer)
    const airlineName=flightsNumdata[0].Airline.AirlineName
    const DepTime = flightsNumdata[0]?.Origin?.DepTime
    const ArrTime = flightsNumdata[flightsNumdata.length - 1].Destination.ArrTime
    const fn = flightsNumdata.map((ele: any, ind) => {
        return (
            <Text key={ind}>{ind > 0 && ', '}{`${ele.Airline.AirlineCode} - ${ele.Airline.FlightNumber} ${ele.Airline.FareClass}`}</Text>
        )
    })
    const flightSymbol = () => {
        const logo: LogosData[] = airlinelogos.filter((ele: { id: string }) => ele.id === airlineName?.toLowerCase())
        return logo[0]?.url
    }
    const flightsTimings = (timestamp: string) => { return <Text>{timestamp.slice(timestamp.indexOf("T") + 1, -3)}</Text> }
    const eachFlighttotalTimeTravelling = (t1: string, t2: string) => {
        const time1 = new Date(t1);
        const time2 = new Date(t2);
        const timeDifferenceMillis = Math.abs(time2.getTime() - time1.getTime());
        const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
        return <Text>{`${hours} h ${minutes} m`}</Text>
    }
    const totalTimeTravelling = (t1: string, t2: string) => {
        const time1 = new Date(t1);
        const time2 = new Date(t2);
        const timeDifferenceMillis = Math.abs(time2.getTime() - time1.getTime());
        // const daysDifference = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));
        // travellingdays=daysDifference
        // Convert the time difference to hours and minutes
        if (flightsNumdata.length > 1) {
            const totalMinutes = flightsNumdata[flightsNumdata.length - 1]?.AccumulatedDuration
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;
            return <Text>{`${hours}h`} {minutes > 0 ? `${minutes}m` : null}</Text>
        }
        else {
            const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
            return <Text>{`${hours}h`} {minutes > 0 ? `${minutes}m` : null}</Text>
        }
    }
    const formatDaysDifference = (departureDateTime: string, arrivalDateTime: string) => {
        const departureDate:Date = new Date(departureDateTime);
        const arrivalDate :Date= new Date(arrivalDateTime);
        const timeDifference = arrivalDate.getTime() - departureDate.getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        if (daysDifference >= 1) {
            return <Text>{`${daysDifference}${daysDifference > 1 ? "days" : "day"}`}</Text>
        }
    }
    const LayOverTime=(ele:number)=>{
        if (ele> 0) {
                    const totalMinutes = ele;
                    const hours = Math.floor(totalMinutes / 60);
                    const minutes = totalMinutes % 60;
                    return (
                        <Text>{`${hours} h  ${minutes} m`}</Text>
                    )
                }
    }
    const flightRoute = flightsNumdata.map((ele, ind) => {
        const DepTime = ele.Origin.DepTime;
        const ArrTime = ele.Destination.ArrTime
        return (
            <View key={ele?.Airline.FlightNumber} >
                <View style={styles.flightRouteEachCard}>
                    <View style={styles.originContainer}>
                        <Text style={styles.flightTimings}>{flightsTimings(DepTime)}</Text>
                        <Text style={styles.originTitle}>{ele.Origin.Airport.AirportCode}</Text>
                    </View>
                    <View style={styles.horizentalLineContainer}>
                        <View style={styles.horizentalLine}></View>
                        <Text style={styles.eachFlighttotalTime}>{eachFlighttotalTimeTravelling(DepTime, ArrTime)}</Text>
                    </View>
                    <View style={styles.destinationContainer}>
                        <Text style={styles.flightTimings}>{flightsTimings(ArrTime)}</Text>
                        <Text style={styles.destinationTitle}>{ele.Destination.Airport.AirportCode}</Text>
                    </View>
                </View>
                {flightsNumdata.length > 1 && ind < flightsNumdata.length - 1 && <View style={styles.layOver}><Text style={styles.layoverTiming}><Text style={styles.layoverTitle}>{`LayOver For :  `}</Text>{LayOverTime(flightsNumdata[ind+1].GroundTime)} {`${ele.Destination.Airport.AirportCode}`}</Text></View>}
            </View>
        )
    })
    const farePrice = (p: number) => {
        const roundedNumber = Math.ceil(p);
        const formattedNumber = roundedNumber.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
        });
        return formattedNumber.slice(0, formattedNumber.indexOf("."))
    }
    const handleEachFlightCard=({item,index}:{item:any,index:number})=>
    {
    return(
        <View style={styles.viewAllRenderingContainer}>
        <View style={styles.viewAllEachCard}>
        <Text style={styles.fareClassification}>{item.FareClassification.Type}</Text>
        <View style={styles.viewAlliconContainer}>
        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='bag-suitcase-outline' color='black' iconsize={3.5} /></TouchableOpacity>
        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='cancel' color='black' iconsize={3.5} /></TouchableOpacity>
        </View>
    </View>
    <Text style={styles.farePrice}>{farePrice(item.Fare.OfferedFare)}</Text>
    <TouchableOpacity style={styles.bookingButton}>
        <Text style={styles.bookingButtonText}>Book</Text>
    </TouchableOpacity>
        </View>
    )
    }
    return (
        <View style={styles.mainContainer}>
            <View style={styles.logoHeader}>
                <View style={styles.flightLogoContainer}>{flightSymbol() ? (
                    <Image source={{ uri: flightSymbol() }} style={styles.flightLogo} resizeMode='contain' />
                ) : <IconSwitcher componentName='FontAwesome5' iconName='plane-departure' iconsize={3}/>}</View>
                <Text style={styles.airlineName}>{`${airlineName}`}</Text>
               <View style={{width:"60%"}}>
               <Text style={styles.flightNumbers}>({fn})</Text>
               </View>
            </View>
            <View style={styles.flightsTimingContainer}>
                <View style={styles.originContainer}>
                   <Text style={styles.flightTimings}>{flightsTimings(DepTime)}</Text>
                    <Text style={styles.originTitle}>{originSelectedAirport.iataCode}</Text>
                </View>
                <View style={styles.directionContainer} >
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.stopsBtn}>
                        <Text style={styles.stopsBtnText}>{flightsNumdata.length > 1 ? `${flightsNumdata.length - 1} ${flightsNumdata.length > 1 ? "Stop" : "Stops"}` : "Direct"}</Text>
                        <IconSwitcher componentName='EvilIcons' iconName='chevron-up' iconsize={3.5} color={colors.highlight}/>
                    </TouchableOpacity>
                    <View style={{ borderTopWidth: 1, borderStyle: "dashed" }}></View>
                    <Text style={styles.flighttotalTime}> {totalTimeTravelling(DepTime, ArrTime)}</Text>
                </View>
                <View style={styles.destinationContainer}>
                    {/* <Text>{travellingdays!==0&&`${travellingdays} days`}</Text> */}
                    {/* {formatDaysDifference(DepTime, ArrTime)} */}
                    <Text style={styles.flightTimings}>{flightsTimings(ArrTime)}</Text>
                    <Text style={styles.destinationTitle}>{destinationSelectedAirPort.iataCode}</Text>
                </View>
            </View>
            <View>
                <View style={styles.flightPricesContainer}>
                    <View style={styles.luggageBagContainer}>
                        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='bag-suitcase-outline' color='black' iconsize={3.5} /></TouchableOpacity>
                        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='cancel' color='black' iconsize={3.5} /></TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.farePrice}>{farePrice(price)}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookingButton}>
                        <Text style={styles.bookingButtonText}>Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <View style={styles.modelMainContainer}>
                    <View style={styles.modelSubContainer}>
                        <TouchableOpacity style={styles.crossIcon} onPress={() => setModalVisible(false)}><IconSwitcher componentName='Entypo' iconName='cross' color={colors.black} iconsize={3} /></TouchableOpacity>
                        {flightRoute}
                    </View>
                </View>
            </Modal>
            <TouchableOpacity style={{alignItems:'center'}} onPress={()=>setViewAll(!viewAll)}><Text style={{color:colors.facebook}} >View All</Text></TouchableOpacity>
       {viewAll&&<FlatList data={singleItem.slice(1)} renderItem={handleEachFlightCard} keyExtractor={(item=>item.ResultIndex)} nestedScrollEnabled />}
        </View>
    )
})
export default FlightDataCard
const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: responsiveWidth(3.5),
        paddingVertical: responsiveHeight(3),
        backgroundColor: colors.white,
        borderRadius: responsiveHeight(2),
        rowGap:responsiveHeight(2.5),
        elevation:responsiveHeight(1)
    },
    flightLogoContainer: {
        height: responsiveHeight(4),
        width: responsiveHeight(4),
        alignItems: 'center',
        justifyContent: "center",
    },
    flightLogo: {
        height: responsiveHeight(7),
        width: responsiveWidth(7),
    },
    logoHeader: {
        flexDirection: "row",
        columnGap: responsiveWidth(3),
        alignItems: 'center'
    },
    flightsTimingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flightPricesContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    directionContainer: {
        width: "50%",
        rowGap: 4
    },
    luggageBagContainer: {
        width: "25%",
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flightRouteEachCard: {
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: responsiveHeight(1.5),
        backgroundColor: colors.highlightTranslucent,
        padding: responsiveHeight(2),
        borderRadius: responsiveHeight(1.5),
        alignContent: 'center'
    },
    horizentalLineContainer: {
        justifyContent: 'center',
        width: "50%",
        rowGap: responsiveHeight(1)
    },
    horizentalLine: {
        borderBottomWidth: responsiveWidth(.3),
        borderStyle: "dashed",
        marginTop: "15%",
        color: colors.black
    },
    eachFlighttotalTime: {
        textAlign: "center",
        fontSize: responsiveFontSize(1.8),
        fontFamily: fonts.textFont,
        color: colors.black
    },
    layOver: {
        marginBottom: responsiveHeight(1.5),
        paddingHorizontal: responsiveHeight(2)
    },
    destinationContainer: {
        alignItems: 'flex-end',
        rowGap: responsiveHeight(0.5)
    },
    originContainer: {
        rowGap: responsiveHeight(0.5)
    },
    destinationTitle: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: fonts.primary,
        color: colors.black
    },
    originTitle: {
        fontSize: responsiveFontSize(2.2),
        fontFamily: fonts.primary,
        color: colors.black
    },
    flightTimings: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: fonts.textFont,
        color: colors.black
    },
    layoverTitle: {
        fontSize: responsiveFontSize(1.9),
        fontFamily: fonts.primary,
        color: colors.red
    },
    layoverTiming: {
        fontSize: responsiveFontSize(1.8),
        fontFamily: fonts.textFont,
        color: colors.gray
    },
    modelMainContainer: {
        justifyContent: 'center',
        height: '100%',
    },
    modelSubContainer: {
        backgroundColor: colors.white,
        paddingHorizontal: responsiveWidth(3),
        marginHorizontal: responsiveWidth(2),
        borderRadius: responsiveHeight(2),
        paddingBottom: responsiveHeight(1),
        borderWidth: 1,
        borderStyle: "dashed",
        elevation:responsiveHeight(1)
    },
    crossIcon: {
        alignItems: 'flex-end',
        padding: responsiveHeight(1)
    },
    airlineName:{
        fontSize:responsiveFontSize(2.2),
        fontFamily:fonts.primary,
        color:colors.black
    },
    flightNumbers:{
        fontSize:responsiveFontSize(1.6),
        fontFamily:fonts.textInput,
        color:colors.gray,
        // borderWidth:1,
        // paddingHorizontal:10
    },
    stopsBtn:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
columnGap:responsiveWidth(2)
    },
    stopsBtnText:{
        color:colors.highlight
    },
    flighttotalTime:{
        fontSize:responsiveFontSize(1.8),
        textAlign:"center",
        fontFamily:fonts.textFont,
        color:colors.black
    },
    farePrice:{
        color:colors.red,
        fontSize:responsiveFontSize(2)
    },
    bookingButton:{
        backgroundColor:colors.primary,
        paddingHorizontal:responsiveHeight(3),
        borderRadius:responsiveHeight(2),
        paddingVertical:responsiveHeight(1),
        alignItems:'center',
        justifyContent:'center'
    },
    bookingButtonText:{
        color:colors.white,
        fontFamily:fonts.textInput
    },
    viewAllEachCard:{
        width:"25%",
      rowGap:responsiveHeight(0.9)
    },
    viewAlliconContainer:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    viewAllRenderingContainer:{
        marginBottom:responsiveHeight(2),
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:"center",
        backgroundColor:colors.gray,
        borderRadius:responsiveHeight(2),
        padding:responsiveHeight(1.3)
    },
    fareClassification:{
fontSize:responsiveHeight(1.6),
fontFamily:fonts.primary,
color:colors.facebook
    }
})

