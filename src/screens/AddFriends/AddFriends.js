import React, { useEffect } from 'react';
import { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, FlatList, Image, SafeAreaView, TouchableOpacity, Touchable } from 'react-native';
import axios from 'axios';
import { auth } from '../../../firebase';
import icon from '../../../assets/images/add_freind.png';



const AddFriends = () => {

  const [field, setField] = useState('Freinds');
  const [data, setData] = useState([]);
  const [userId, setUserId] = useState("");
  const [freids, setFreinds] = useState([]);

  useEffect(() =>{
      auth.onAuthStateChanged(user =>{
        if(user){
          setUserId(user.uid);
        }
        getData();
      });


  },[userId]);

  const getData = async () => {
    try {
      const response = await axios.get(`https://geoapi.azurewebsites.net/user/filter?id=${userId}`);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const listTab = [
    {
      id: 1,
      field: "Freinds"
    },
    {
      id: 2,
      field: "Add Freinds"
    }
  ];

  const setFieldFilter = field =>{
   setField(field);
  };

  const renderItem = ({item, index}) =>{
    return(
      <View key={index} style={styles.itemContainer}>
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
    <SafeAreaView style={styles.container}>
      <View style={styles.listTab}>
       {
        listTab.map(e =>(
          <TouchableOpacity
            style={[styles.btnTab, field === e.field && styles.btnTabActive]}
            onPress={() => setFieldFilter(e.field)}
          >
            <Text
              style = {[styles.textTab, field === e.field && styles.textTabActive]}
            > {e.field}
            </Text>
          </TouchableOpacity>
        ))
       }
      </View>
      <FlatList
        data={data?data:""}
        keyExtractor={(e,i) => i.toString()}
        renderItem={renderItem}
      />
      {/* <View style={styles.bodyContainer}>
        {
          data == undefined
          ? <Text>No Data found</Text>
          :(
            data.map(e =>(
          <View style={styles.itemContainer}>
        <View style={styles.itemLogo}>
          <Image
            style={styles.itemImage}
            source={icon}
          />
        </View>
        <View style={styles.itemBody}>
          <View style={styles.itemBodyUp}>
            <Text style={[styles.itemName, styles.itemNameEx]}>{e.username}</Text>
          </View>
          <View style={styles.itemBodyDown}>
            <Text style={styles.itemName}>{e.firstName}</Text>
            <Text style={styles.itemName}>{e.lastName}</Text>
          </View>
        </View>
      </View>
        ))
          )  
        }
      </View> */}
    </SafeAreaView>
  );
};

export default AddFriends;

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  listTab:{
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: "center",
    width:"100%",

  },
  btnTab:{
    width: Dimensions.get('window').width / 2.0,
    flexDirection: 'row', 
    borderWidth: 0.8,
    borderColor: "#EBEBEB",
    padding: 10,
    alignContent: 'center',
    justifyContent: 'center'
  },
  textTab:{
    fontSize: 16
  },
  btnTabActive:{
    backgroundColor: "#17A589"
  },
  textTabActive:{
    color: "#fff"
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
  } 
})
