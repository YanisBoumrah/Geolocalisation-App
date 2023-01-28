import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";
import MapViewDirections from "react-native-maps-directions";
import * as Location from "expo-location";
import React, { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from "../../../env";

const MapComp = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destination, setDestination] = useState(null);
  const [friendsCoordinates, setFriendsCoordinates] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [routeVisible, setRouteVisible] = useState(false);

  const dest = [
    {
      latitude: 49,
      longitude: 2.3037095439072464,
    },
    {
      latitude: 48.98,
      longitude: 2.3037095439072464,
    },
    {
      latitude: 48.97,
      longitude: 2.3037095439072464,
    },
    {
      latitude: 48.93,
      longitude: 2.3037095439072464,
    },
    {
      latitude: 48.91,
      longitude: 2.3037095439072464,
    },
    {
      latitude: 48.92,
      longitude: 2.3037095439072464,
    },{
      latitude: 48.89,
      longitude: 2.6,
    },{
      latitude: 48.93,
      longitude: 2.4,
    },{
      latitude: 48.94,
      longitude: 2.5,
    },
  ];

  useEffect(() => {
    setFriendsCoordinates(dest);
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
            
          }
        );
        setWatchId(newWatchId);
      } catch (error) {
        setError(error);
      }
    })();
    console.log(friendsCoordinates);
  }, []);

  const handleMarkerPress = (coordinate) => {
    if (coordinate !== origin) {
      setDestination({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
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
        {friendsCoordinates?.map((coordinate, index) => (
          <Marker
            key={index}
            coordinate={coordinate}
            title="Fictive Location"
            onPress={() => handleMarkerPress(coordinate)}
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
