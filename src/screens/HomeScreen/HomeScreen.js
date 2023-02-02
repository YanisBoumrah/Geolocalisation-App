import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  Image,
  View,
} from "react-native";
import { auth } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import LogOut from "../../components/LogOutButton/LogOut";
import axios from "axios";

const HomeScreen = () => {
  const navigation = useNavigation();

  const [userId, setUserId] = useState("");
  const [User, setUser] = useState({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.replace("SignIn");
      }else{
        setUserId(user?.uid);
        console.log("userid: ", userId);
      }
    });
  }, []);

  useEffect(() =>{
    getUserData();
    console.log("user",User);
  
  },[]);

  const getUserData = async () =>{
    try{
      const response = await axios.get(`https://geoapi.azurewebsites.net/user/${userId}`);
      setUser(response.data)
    }catch(error){
      console.log(error);
    }

  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.subText}>{User?.firstname}</Text>
      <Image
                            source={require('../../../assets/images/logo.png')}
                            resizeMode="contain"
                            style={{
                                width: 500,
                                height: 500,
                                padding: 0,
                                margin: 0,
                            }}
                        />
      <Text style={styles.text}>GEOTRACK</Text>

    </View>

  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#000",
  },
  text: {
    fontSize: 35,
    alignSelf: "center",
    color: "#fff",
  },
  subText: {
    fontSize: 16,
    alignSelf: "center",
    color: "#fff",
  },
});
