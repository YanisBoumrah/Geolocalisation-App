import React from 'react';
import { StyleSheet, Text, View } from 'react-native'


const Chat = () => {

  

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Chat</Text>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
})
