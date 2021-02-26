import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";
import {
  Button,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";
//containers
import offerScreen from "./RoomScreen";
//components
import Logo from "../components/Logo";
import OnLoading from "../components/OnLoading";
import colors from "../assets/colors";
const { brink_pink, grey, light_grey } = colors;

import OfferItem from "../components/OfferItem";

export default function HomeScreen({ navigation }) {
  const [offers, setOffers] = useState([]);
  const [onLoading, setOnLoading] = useState(true);
  // const navigation = useNavigation();

  // Fetch Data

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          "https://express-airbnb-api.herokuapp.com/rooms"
        );
        if (response.data) {
          setOffers(response.data);
          setOnLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchOffers();
  }, []);

  //rating
  const Rating = (rate) => {
    let ratingComponent = [];
    for (i = 0; i < rate; i++) {
      ratingComponent.push(<Entypo name="star" size={24} color="#FFB308" />);
    }
    for (i = rate; i < 5; i++) {
      ratingComponent.push(<Entypo name="star" size={24} color="grey" />);
    }
    return ratingComponent;
  };

  // render Item
  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Room", { id: item._id });
        }}
        style={styles.offer}
      >
        <Image
          source={{ uri: `${item.photos[0].url}` }}
          style={styles.offer_item_image}
        />
        <Text style={styles.price}>{item.price} €</Text>
        <View style={styles.offer_details}>
          <View style={styles.profil}>
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.offer_title}
            >
              {item.title}
            </Text>
            {/* Rating  */}
            <View style={styles.rating}>
              {Rating(item.ratingValue).map((element, index) => {
                return <View key={index}>{element}</View>;
              })}
            </View>
          </View>
          <Image
            style={styles.profile_pic}
            source={{ uri: item.user.account.photo.url }}
            resizeMode="cover"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Logo size={100} />
      {onLoading ? (
        <OnLoading color={brink_pink} />
      ) : (
        <View style={styles.offers}>
          <FlatList
            data={offers}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
        </View>
      )}

      {/* <TouchableOpacity
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      ></TouchableOpacity> */}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },
  // ***************OFFERS************
  offers: {
    alignItems: "center",
    marginTop: 10,
  },
  offer: {
    borderBottomWidth: 1,
    borderColor: light_grey,
    marginTop: 15,
  },
  price: {
    position: "absolute",
    top: 150,
    backgroundColor: "black",
    color: "#fff",
    paddingVertical: 15,
    paddingHorizontal: 40,
    fontSize: 18,
  },
  offer_item_image: {
    width: "100%",
    height: 220,
  },
  offer_details: {
    alignItems: "flex-start",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  offer_title: {
    fontSize: 15,
    width: "90%",
  },
  profile_pic: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  rating: {
    flexDirection: "row",
    marginTop: 10,
  },
});
