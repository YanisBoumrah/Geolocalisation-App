import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import Logo from '../../../assets/images/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import {useNavigation} from '@react-navigation/native';
import {auth} from '../../../firebase';
// import * as Facebook from 'expo-facebook';
import * as Location from 'expo-location';
import axios from 'axios';

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({});
  const [userId, setUserId] = useState("");


  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          setUserId(user.uid);
          navigation.replace("Home");
      }
  })
  getLocation();
  console.log(location);

  },[])

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
  const handleLogin = () =>{
    auth.signInWithEmailAndPassword(email, password)
        .then(userCredntials =>{
            const user = userCredntials.user;
            console.log(`Logged in with ${user.email}`);
        })
        .catch(err => alert(err.message));
  }

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.3}]}
          resizeMode="contain"
        />
        <Text style={styles.title}>GEOTRACK</Text>
        <CustomInput
          placeholder="email"
          value={email}
          setValue={setEmail}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setValue={setPassword}
          secureTextEntry
        />

        <CustomButton text="Login" onPress={handleLogin} />

        <CustomButton
          text="Forgot password?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />

        <CustomButton
        text="Sign In with Facebook"
        // onPress={handleFacebookLogin}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
        image = {require('../../../assets/images/facebook.png')}
      />
      <CustomButton
        text="Sign In with Google"
        // onPress={onSignInGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
        image = {require('../../../assets/images/google.png')}
      />
      <CustomButton
        text="Sign In with Apple"
        // onPress={onSignInApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        image = {require('../../../assets/images/apple.png')}

      />

        <CustomButton
          text="Don't have an account? Create one"
          onPress={onSignUpPress}
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
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
  },
  title: {
    fontWeight: 'bold',
    fontSize:30,
  }
});

export default SignInScreen;
