// import { View, Text, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { styles } from './styles'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../../redux/store'
// import IconSwitcher from '../common/icons/IconSwitcher'
// import { colors } from '../../config/theme'
// import FlightDataCard from './FlightDataCard'
// import { responsiveHeight } from '../../utils/responsiveScale'
// import { fetchFlightsLogos, handleFlightsFilter } from '../../redux/reducers/flightSearch'
// import ProgressBar from '../common/progressBar/ProgressBar'
// import { translate } from '../../config/i18n'
// import en from '../../config/locales/en'
// import FlightFilters from '../flightfilters/FlightFilters'

// const FlightsRes = (props: any) => {
//     const dispatch: AppDispatch = useDispatch()
//     const [show,setShow]=useState(false)
//     const { flightsData, flightSearchLoading,showFilters } = useSelector((state: RootState) => state.flightReducer)
//     const data = flightsData.flat(1)
//     const { destinationSelectedAirPort, departureformattedDate, originSelectedAirport, returnDate, departure, adults, children, infants, returnformattedDate, classes } = useSelector((state: RootState) => state.flightReducer)
//     const travellers = adults + children + infants
//     useEffect(() => {
//         dispatch(fetchFlightsLogos())
//     }, [])
//     // const handleSeeAll = (index:any) => {
//     //   setShowAll((prevShowAll) => {
//     //     const updatedShowAll = [...prevShowAll];
//     //     updatedShowAll[index] = !updatedShowAll[index];
//     //     return updatedShowAll;
//     //   });
//     // }
//     const MyListItem = React.memo(({ item, index }: { item: any, index: number }) => {
//         const singleCard = item[0].Segments.flat(1)
//         const farePrice = item[0].Fare.OfferedFare
//         return (
//             <View key={`${index}-0`} style={{ marginTop: 20, paddingHorizontal: 10 }}>
//                 <FlightDataCard flightsNumdata={singleCard} price={farePrice} singleItem={item} i={index} />
//             </View>
//         )
//     })
//     return (
//         <View style={styles.mainContainer}>
//             <View style={styles.headerContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>{`${originSelectedAirport.address.cityName} to ${destinationSelectedAirPort.address.cityName}`}</Text>
//                     <TouchableOpacity style={styles.editButton} onPress={() => props.navigation.goBack()}>
//                         <IconSwitcher componentName='MaterialIcons' iconName='edit' color={colors.white} iconsize={2.3} />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.travellerDescription}>
//                     <Text style={styles.descriptionTitles}>{`${departureformattedDate}`}</Text>
//                     {returnformattedDate.length !== 0 && <Text style={styles.descriptionTitles}>{` - ${returnformattedDate}`}</Text>}
//                     <Text style={styles.descriptionTitles}>{` | ${travellers} ${travellers <= 1 ? "traveller" : "travellers"} | `}</Text>
//                     <Text style={styles.descriptionTitles}>{classes}</Text>
//                 </View>
//             </View>
//             {/* {filters} */}  
//             {
//                 showFilters?<FlightFilters/>:<View style={styles.filtersHeaderContainer}>
//                 <View style={styles.filtersIconContainer}>
//                     <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
//                     <IconSwitcher  componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3}/>
//                 </View>
//                 <TouchableOpacity onPress={()=>dispatch(handleFlightsFilter(true))}>
//                 <IconSwitcher  componentName='Ionicons' iconName='chevron-down' color={colors.black} iconsize={3.5} />
//                 </TouchableOpacity>
//             </View>
//             }




//             {/*flightsRes */}

//             <View style={styles.activeIndicatorMainContainer}>
//                 {flightSearchLoading ? <View style={styles.activeIndicator}><ProgressBar /></View> : flightsData.length === 0 ? <Text style={styles.nodata}>{translate(en.flightsRes.noData)}</Text> : <FlatList
//                     data={data}
//                     renderItem={({ item, index }) => <MyListItem item={item} index={index} />}
//                     keyExtractor={(_, index) => String(index)}
//                     contentContainerStyle={{ paddingBottom: responsiveHeight(25) }}
//                     windowSize={5}
//                     maxToRenderPerBatch={5}
//                 />}
//             </View>
//         </View>
//     )
// }
// export default FlightsRes
// import { View, Text, TouchableOpacity, FlatList, Button, ActivityIndicator } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { styles } from './styles'
// import { useDispatch, useSelector } from 'react-redux'
// import { AppDispatch, RootState } from '../../redux/store'
// import IconSwitcher from '../common/icons/IconSwitcher'
// import { colors } from '../../config/theme'
// import FlightDataCard from './FlightDataCard'
// import { responsiveHeight } from '../../utils/responsiveScale'
// import { fetchFlightsLogos, handleFlightsFilter } from '../../redux/reducers/flightSearch'
// import ProgressBar from '../common/progressBar/ProgressBar'
// import { translate } from '../../config/i18n'
// import en from '../../config/locales/en'
// import FlightFilters from '../flightfilters/FlightFilters'

// const FlightsRes = (props: any) => {
//     const dispatch: AppDispatch = useDispatch()
//     const { flightsData, flightSearchLoading,showFilters } = useSelector((state: RootState) => state.flightReducer)
//     const { destinationSelectedAirPort, departureformattedDate, originSelectedAirport,adults, children, infants, returnformattedDate, classes } = useSelector((state: RootState) => state.flightReducer)
//     const travellers = adults + children + infants
//     return (
//         <View style={styles.mainContainer}>
//             <View style={styles.headerContainer}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>{`${originSelectedAirport.address.cityName} to ${destinationSelectedAirPort.address.cityName}`}</Text>
//                     <TouchableOpacity style={styles.editButton} onPress={() => props.navigation.goBack()}>
//                         <IconSwitcher componentName='MaterialIcons' iconName='edit' color={colors.white} iconsize={2.3} />
//                     </TouchableOpacity>
//                 </View>
//                 <View style={styles.travellerDescription}>
//                     <Text style={styles.descriptionTitles}>{`${departureformattedDate}`}</Text>
//                     {returnformattedDate.length !== 0 && <Text style={styles.descriptionTitles}>{` - ${returnformattedDate}`}</Text>}
//                     <Text style={styles.descriptionTitles}>{` | ${travellers} ${travellers <= 1 ? "traveller" : "travellers"} | `}</Text>
//                     <Text style={styles.descriptionTitles}>{classes}</Text>
//                 </View>
//             </View>

//         {/* {filters} */}  
//              {
//                 showFilters?<FlightFilters/>:<View style={styles.filtersHeaderContainer}>
//                 <View style={styles.filtersIconContainer}>
//                     <IconSwitcher  componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3}/>
//                     <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
//                 </View>
//                 <TouchableOpacity onPress={()=>dispatch(handleFlightsFilter(true))}>
//                 <IconSwitcher  componentName='Ionicons' iconName='chevron-down' color={colors.black} iconsize={3.5} />
//                 </TouchableOpacity>
//             </View>
//             }

//             {/*flightsRes */}
//             <View style={styles.activeIndicatorMainContainer}>
//                 {flightSearchLoading ? <View style={styles.activeIndicator}><ProgressBar /></View> : flightsData.length === 0 ? <Text style={styles.nodata}>{translate(en.flightsRes.noData)}</Text> : 
//                <FlightDataCard/>}
//             </View>
//         </View>
//     )
// }
// export default FlightsRes
import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { styles } from './styles';
import { colors } from '../../config/theme';
import { translate } from '../../config/i18n';
import en from '../../config/locales/en';
import IconSwitcher from '../common/icons/IconSwitcher';
import FlightDataCard from './FlightDataCard';
import ProgressBar from '../common/progressBar/ProgressBar';
import FlightFilters from '../flightfilters/FlightFilters';
import { handleFlightsFilter } from '../../redux/reducers/flightSearch';
import { responsiveHeight } from '../../utils/responsiveScale';

const FlightsRes = (props: any) => {
    console.log("res")
    const dispatch: AppDispatch = useDispatch();
    const {
        flightsData,
        flightSearchLoading,
        showFilters,
        destinationSelectedAirPort,
        departureformattedDate,
        originSelectedAirport,
        adults,
        children,
        infants,
        returnformattedDate,
        classes,
    
    } = useSelector((state: RootState) => state.flightReducer);

    const travellers = adults + children + infants;

    const renderHeader = () => (
        <View style={styles.headerContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>{`${originSelectedAirport.address.cityName} to ${destinationSelectedAirPort.address.cityName}`}</Text>
                <TouchableOpacity style={styles.editButton} onPress={() => props.navigation.goBack()}>
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
    );

    return (
        <View style={styles.mainContainer}>
            {renderHeader()}
            
            {showFilters ? (
                <FlightFilters />
            ) : (
                <View style={styles.filtersHeaderContainer}>
                    <View style={styles.filtersIconContainer}>
                        <IconSwitcher componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3} />
                        <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => dispatch(handleFlightsFilter(true))}>
                        <IconSwitcher componentName='Ionicons' iconName='chevron-down' color={colors.black} iconsize={3.5} />
                    </TouchableOpacity>
                </View>
            )}

            <View style={styles.activeIndicatorMainContainer}>
                {flightSearchLoading ? (
                    <View style={styles.activeIndicator}><ProgressBar/></View>
                ) : flightsData.length === 0 ? (
                    <Text style={styles.nodata}>{translate(en.flightsRes.noData)}</Text>
                ) : (
                   !showFilters && <FlightDataCard />
                )}
            </View>
        </View>
    );
};

export default React.memo(FlightsRes);
