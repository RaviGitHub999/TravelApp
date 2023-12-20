// import { View, Text } from 'react-native'
// import React from 'react'
// import SearchInputs from './common/searchInputs/SearchInputs'
// import DropDown from './common/dropDown/DropDown'
// const Dummy = () => {
//   return (
//     <View>
//       <DropDown length={10} particularState='adults'/>
//     </View>
//   )
// }

// export default Dummy
const data=[
  [
    {segment:[[{name: 'ravi', age: 20},{ name: 'rishi', age: 21 }]]  },
    {segment:[[{name: 'ravi1', age: 20},{ name: 'rishi1', age: 21 }]]  },
    {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
  ],
  [
    {segment:[[{name: 'jay', age: 20},{ name: 'kumar', age: 21 }]]  },
    {segment:[[{name: 'jay1', age: 20},{ name: 'kumar1', age: 21 }]]  },
    {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
  ],
  [
    {segment:[[{name: 'venky', age: 20},{ name: 'prathyusha', age: 21 }]]  },
    {segment:[[{name: 'venky1', age: 20},{ name: 'prathyusha1', age: 21 }]]  },
    {segment:[[{name: 'ravi2', age: 20},{ name: 'rishi2', age: 21 }]]  },
  ]
]
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// const YourComponent = () => {
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//   const renderItem = ({ item, index }) => {
    
//     const isCardExpanded = index === expandedCardIndex;

//     const renderObject = (object, objIndex) =>{ 
//    console.log(object,"=========")
//       return(
//       <View key={objIndex} style={{ borderWidth: 1, padding: 10, margin: 5 }}>
//         {/* <Text>Name: {object[0].name}</Text>
//         <Text>Age: {object[0].age}</Text> */}
//       </View>
//     );}

//     const renderViewAllButton = () => (
//       <TouchableOpacity onPress={() => setExpandedCardIndex(isCardExpanded ? null : index)}>
//         <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
//           <Text>{isCardExpanded ? 'Collapse' : 'View All'}</Text>
//         </View>
//       </TouchableOpacity>
//     );

//     return (
//       <View>
//         {/* Display the first object of each sub-array */}
//         {renderObject(item[0].segment.flat(1), index)}

//         {/* Display the remaining objects if the card is expanded */}
//         {isCardExpanded && (
//           <FlatList
//             data={item.slice(1)[index].segment.flat(1)}
//             renderItem={({ item: object, index: objIndex }) => renderObject(object, objIndex)}
//             keyExtractor={(object, objIndex) => objIndex.toString()}
//           />
//         )}

//         {/* Display "View All" button for each card */}
//         {renderViewAllButton()}
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   );
// };

// export default YourComponent;
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList } from 'react-native';

// const YourComponent = () => {
//   const [expandedCardIndex, setExpandedCardIndex] = useState(null);

//   const renderItem = ({ item, index }) => {
//     const isCardExpanded = index === expandedCardIndex;
//     console.log(index)
// // console.log(item.slice(1).flat(2)[0].segment.flat(2),"99999999999")

//     const renderObject = (object, objIndex) => (
      
//       <View key={objIndex} style={{ borderWidth: 1, padding: 10, margin: 5 }}>
//         <Text>Name: {object.name}</Text>
//         <Text>Age: {object.age}</Text>
//       </View>
//     );

//     const renderViewAllButton = () => (
//       <TouchableOpacity onPress={() => setExpandedCardIndex(isCardExpanded ? null : index)}>
//         <View style={{ borderWidth: 1, padding: 10, margin: 5 }}>
//           <Text>{isCardExpanded ? 'Collapse' : 'View All'}</Text>
//         </View>
//       </TouchableOpacity>
//     );

//     return (
//       <View>
//         {/* Display the first object of each sub-array */}
//         {item[0].segment.flat(1).map((object, objIndex) => renderObject(object, objIndex))}

//         {/* Display the remaining objects if the card is expanded */}
//         {isCardExpanded && (
//           <FlatList
//             data={item.slice(1).flat(2)[index].segment.flat(2)}
//             renderItem={({ item: object, index: objIndex }) => renderObject(object, objIndex)}
//             keyExtractor={(object, objIndex) => objIndex.toString()}
//           />
//         )}

//         {/* Display "View All" button for each card */}
//         {renderViewAllButton()}
//       </View>
//     );
//   };

//   return (
//     <FlatList
//       data={data}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//     />
//   );
// };
// export default YourComponent;

// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const DisplayCards = () => (
//   <View style={styles.container}>
//     <View style={styles.cardContainer}>
//       {data.map((array, arrayIndex) =>
//         array.map((obj, objIndex) => (
//           <View key={`${arrayIndex}-${objIndex}`} style={styles.card}>
//             {obj.segment[0].map((person, personIndex) => (
//               <View key={`${arrayIndex}-${objIndex}-${personIndex}`}>
//                 <Text>Name: {person.name}</Text>
//                 <Text>Age: {person.age}</Text>
//               </View>
//             ))}
//           </View>
//         ))
//       )}
//     </View>
//   </View>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     margin: 5,
//   },
// });

// export default DisplayCards;


// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// const DisplayCards = () => {
//   const [showAll, setShowAll] = useState(false);

//   // Extract the first object from each array
//   const initialData = data.map((array) => array[0]);

//   // Use state to manage which data to display
//   const [displayData, setDisplayData] = useState(initialData);

//   const handleSeeAll = () => {
//     // If 'See All' button is clicked, display all objects
//     if (!showAll) {
//       const allData = data.flat();
//       setDisplayData(allData);
//     }

//     // Toggle the state to switch between initial and all data
//     setShowAll(!showAll);
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.cardContainer}>
//         {displayData.map((obj, objIndex) => (
//           <View key={objIndex} style={styles.card}>
//             {obj.segment[0].map((person, personIndex) => (
//               <View key={`${objIndex}-${personIndex}`}>
//                 <Text>Name: {person.name}</Text>
//                 <Text>Age: {person.age}</Text>
//               </View>
//             ))}
//           </View>
//         ))}
//       </View>
//       {!showAll && (
//         <Button
//           title="See All"
//           onPress={handleSeeAll}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     margin: 5,
//   },
// });

// export default DisplayCards;
// import React, { useState } from 'react';
// import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

// const DisplayCards = () => {
//   const [showAll, setShowAll] = useState(Array(data.length).fill(false));

//   const handleSeeAll = (index) => {
//     setShowAll((prevShowAll) => {
//       const updatedShowAll = [...prevShowAll];
//       updatedShowAll[index] = !updatedShowAll[index];
//       return updatedShowAll;
//     });
//   };

  // const renderItem = ({ item, index }) => (
  //   <View style={styles.cardContainer}>
  //     {showAll[index] ? (
  //       // If "See All" button is clicked, display all items in the array
  //       item.map((obj, objIndex) => (
  //         <View key={`${index}-${objIndex}`} style={styles.card}>
  //           {obj.segment[0].map((person, personIndex) => (
  //             <View key={`${index}-${objIndex}-${personIndex}`}>
  //               <Text>Name: {person.name}</Text>
  //               <Text>Age: {person.age}</Text>
  //             </View>
  //           ))}
  //         </View>
  //       ))
  //     ) : (
  //       // Display only the first item in the array initially
  //       <View key={`${index}-0`} style={styles.card}>
  //         {item[0].segment[0].map((person, personIndex) => (
  //           <View key={`${index}-0-${personIndex}`}>
  //             <Text>Name: {person.name}</Text>
  //             <Text>Age: {person.age}</Text>
  //           </View>
  //         ))}
  //       </View>
  //     )}
  //     {!showAll[index] && (
  //       <Button title="See All" onPress={() => handleSeeAll(index)} />
  //     )}
  //   </View>
  // );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => String(index)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardContainer: {
//     justifyContent: 'space-around',
//     marginBottom: 20,
//   },
//   card: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     margin: 5,
//   },
// });

// export default DisplayCards;

import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomRadioButton from './common/customRadioButton/CustomRadioButton';

const Dummy = () => {
  const [selectedValue, setSelectedValue] = useState(""); 
  console.log(selectedValue)
  return ( 
    <View> 
        <CustomRadioButton 
            label="ReactJS"
            selected={selectedValue === 'option1'} 
            onSelect={() => setSelectedValue('option1')} 
        /> 
        <CustomRadioButton 
            label="NextJs"
            selected={selectedValue === 'option2'} 
            onSelect={() => setSelectedValue('option2')} 
        /> 
        <CustomRadioButton 
            label="React Native"
            selected={selectedValue === 'option3'} 
            onSelect={() => setSelectedValue('option3')} 
        /> 
    </View> 
); 
}

export default Dummy
