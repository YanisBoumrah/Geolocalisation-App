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

const ChatBetweenUsers = () => {
    

  return (
    <View style={styles.container}>

        <Text>Chatting with user </Text>

    </View>

  );
};

export default ChatBetweenUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red",
  },
  text: {
    fontSize: 35,
    alignSelf: "center",
    color: "#fff",
  },

});
