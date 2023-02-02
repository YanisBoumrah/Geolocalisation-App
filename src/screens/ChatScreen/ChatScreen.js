import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { auth } from '../../../firebase';
import {useNavigation} from '@react-navigation/core';


const Chat = () => {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState([]);
  const navigation = useNavigation();

  const getFriends = async () => {
    try {
      const response = await axios.get(
        `https://geoapi.azurewebsites.net/user/friends?id=${userId}`
      );
      setFriends(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const onSendPressed = (itemId) => {
    navigation.navigate("ChatBetweenUsers", {id: itemId});
  };
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserId(user.uid);
      }
    });

  }, []);

  useEffect(() => {
    if (userId) {
      getFriends();
    }
    console.log("friends : ", friends)
  }, [userId]);


  const renderItem = ({item}) =>{
    return(
      <View style={styles.frienContainer} key={item.id} >
      <TouchableOpacity 
      // onPress={onSendPressed (item.id)}
      >
        <Text style={styles.friendName}>{item.username}</Text>
      </TouchableOpacity>
      </View>
    )
  }
  return (
    <View style={styles.container}>
       <FlatList
            data={friends?friends:""}
            keyExtractor={(e,i) => i.toString()}
            renderItem={renderItem}
          />   
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:"green"
  },
  frienContainer:{
    backgroundColor:"white",
    width:"100%",
    height:50,
    justifyContent:"center",
    alignItems:"center",
    margin:5,
    borderRadius:10
  },

  friendName: {
    fontSize: 20,
    margin: 10
  }
})