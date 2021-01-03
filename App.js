import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  ActionSheetIOS,
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const BUSSTOP_URL = 'https://arrivelah2.busrouter.sg/?id=17159';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [arrival, setArrival] = useState('');

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((res) => res.json)
      .then((json) => {
        console.log(json);
        const myBus = json.services;
        console.log(myBus);

        // const no166 = myBus.filter((myBusItems) => myBusItem.no === '105');
        // console.log(myBus);
        // setArrival(no166.next.time);
        // setLoading(false);
      })
      .catch(function (error) {
        console.log('There is a problem with filtering' + error.message);
        throw error;
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size='large' /> : arrival}
      </Text>
      <TouchableOpacity onPress={null} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <StatusBar style='auto' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 36,
    marginBottom: 24,
  },
  button: {
    backgroundColor: 'green',
    padding: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
