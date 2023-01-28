import React from "react";
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

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigation.replace("SignIn");
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome</Text>
      <Text style={styles.subText}>To</Text>
      <Image
                            source={require('../../../assets/images/logo.png')}
                            resizeMode="contain"
                            style={{
                                width: 200,
                                height: 200,
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
