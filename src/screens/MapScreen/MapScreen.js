import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


const MapScreen = () => {

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Maps</Text>
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
