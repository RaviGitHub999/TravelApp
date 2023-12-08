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
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

const YourComponent = () => {
  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const renderItem = ({ item, index }) => {
    const isCardExpanded = index === expandedCardIndex;
    console.log(index)
console.log(item.slice(1).flat(2)[0].segment.flat(2),"99999999999")

    const renderObject = (object, objIndex) => (
      <View key={objIndex} style={{ borderWidth: 1, padding: 10, margin: 5 }}>
        {/* <Text>Name: {object.name}</Text>
        <Text>Age: {object.age}</Text> */}
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
        {item[0].segment.flat(1).map((object, objIndex) => renderObject(object, objIndex))}

        {/* Display the remaining objects if the card is expanded */}
        {isCardExpanded && (
          <FlatList
            data={item.slice(1)[index].segment.flat(1)}
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
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default YourComponent;
