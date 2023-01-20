import React from 'react';
import {View, Text,StyleSheet} from 'react-native';

const Zebbi = () => {

  return (

    <View style = {styles.zebbi} >
    <Text style = {styles.text}> Abouch </Text>

    </View>
  );
};
const styles = StyleSheet.create({
    
    zebbi: {
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: 'yellow',
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
  
export default Zebbi;