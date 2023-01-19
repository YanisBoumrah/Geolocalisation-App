import * as Location from 'expo-location';
import { useState, useEffect } from 'react';

export default function useLocalisation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  let watchId = null;

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
          setError('Permission to access location was denied');
          return;
        }

        watchId = await Location.watchPositionAsync({
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 10
        }, (location) => {
          setLocation(location);
        });
      } catch (error) {
        setError(error);
      }
    })();

    // Clean up the watch position
    return () => {
      if (watchId) {
        Location.clearWatch(watchId);
      }
    }
  }, []);
  return {location, error};
}
