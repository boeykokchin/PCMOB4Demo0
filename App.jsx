import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const BUSSTOP_NUMBER = "17159";
const BUS_NUMBER = "166";
const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=" + BUSSTOP_NUMBER;
const LOADING_INTERVAL = 60000;

export default function App() {
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [arrival, setArrival] = useState("");

  function loadBusStopData() {
    setLoading(true);

    fetch(BUSSTOP_URL)
      .then((res) => res.json())
      .then((resData) => {
        // console.log(resData);
        const myBus = resData.services;
        // console.log(myBus);
        const myBus166 = myBus.filter((item) => item.no === BUS_NUMBER)[0];
        // console.log(myBus166);

        const duration_s = Math.floor(myBus166.next["duration_ms"] / 1000);
        const minutes = Math.floor(duration_s / 60);
        const seconds = duration_s % 60;
        if (duration_s < 0) {
          setArrival("Bus has arrived");
        } else {
          setArrival(`${minutes} minutes and ${seconds} seconds`);
        }
        setLoading(false);
      })
      .catch(function (error) {
        console.log("There is a problem with filtering" + error.message);
        throw error;
      });
  }

  useEffect(() => {
    loadBusStopData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus 166 arrival time</Text>
      <Text style={styles.arrivalTime}>
        {loading ? <ActivityIndicator size="large" /> : arrival}
      </Text>
      <TouchableOpacity onPress={null} style={styles.button}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  arrivalTime: {
    fontSize: 26,
    marginBottom: 24,
    justifyContent: "center",
  },
  button: {
    backgroundColor: "green",
    padding: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
