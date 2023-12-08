import { View, Text, TouchableOpacity,FlatList} from 'react-native'
import React ,{useState} from 'react'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
const data=[
    [
      { name: 'ravi', age: 20 },
      { name: 'rishi', age: 21 },
      { name: 'kiran', age: 22 }
    ],
    [
      { name: 'red', age: 20 },
      { name: 'green', age: 21 },
      { name: 'blue', age: 22 }
    ],
    [
      { name: 'white', age: 20 },
      { name: 'black', age: 21 },
      { name: 'navyBlue', age: 22 }
    ]
  ]
const FlightsRes = (props: any) => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const { destinationSelectedAirPort, departureformattedDate, originSelectedAirport, returnDate, departure, adults, children, infants, returnformattedDate, classes } = useSelector((state: RootState) => state.flightReducer)
    const travellers = adults + children + infants
    const renderItem = ({ item, index }) => {
        const isCardExpanded = index === expandedCardIndex;
    
        const renderObject = (object, objIndex) => (
          <View key={objIndex} style={{ borderWidth: 1, padding: 10, margin: 5 }}>
            <Text>Name: {object.name}</Text>
            <Text>Age: {object.age}</Text>
          </View>
        );
    
        const renderViewAllButton = () => (
          <TouchableOpacity onPress={() => setExpandedCardIndex(isCardExpanded ? null : index)}>
            <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
              <Text>{isCardExpanded ? 'Collapse' : 'View All'}</Text>
            </View>
          </TouchableOpacity>
        );
    
        return (
          <View>
            {/* Display the first object of each sub-array */}
            {renderObject(item[0], index)}
    
            {/* Display the remaining objects if the card is expanded */}
            {isCardExpanded && (
              <FlatList
                data={item.slice(1)}
                renderItem={({ item: object, index: objIndex }) => renderObject(object, objIndex)}
                keyExtractor={(object, objIndex) => objIndex.toString()}
              />
            )}
    
            {/* Display "View All" button for each card */}
            {renderViewAllButton()}
          </View>
        );
      };
    return (
        <View style={styles.mainContainer}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Text style={styles.title}>{`${originSelectedAirport.address.cityName} to ${destinationSelectedAirPort.address.cityName}`}</Text>
                    <TouchableOpacity style={styles.editButton} onPress={() => console.log(props.navigation.goBack())}>
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
            {/* data */}
            <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
        </View>
    )
}

export default FlightsRes