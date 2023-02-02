import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../../../env";
import { auth } from "../../../firebase";
import axios from "axios";

const MapComp = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);
  const [friends, setFriends] = useState([]);
  const [prevLocation, setPrevLocation] = useState(null);

  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });


  const [destination, setDestination] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false);
  

 
  const getFriends = async (userId) => {
    const response = await axios.get(
      `https://geoapi.azurewebsites.net/user/friends?id=${userId}`
    );
    setFriends(response.data);
    console.log(response.data)
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
      getFriends(userId);
    }
  }, [userId]);


  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
        const newWatchId = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: 2000,
            distanceInterval: 10,
          },
          (location) => {
            setLocation(location);
            setOrigin({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
  
            // Only make API call if the location has changed
            if (
              !prevLocation ||
              prevLocation.latitude !== location.coords.latitude ||
              prevLocation.longitude !== location.coords.longitude
            ) {
              axios
                .post(
                  `https://geoapi.azurewebsites.net/user/location?id=${userId}&lat=${location.coords.latitude}&long=${location.coords.longitude}`
                )
                .then(() => {
                  console.log("Location updated");
                });
  
              setPrevLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          }
        );
        setWatchId(newWatchId);
      } catch (error) {
        setError(error);
      }
    })();
    console.log("location", location);
  }, []);

  const handleMarkerPress = (coordinate) => {
    if (coordinate !== origin) {
      setDestination({
        latitude: coordinate.lat,
        longitude: coordinate.long,
      });
      setRouteVisible(!routeVisible);
    }
  };
  let initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0,
    longitudeDelta: 0,
  };
  if (location) {
    initialRegion = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
  }
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={initialRegion}
        provider={PROVIDER_GOOGLE}
      >
        {routeVisible && (
          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
        <Marker coordinate={origin} title="Current Location" />
        {friends?.map((friend) => (
          <Marker
            key={friend.id}
            coordinate={{
              latitude: friend.latitude?friend.latitude:0,
              longitude: friend.longitude?friend.longitude:0,
            }}
            onPress={() => handleMarkerPress({lat:friend.latitude,long:friend.longitude})}
            title={friend.username}
          />
        ))}
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "80%",
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapComp;
