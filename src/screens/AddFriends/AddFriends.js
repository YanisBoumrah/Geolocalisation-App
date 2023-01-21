import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


const AddFriends = () => {

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>AddFriends</Text>
    </View>
  );
};

export default AddFriends;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
})
