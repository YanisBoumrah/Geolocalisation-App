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

const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState({});


  const {height} = useWindowDimensions();
  const navigation = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
          navigation.replace("Home");
      }
  })
  getLocation();


  },[])

  // const handleFacebookLogin = async () => {

  //   try {
  //     await Facebook.initializeAsync({  
  //       appId: '1649158192208792',
  //     });
  //     const { type, token } = await Facebook.logInWithReadPermissionsAsync(
  //       { permissions: ['public_profile', 'email'] }
  //     );
  //     if (type === 'success') {
  //       // Get the user's name and email using Facebook's Graph API
  //       const response = await axios.get(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,email`);
  //       const user = response.data;
  //       console.log(`Logged in with ${user.name}`);
        
  //       // Create a credential with the token
  //       const credential = firebase.auth.FacebookAuthProvider.credential(token);
        
  //       // Sign in with the credential
  //       auth.signInWithCredential(credential)
  //           .then(userCredentials => {
  //             const user = userCredentials.user;
  //             console.log(`Logged in with ${user.email}`);

  //             const bodyUser = {
  //               id: user.uid,
  //               email: user.email,
  //               name: user.name,
  //               freinds: []
  //             }
  //             const bodyLocation = {
  //               id: user.uid,
  //               lat: location?.coords.latitude,
  //               long: location?.coords.longitude
  //             };
  //             pushData(bodyUser);
  //             pushLocation(bodyLocation);
  //           })
  //           .catch(err => alert(err.message));
  //     } else {
  //       console.log('Cancelled login');
  //     }
  //   } catch (err) {
  //     console.log('Error logging in', err);
  //   }
  // };

  const pushData = async (body) => {
    const response = await axios.post("https://geoapi.azurewebsites.net/user", body);
    console.log(response);        
  }

  const pushLocation = async (body) => {
    const response = await axios.post("https://geoapi.azurewebsites.net/location", body);
    console.log(response);
  }
  console.log("location is ", location);
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
