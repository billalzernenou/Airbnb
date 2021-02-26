import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import axios from "axios";
import { Entypo, AntDesign } from "@expo/vector-icons";

// components
import OnLoading from "../components/OnLoading";
import Logo from "../components/Logo";
//Navigation
import { useNavigation } from "@react-navigation/core";

// /colors
import colors from "../assets/colors";
const { brink_pink, grey, light_grey } = colors;

export default function RoomScreen({ route }) {
  const [room, setRoom] = useState();
  const [onLoading, setOnLoading] = useState(true);

  //navigation
  const navigation = useNavigation();

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
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(
          `https://express-airbnb-api.herokuapp.com/rooms/${route.params.id}`
        );

        if (response.data) {
          setRoom(response.data);
          setOnLoading(false);
        }
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchRoom();
  }, []);

  return onLoading ? (
    <OnLoading />
  ) : (
    <View style={styles.offer}>
      <View>
        {/* <AntDesign
          syle={styles.goBack}
          onPress={() => {
            navigation.goBack();
          }}
          name="arrowleft"
          size={28}
          color="black"
        /> */}
        <Logo size={80} />
      </View>

      <Image
        source={{ uri: `${room.photos[0].url}` }}
        style={styles.offer_item_image}
      />
      <Text style={styles.price}>{room.price} €</Text>
      <View style={styles.offer_details}>
        <View style={styles.profil}>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.offer_title}
          >
            {room.title}
          </Text>
          {/* Rating  */}
          <View style={styles.rating}>
            {Rating(room.ratingValue).map((element, index) => {
              return <View key={index}>{element}</View>;
            })}
          </View>
        </View>
        <Image
          style={styles.profile_pic}
          source={{ uri: room.user.account.photo.url }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  goBack: {
    // justifyContent: "space-around",
    position: "absolute",
    top: 500,
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
