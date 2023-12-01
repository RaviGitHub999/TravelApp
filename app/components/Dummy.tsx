import { View, Text } from 'react-native'
import React from 'react'
import SearchInputs from './common/searchInputs/SearchInputs'
import DropDown from './common/dropDown/DropDown'
const Dummy = () => {
  return (
    <View>
      <DropDown length={10} particularState='adults'/>
    </View>
  )
}

export default Dummy
