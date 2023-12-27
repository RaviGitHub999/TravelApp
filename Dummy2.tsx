// import React, { useState } from 'react';
// import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

// const Dummy2 = () => {
//   const [selectedItems, setSelectedItems] = useState({});
//   console.log(selectedItems,"kkk")
//   const items = [1, 2, 3, 4];

//   const toggleSelection = (item) => {
//     setSelectedItems(prevState => ({
//       ...prevState,
//       [item]: !prevState[item]
//     }));
//   };
// console.log(selectedItems)
//   return (
//     <View style={styles.container}>
//       {items.map(item => (
//         <TouchableOpacity 
//           key={item} 
//           style={[styles.button, selectedItems[item] && styles.selected]} 
//           onPress={() => toggleSelection(item)}
//         >
//           <Text style={styles.buttonText}>
//             {selectedItems[item] ? `Selected ${item}` : `Unselected ${item}`}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f4f4f4',
//   },
//   button: {
//     padding: 15,
//     margin: 10,
//     backgroundColor: '#ddd',
//     borderRadius: 5,
//   },
//   selected: {
//     backgroundColor: 'green',
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Dummy2;
import { View, Text } from 'react-native'
import React from 'react'

const Dummy2 = ({item}) => {
  return (
    <View>
      <Text>{item}</Text>
    </View>
  )
}

export default Dummy2