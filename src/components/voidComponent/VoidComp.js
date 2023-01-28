import React from 'react';
import {  StyleSheet, View } from 'react-native'


const VoidComp = () => {
  return (
    <View style={styles.container}>
    </View>
  );
};

export default VoidComp;

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        width: 0,
        height: 0,
      },
})
