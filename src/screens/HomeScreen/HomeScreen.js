import React from 'react';
import { ScrollView, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import LogOut from '../../components/LogOutButton/LogOut';

const HomeScreen = () => {

  const navigation = useNavigation();

  useEffect(() =>{
    auth.onAuthStateChanged(user => {
      if(!user){
          navigation.replace("SignIn");
      }
  })
  },[])


  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center',color:'#fff'}}>Home, sweet home</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#000'
  },
})
