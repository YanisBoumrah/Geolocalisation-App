import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Navigation from './src/navigation';
// import Geolocation from '@react-native-community/geolocation';


const App = () => {
  // Geolocation.getCurrentPosition(info => console.log(info));
  return (
    <SafeAreaView style={styles.root}>
      <Navigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#F9FBFC',
  },
});

export default App;

