import MapView ,{Marker} from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import React,{ useState, useEffect } from 'react';


const MapContainer = () => {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [watchId, setWatchId] = useState(null);

useEffect(() => {
  (async () => {
    try {
      const { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setError('Permission to access location was denied');
        return;
      }

      const newWatchId = await Location.watchPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 2000,
        distanceInterval: 10
      }, (location) => {
        setLocation(location);
      });
      setWatchId(newWatchId);
    } catch (error) {
      setError(error);
    }
  })();

 
}, []);
    
  let initialRegion = {
    latitude: 0,
    longitude:0,
    latitudeDelta: 0,
    longitudeDelta:0,
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
      >
        <Marker coordinate={initialRegion} title ='coordinates' />
      </MapView>
    </View>
  );
};
const styles = StyleSheet.create({
    
  container: {
    flex: 1,
    width: "100%",
    height: "80%",
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
    },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapContainer;