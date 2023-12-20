import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { handleFlightsFilter } from '../../redux/reducers/flightSearch'
import { styles } from './styles'
import en from '../../config/locales/en'
import { translate } from '../../config/i18n'

const FlightFilters = () => {
    const dispatch:AppDispatch=useDispatch()
    const{flightsNamesList}=useSelector((state:RootState)=>state.flightReducer)
  console.log(flightsNamesList,"pppppp")
    return (
    <View style={styles.upArrowIconmainContainer}>
        <View style={styles.filtersIconContainer}>
        <Text style={styles.filterHeader}>{translate(en.flightsRes.filter)}</Text>
        <IconSwitcher  componentName='FontAwesome5' iconName='filter' color={colors.black} iconsize={3}/>
        </View>
    <TouchableOpacity style={styles.upArrowIcon} onPress={()=>dispatch(handleFlightsFilter(false))}>
        <IconSwitcher componentName='Ionicons' iconName='chevron-up' color={colors.black} iconsize={3.5}/>
    </TouchableOpacity>
    </View>
  )
}

export default FlightFilters
