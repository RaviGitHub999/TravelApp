import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { responsiveHeight, responsiveWidth } from '../../utils/responsiveScale';
import IconSwitcher from '../common/icons/IconSwitcher';
interface IProps{
    airlineCode?:string,
    airlineName?:string,
    flightsNodata:[]
}
const FlightDataCard:React.FC<IProps> = ({airlineCode,airlineName,flightsNodata}) => {
    useEffect(()=>
    {
flightsNodata.map((ele:any)=>
{
  console.log(ele.Airline,"card")

})
    },[])
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
    useEffect(() => {
        flightsLogos()
    }, [])
    return (
        <View style={styles.mainContainer}>

            <View style={styles.logoHeader}>
                <View style={styles.flightLogoContainer}><Image source={{ uri: "https://firebasestorage.googleapis.com/v0/b/trav-biz.appspot.com/o/airline_logos%2Fthai-airways.png?alt=media&token=e2508860-8386-42d2-ba87-8a6518883b53" }} style={styles.flightLogo} resizeMode='contain' /></View>
                <Text>{`${airlineName}`}</Text>
                <Text>{`(${airlineCode} - ${7741} PR, 6E - 46 LR)`}</Text>
            </View>

            <View style={styles.flightsTimingContainer}>
                <View >
                    <Text>20:15</Text>
                    <Text>HYD</Text>
                </View>
                <View style={styles.directionContainer} >
                    <Text style={{ textAlign: 'center' }}>Direct</Text>
                    <View style={{ borderTopWidth: 1, borderStyle: "dashed" }}></View>
                    <Text style={{ textAlign: 'center' }}>5h 11m</Text>
                </View>
                <View>
                    <Text>20:15</Text>
                    <Text>HYD</Text>
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
}

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
        height: responsiveHeight(5),
        width: responsiveHeight(5),
        alignItems: 'center',
        justifyContent: "center",
    },
    flightLogo: {
        height: responsiveHeight(10),
        width: responsiveWidth(10),
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

