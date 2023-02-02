import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native'
import axios from 'axios';
import { auth } from '../../../firebase';

const Chat = () => {
  const [userId, setUserId] = useState("");
  const [friends, setFriends] = useState([]);

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
  }, [userId]);
  
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 24, alignSelf: 'center'}}>Chat</Text>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.friendName}>{item.name}</Text>
        )}
      />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  friendName: {
    fontSize: 20,
    margin: 10
  }
})