
import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import IconSwitcher from '../common/icons/IconSwitcher';
import { colors, fonts } from '../../config/theme';
import { responsiveFontSize, responsiveHeight } from '../../utils/responsiveScale';
import { styles } from './styles';
import FlightsSearch from '../flight/FlightsSearch';
import HotelSearch from '../hotel/HotelSearch';
import { KeyboardAvoidingView } from 'react-native';
import { Platform } from 'react-native';
//'flights', 'hotel', 'bus', 'train'
const components = [
  {
    categoryName: "flights",
    iconName: "flight-takeoff",
    componentName: "MaterialIcons"
  },
  {
    categoryName: "hotel",
    iconName: "hotel",
    componentName: "FontAwesome"
  },
  {
    categoryName: "bus",
    iconName: "bus",
    componentName: "FontAwesome5"
  },
  {
    categoryName: "train",
    iconName: "train",
    componentName: "MaterialIcons"
  },
];
const getContent = (component: string) => {
  switch (component) {
    case 'flights':
      return <FlightsSearch/>;
    case 'hotel':
      return <HotelSearch/>;
    case 'bus':
      return <HotelSearch/>;
    case 'train':
      return <HotelSearch/>;
    default:
      return 'Default content goes here';
  }
};

const Home = () => {
  const [activeComponent, setActiveComponent] = useState(components[0].categoryName);
const flatListRef=useRef<FlatList>(null)
  const switchComponent = (component:string) => {
    setActiveComponent(component);
    const selectedIndex = components.findIndex((item) => item.categoryName === component);
    flatListRef.current?.scrollToIndex({ animated: true, index: selectedIndex});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Search {activeComponent} for your business travels</Text>
      </View>
      <View style={styles.headersContainer}>
        <View style={styles.nav} >
          <FlatList ref={flatListRef} data={components} renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[styles.navItem, activeComponent === item.categoryName && styles.active]}
                onPress={() => switchComponent(item.categoryName)}>
                <View style={styles.categoriesContainer}>
                  <IconSwitcher componentName={item.componentName} color={activeComponent===item.categoryName?colors.white:colors.primary} iconName={item.iconName} iconsize={3.2}/>
                  <Text style={activeComponent===item.categoryName?styles.categoryName:{...styles.categoryName,color:colors.primary}}>{item.categoryName}</Text>
                </View>
              </TouchableOpacity>
            )
          }} keyExtractor={item => item.categoryName} horizontal showsHorizontalScrollIndicator={false}   />
        </View>
        <View style={styles.section}>
        {getContent(activeComponent)}
        </View>
      </View>
    </View>
  );
};


export default Home;