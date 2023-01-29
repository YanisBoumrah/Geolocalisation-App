import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import { auth } from '../../../firebase';
import { Users } from '../../../firebase';
import axios from 'axios';
import * as Location from 'expo-location';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [location, setLocation] = useState({});
  

  const navigation = useNavigation();

  useEffect(() =>{
      auth.onAuthStateChanged(user =>{
        if(user){
          navigation.replace("Home");
        }
      });
       getLocation();
       
  },[])

  //console.log("location is ", location);

  const onRegisterPressed = async () => {
    let check1 = verifyFields();
    let check2 = checkPassword();
    if(check1 == true && check2 == true){
      auth
      .createUserWithEmailAndPassword(email,password)
      .then(userCredentials => {
        const user = userCredentials.user;
        const bodyUser = {
          id: user.uid,
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email,
          freinds: []
        };
        const bodyLocation = {
          id: user.uid,
          lat: location?.coords.latitude,
          long: location?.coords.longitude
        };
        pushData(bodyUser);
        pushLocation(bodyLocation);
        console.log("body location", bodyLocation)
      })
    }else{
      Alert.alert("Error SignUp", "verify your fields");
    } 
  };

  

  const pushData = async (body) => {
    const response = await axios.post("https://geoapi.azurewebsites.net/user", body);
    console.log(response);        
  }

  const pushLocation = async (body) => {
    const response = await axios.post("https://geoapi.azurewebsites.net/location", body);
    console.log(response);
  }

  const verifyFields = () =>{
    if(firstName.length < 5 || lastName.length < 5 || username < 5){
      return false;
    }else{
      return true;
    }
  }

  const checkPassword = () =>{
    if(password != passwordRepeat){
      return false;
    }else{
      return true;
    }
  }

  const onSignInPress = () => {
    navigation.navigate('SignIn');

  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  const getLocation = async () =>{
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(location);
    } catch (error) {
      console.log(error);
  }
}

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          placeholder="Firstname"
          value={firstName}
          setValue={setFirstName}
        />
        <CustomInput
          placeholder="Lastname"
          value={lastName}
          setValue={setLastName}
        />

        <CustomInput
          placeholder="Username"
          value={username}
          setValue={setUsername}
        />

        <CustomInput 
          placeholder="Email" 
          value={email} 
          setValue={setEmail} 
        />

        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomInput
          placeholder="Repeat Password"
          value={passwordRepeat}
          setValue={setPasswordRepeat}
          secureTextEntry
        />

        <CustomButton 
          text="Register" 
          onPress={onRegisterPressed} 
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>{' '}
          and{' '}
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <SocialSignInButtons />

        <CustomButton
          text="Have an account? Sign in"
          onPress={onSignInPress}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
    paddingTop:50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default SignUpScreen;
