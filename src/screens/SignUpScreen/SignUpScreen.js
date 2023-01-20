import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Alert} from 'react-native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/core';
import { auth } from '../../../firebase';
import { Users } from '../../../firebase';
import axios from 'axios';

const SignUpScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  

  const navigation = useNavigation();

  useEffect(() =>{
      auth.onAuthStateChanged(user =>{
        if(user){
          navigation.replace("Home");
        }
      })
  },[])

  const onRegisterPressed = () => {
    let check1 = verifyFields();
    let check2 = checkPassword();
    if(check1 == true && check2 == true){
      auth
      .createUserWithEmailAndPassword(email,password)
      .then(userCredentials => {
        const user = userCredentials.user;
        const body = {
          id: user.id,
          firstName: firstName,
          lastName: lastName,
          username: username,
          email: email
        }
        pushData(body);
      })
    }else{
      Alert.alert("Error SignUp", "verify your fields");
    }
    
  };

  const pushData = (body) => {
    axios.post("https://geoapi.azurewebsites.net/user", body)
         .then(res =>{
          console.log("posted !");
         });
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          placeholder="Firstname"
          value={firstName}
          setValue={setFirstName}
        />
        <CustomInput placeholder="Email" value={email} setValue={setEmail} />
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
