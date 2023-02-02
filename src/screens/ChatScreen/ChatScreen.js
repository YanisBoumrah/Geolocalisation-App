import React, { useState, useEffect } from 'react';
import { StyleSheet, Text,Image, View, FlatList, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { auth } from '../../../firebase';
import {useNavigation} from '@react-navigation/core';
import icon from '../../../assets/images/userImage.png';


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
      <View key={item.id} style={styles.itemContainer}>
        <View style={styles.itemLogo}>
            <Image
              style={styles.itemImage}
              source={icon}
            />
        </View>
        <View style={styles.itemBody}>
          <View style={styles.itemBodyUp}>
            <Text style={[styles.itemName, styles.itemNameEx]}>{item.username}</Text>
          </View>
          <View style={styles.itemBodyDown}>
            <Text style={styles.itemName}>{item.firstName}</Text>
            <Text style={styles.itemName}>{item.lastName}</Text>
          </View>
        </View>
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
  },
  frienContainer:{
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginLeft: 10,
    marginEnd: 10,
    borderBottomColor: '#D7DBDD'
  },
  image:{
    widtth:50,
    height:50,
    resizeMode: 'contain',
  },

  itemBody:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#D0D3D4',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius:15
  },
  itemBodyUp:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
  },
  itemBodyDown:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: "100%",
  },
  itemName:{
    fontWeight: 'blod',
    fontSize: 15,
    marginRight: 6

  },
  itemNameEx:{
    fontWeight: 'bold',
    fontSize: 20
  },
  itemContainer:{
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    marginLeft: 10,
    marginEnd: 10,
    borderBottomColor: '#D7DBDD'
  },
  itemLogo:{
    padding: 10
  },
  itemImage:{
      width: 50,
      height: 50
  },
  itemBody:{
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#D0D3D4',
    borderTopLeftRadius: 15,
    borderBottomLeftRadius:15
  },
  itemBodyUp:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: "100%",
  },
  itemBodyDown:{
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    width: "100%",
  },
  itemName:{
    fontWeight: 'blod',
    fontSize: 15,
    marginRight: 6

  },
  itemNameEx:{
    fontWeight: 'bold',
    fontSize: 20
  },
  itemStatus:{
      backgroundColor: 'green',
      paddingHorizontal: 6,
      justifyContent: 'center',
      right: 12
  },
  bodyContainer:{
    flex:1,
    marginBottom :20
  },
})