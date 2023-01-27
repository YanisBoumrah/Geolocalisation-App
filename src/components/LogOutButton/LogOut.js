import React from 'react';
import {  StyleSheet, Image, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase';

const LogOut = () => {
  const handleLogOut = () => {
    auth.signOut()
    .then(() =>{
        console.log("logged out")
    })
    .catch(err => alert(err.message));
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={handleLogOut}
      >
      <Image
          source={require('../../../assets/icons/logout.png')}
          style={{width: 20, height: 20,tintColor: 'white'}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LogOut;

const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        right: 15,
        top: 15,
        alignItems: 'center',
        justifyContent: 'center',
      },
})
