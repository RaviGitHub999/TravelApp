import { View, Text, TouchableOpacity,FlatList, Button} from 'react-native'
import React ,{useState} from 'react'
import { styles } from './styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import IconSwitcher from '../common/icons/IconSwitcher'
import { colors } from '../../config/theme'
import FlightDataCard from './FlightDataCard'
// const data=[
//   [
//     {segment:[[{name: 'ravi', age: 20},{ name: 'rishi', age: 21 }]]  },
//     {segment:[[{name: 'ravi1', age: 20},{ name: 'rishi1', age: 21 }]]  },
//     {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
//   ],
//   [
//     {segment:[[{name: 'jay', age: 20},{ name: 'kumar', age: 21 }]]  },
//     {segment:[[{name: 'jay1', age: 20},{ name: 'kumar1', age: 21 }]]  },
//     {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
//   ],
//   [
//     {segment:[[{name: 'venky', age: 20},{ name: 'prathyusha', age: 21 }]]  },
//     {segment:[[{name: 'venky1', age: 20},{ name: 'prathyusha1', age: 21 }]]  },
//     {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
//   ]
// ]
const FlightsRes = (props: any) => {
    const [expandedCardIndex, setExpandedCardIndex] = useState(null);
    const {flightsData}=useSelector((state:RootState)=>state.flightReducer)
    const data=flightsData.flat(1)
    console.log(data)
    const [showAll, setShowAll] = useState(Array(data.length).fill(false));
    const { destinationSelectedAirPort, departureformattedDate, originSelectedAirport, returnDate, departure, adults, children, infants, returnformattedDate, classes } = useSelector((state: RootState) => state.flightReducer)
    const travellers = adults + children + infants

    const handleSeeAll = (index) => {
      setShowAll((prevShowAll) => {
        const updatedShowAll = [...prevShowAll];
        updatedShowAll[index] = !updatedShowAll[index];
        return updatedShowAll;
      });
    }
    const renderItem = ({ item, index }) =>{
    //  console.log(item[0].Segments.flat(1).length,"ooooo")
     const singleCard=item[0].Segments.flat(1)
     console.log(singleCard[0].Airline.AirlineCode)
    return (
  
      <View style={styles.cardContainer}>
        {showAll[index] ? (
          // If "See All" button is clicked, display all items in the array
          item.map((obj, objIndex) => (
            <View key={`${index}-${objIndex}`} >
              {obj.Segments[0].map((person, personIndex) => (
                console.log(person,"ravi")
                // <View key={`${index}-${objIndex}-${personIndex}`}>
                //   <Text>Name: {person.name}</Text>
                //   <Text>Age: {person.age}</Text>
                // </View>
              ))}
            </View>
          ))
        ) : (
          // Display only the first item in the array initially
          <View key={`${index}-0`} style={{marginTop:20,paddingHorizontal:10}}>
            {/* {item[0].Segments[0].map((person, personIndex) => (
              // console.log(person.Airline,"single")
              <View key={`${index}-0-${personIndex}`}>
                <Text>Name: {person.Origin.Airport.AirportName}</Text>
                <Text>Age: {person.age}</Text>
              </View>
            ))} */}
          <FlightDataCard airlineCode={singleCard[0].Airline.AirlineCode} airlineName={singleCard[0].Airline.AirlineName} flightsNodata={singleCard}/>
          
          </View>
        )}
        {/* {!showAll[index] && (
          <Button title="See All" onPress={() => handleSeeAll(index)} />
        )} */}
      </View>
    )}
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

              {/*flightsRes */}

            <View>
           { data.length!==0&&<FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => String(index)}
     contentContainerStyle={{paddingBottom:120}} />}
            </View>
        </View>
    )
}

export default FlightsRes