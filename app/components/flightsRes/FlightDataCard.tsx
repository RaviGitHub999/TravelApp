import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveScale';
import IconSwitcher from '../common/icons/IconSwitcher';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
interface LogosData{
    id:string,
    url:string
}[]
interface IProps{
    airlineCode?:string,
    airlineName?:string,
    flightsNumdata:[]
}
const FlightDataCard:React.FC<IProps> = React.memo (({airlineCode,airlineName,flightsNumdata}) => {
    const{originSelectedAirport,destinationSelectedAirPort}=useSelector((state:RootState)=>state.flightReducer)
    const DepTime= flightsNumdata[0]?.Origin?.DepTime
    const ArrTime=flightsNumdata[flightsNumdata.length-1].Destination.ArrTime
    let travellingdays
    console.log(DepTime,ArrTime)
    const fn= flightsNumdata.map((ele:any,ind)=>
    {
    //    console.log(ele.Destination.ArrTime,"time")
     return(
<Text key={ind}>{ind > 0 && ', '}{`${ele.Airline.AirlineCode} - ${ele.Airline.FlightNumber} ${ele.Airline.FareClass}`}</Text>
     )   
    })
    const flightSymbol=()=>
    {         
               const logo:LogosData[]= airlinelogos.filter((ele:{id:string})=>ele.id===airlineName?.toLowerCase())
             return  logo[0]?.url
    }
    var [airlinelogos, setAirlinelogos] = useState([]);
    const flightsLogos = async () => {
        await firestore().collection("airlinelogos").get().then((querySnapshot) => {
            let updatedAirlinelogos: any = [];
            querySnapshot.forEach(snapshot => {
                updatedAirlinelogos.push({ id: snapshot.id, url: snapshot.data().url });
            })
            setAirlinelogos(updatedAirlinelogos)
        })
    }
    const flightsTimings=(timestamp:string)=>
    {
return(
    <Text>{timestamp.slice(timestamp.indexOf("T")+1,-3)}</Text>
)
    }
    const totalTimeTravelling=(t1:string,t2:string)=>
    {
        const time1= new Date(t1);
        const time2= new Date(t2);
        const timeDifferenceMillis = Math.abs(time2.getTime() - time1.getTime());
        const daysDifference = Math.floor(timeDifferenceMillis / (1000 * 60 * 60 * 24));
        travellingdays=daysDifference
        // Convert the time difference to hours and minutes
        if(flightsNumdata.length>1)
        {
const totalMinutes=flightsNumdata[1]?.AccumulatedDuration
const hours = Math.floor(totalMinutes / 60);
const minutes = totalMinutes % 60;
return <Text>{`${hours} h ${minutes} m`}</Text>
        }
        else{
        const hours = Math.floor(timeDifferenceMillis / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifferenceMillis % (1000 * 60 * 60)) / (1000 * 60));
        return <Text>{`${hours} h ${minutes} m`}</Text>
        }
       
       
    }
    useEffect(() => {
        flightsLogos()
    }, [])
    return (
        <View style={styles.mainContainer}>

            <View style={styles.logoHeader}>
                <View style={styles.flightLogoContainer}>{flightSymbol() ? (
                        <Image source={{ uri: flightSymbol() }} style={styles.flightLogo} resizeMode='contain' />
                    ) : null}</View>
                <Text>{`${airlineName}`}</Text>
                <Text>({fn})</Text>
            </View>

            <View style={styles.flightsTimingContainer}>
                <View >
                {flightsTimings(DepTime)}
                    <Text>{originSelectedAirport.iataCode}</Text>
                </View>
                <View style={styles.directionContainer} >
                    <Text style={{ textAlign: 'center' }}>{flightsNumdata.length>1?`${flightsNumdata.length-1} Stop`:"Direct"}</Text>
                    <View style={{ borderTopWidth: 1, borderStyle: "dashed" }}></View>
                    <Text style={{ textAlign: 'center' }}> {totalTimeTravelling(DepTime,ArrTime)}</Text>
                </View>
                <View>
                    <Text>{travellingdays!==0&&`${travellingdays} days`}</Text>
                       {flightsTimings(ArrTime)}
                    <Text>{destinationSelectedAirPort.iataCode}</Text>
                </View>
            </View>

            <View>

                <View style={styles.flightPricesContainer}>
                    <View style={styles.luggageBagContainer}>
                        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='bag-suitcase-outline' color='black' iconsize={3.5} /></TouchableOpacity>
                        <TouchableOpacity><IconSwitcher componentName='MaterialCommunityIcons' iconName='cancel' color='black' iconsize={3.5} /></TouchableOpacity>
                    </View>

                    <View>
                        <Text>12,349</Text>
                    </View>
                    <TouchableOpacity >
                        <Text>Book</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
})

export default FlightDataCard
const styles = StyleSheet.create({
    mainContainer: {
        // borderWidth: 4,
        paddingHorizontal:responsiveWidth(2.5),
        paddingVertical:responsiveHeight(3),
        backgroundColor:'gray',
        borderRadius:responsiveHeight(2)
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
        columnGap: responsiveWidth(2),
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
    directionContainer:{
        width: "50%", 
        rowGap: 4 
    },
    luggageBagContainer:{
        width: "25%", 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    }
})

