import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Constants from "expo-constants";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
// colors
import colors from "../assets/colors";
const { brink_pink, grey, light_grey } = colors;

//components
import OnLoading from "../components/OnLoading";
import Logo from "../components/Logo";

export default function ArroundMe() {
  //location states

  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  //get offers that contain gps coordinates
  const [offers, setoffers] = useState();

  useEffect(() => {
    const askPermissionAndGetLocation = async () => {
      try {
        //ask user for permission to access gps coordinates
        const { status } = await Location.requestPermissionsAsync();

        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        // get user location
        const loc = await Location.getCurrentPositionAsync({});
        console.log(loc);
        setUserLocation(loc);

        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms/around",
          {
            latitude: userLocation && userLocation.coords.latitude,
            longitude: userLocation && userLocation.coords.longitude,
          }
        );

        if (response.data) {
          //   console.log(response.data[0].location[0]);

          setoffers(response.data);
        } else {
          setErrorMsg("Something went wrong");
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    askPermissionAndGetLocation();
  }, []);

  return isLoading ? (
    <OnLoading />
  ) : (
    <View style={styles.container}>
      <Logo size={80} />
      <MapView
        style={styles.map}
        showsUserLocation={true}
        initialRegion={{
          latitude: userLocation.coords.latitude,
          longitude: userLocation.coords.longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      >
        {offers.map((item, index) => {
          {
          }
          return (
            <MapView.Marker
              coordinate={{
                latitude: item.location[1],

                longitude: item.location[0],
              }}
              key={index}
            />
          );
        })}
        <MapView.Circle
          center={{
            latitude: userLocation && userLocation.coords.latitude,
            longitude: userLocation && userLocation.coords.longitude,
          }}
          radius={10000}
          strokeColor={brink_pink}
          fillColor="rgba(239, 104, 112, 0.3)"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    // width: Dimensions.width,
    // height: Dimensions.height,
    width: "100%",
    height: "90%",
  },
});
