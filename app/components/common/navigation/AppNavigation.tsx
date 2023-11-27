import { View, Text } from 'react-native'
import React from 'react'

const mainNavigation:React.FC<{userRole:number}>=({userRole})=>{
    switch (userRole) {
        case 1:
          return  <></>;
          case 2:
            return <></>;
        default:
            return <></>
    }

}



const AppNavigation = () => {
  return (
    <View>
      <Text>AppNavigation</Text>
    </View>
  )
}

export default AppNavigation