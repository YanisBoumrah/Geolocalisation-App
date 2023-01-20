import React from 'react';
import {View, Text,StyleSheet} from 'react-native';
import MapContainer from '../../components/Maps/MapView';
import Zebbi from '../../components/zebbi';

const HomeScreen = () => {
  return (
    <View style = {styles.home} >
    <Text style = {styles.text}> Map</Text>
      <MapContainer/>
      {/* <Zebbi/> */}
    </View>
  );
};
const styles = StyleSheet.create({
    
    home: {
        flex: 1,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
        },
     text:{
           color:'black', 
              fontSize: 20,
              fontWeight: 'bold',
              zIndex: 2,
     },
  
  });
  
export default HomeScreen;
