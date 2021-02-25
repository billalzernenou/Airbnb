import React from "react";
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
import colors from "../assets/colors";
const { brink_pink, grey, light_grey } = colors;
import { Entypo } from "@expo/vector-icons";

export default function OfferItem({ item }) {
  //rating
  console.log("&");
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

  return (
    <View style={styles.offer}>
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
    </View>
  );
}

const styles = StyleSheet.create({
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
