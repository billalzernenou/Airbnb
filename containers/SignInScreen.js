import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import Constants from "expo-constants";
import axios from "axios";
// colors
import colors from "../assets/colors";
const { brink_pink, grey } = colors;

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  // controlled Fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //states to handle errors
  // 0 everything is okay , 1 server 400 status response 2 , one of the fields is empty
  const [error, setError] = useState();

  return (
    <KeyboardAwareScrollView>
      <View style={styles.login_page}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-airbnb.png")}
          resizeMode="contain"
        ></Image>
        <Text style={styles.logo_text}>Log in </Text>
        <View style={styles.login_form}>
          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
              setError(0);
            }}
            value={username}
            required={true}
            style={styles.input}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError(0);
            }}
            style={styles.input}
          />

          {/* error display */}
          {error !== 0 && (
            <View View style={styles.error}>
              {error === 1 && (
                <Text style={styles.error_text}>
                  Incorrect login information. Please check your credentials and
                  try again.
                </Text>
              )}
              {error === 2 && <Text>Please fill all required fields</Text>}
            </View>
          )}

          {/* submit request button */}
          <View style={styles.submit}>
            <TouchableOpacity
              title="Signin"
              style={styles.button}
              onPress={async () => {
                try {
                  if (username.length === 0 || password.length === 0) {
                    setError(2);
                  } else {
                    setError(0);
                    // query to check the existence of the User

                    const response = await axios.post(
                      "http://express-airbnb-api.herokuapp.com/user/log_in",

                      { email: username, password: password }
                    );
                    console.log(response.data);
                    if (response.data) {
                      //case response.data existe set AsyncStorage/Token
                      setToken(response.data.token);
                      alert("connection was successful");
                      // const userToken = "secret-token";
                      // setToken(userToken);
                    } else {
                      setError(1);
                    }
                  }
                } catch (error) {
                  console.log(error.message);
                  setError(1);
                }
              }}
            >
              <Text style={styles.login_button_text}>Sign in</Text>
            </TouchableOpacity>
            <View style={styles.navigation}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              >
                <Text style={styles.navigation_text}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  // **************************
  // **********SIGNIN*************
  // **************************

  login_page: {
    alignItems: "center",
    flex: 1,
    // marginTop: Constants.statusBarHeight,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  login_form: {
    width: "80%",
    // marginHorizontal: auto,
  },
  // **************************
  // **********Logo*************
  // **************************
  logo: {
    height: 120,
  },

  logo_text: {
    color: grey,
    fontSize: 24,
  },
  input: {
    borderColor: brink_pink,
    borderBottomWidth: 2,
    marginTop: 40,
    paddingBottom: 10,
  },

  // **************************
  // **********SUBMIT*************
  // **************************
  submit: {
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    borderWidth: 1,
    borderColor: brink_pink,
    width: "60%",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    fontSize: 50,
  },
  login_button_text: {
    fontSize: 20,
    color: grey,
  },
  // **************************
  // **********Error*************
  // **************************
  error: {
    backgroundColor: brink_pink,
    padding: 5,
  },
  error_text: {
    color: "#fff",
  },
  // **************************
  // **********Navigation*************
  // **************************
  navigation: {
    alignItems: "center",
    marginTop: 20,
  },
  navigation_text: {
    color: grey,
    fontSize: 16,
  },
});
