import React from 'react';
import { StyleSheet, Text, View } from 'react-native'
import MapComp from '../../components/MapComponent/MapComp';


const MapScreen = () => {

  

  return (
    <View style={styles.container}>
        <MapComp/>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
})
