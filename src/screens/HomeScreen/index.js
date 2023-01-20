import React from 'react';
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

const index = () => {

  const navigation = useNavigation();

  useEffect(() =>{
    auth.onAuthStateChanged(user => {
      if(!user){
          navigation.replace("SignIn");
      }
  })
  },[])

  const handleLogOut = () => {
    auth.signOut()
    .then(() =>{
        console.log("logged out")
    })
    .catch(err => alert(err.message));
  }

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Home, sweet home</Text>
      <TouchableOpacity
        onPress={handleLogOut}
        style={styles.button}
      >
      <Text style = {styles.buttonText}> Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  button : {
      backgroundColor: '#0782F9',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40
  },
  buttonText: {
      color: 'white',
      fontSize: 16
  },
})
