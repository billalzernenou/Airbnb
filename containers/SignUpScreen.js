import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
// colors
import colors from "../assets/colors";
const { brink_pink, grey } = colors;

export default function SignUpScreen({ setToken }) {
  //Navigation
  const navigation = useNavigation();
  //controlled form
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // handle error
  const [error, setError] = useState(0);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.signin_page}>
        <Image
          style={styles.logo}
          source={require("../assets/logo-airbnb.png")}
          resizeMode="contain"
        ></Image>
        <Text style={styles.logo_text}>Sign Up</Text>
        <View style={styles.signin_form}>
          {/* **********************************
           **************Form*****************
           *********************************** */}
          <TextInput
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
              setError(0);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Username"
            onChangeText={(text) => {
              setUsername(text);
              setError(0);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Describe your self in a few words"
            onChangeText={(text) => {
              setDescription(text);
              setError(0);
            }}
            multiline={true}
            numberOfLines={4}
            style={[styles.input, styles.description]}
          />

          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setPassword(text);
              setError(0);
            }}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm password"
            secureTextEntry={true}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError(0);
            }}
            style={styles.input}
          />
          {error !== 0 && (
            <View style={styles.error}>
              {error === 2 ? (
                <Text style={styles.error_text}>
                  Please fill all required fields
                </Text>
              ) : error === 1 ? (
                <Text style={styles.error_text}>
                  Something Went Wrong. Please Try Again
                </Text>
              ) : error === 3 ? (
                <Text style={styles.error_text}>
                  This email already has an account.
                </Text>
              ) : (
                error === 4 && (
                  <Text style={styles.error_text}>Pesswords don't match</Text>
                )
              )}
            </View>
          )}
          <View style={styles.submit}>
            <TouchableOpacity
              style={styles.button}
              title="Sign up"
              onPress={async () => {
                // const userToken = "secret-token";
                // setToken(userToken);
                try {
                  if (
                    !email ||
                    !username ||
                    !password ||
                    !description ||
                    !confirmPassword
                  ) {
                    setError(2);
                  } else if (password === confirmPassword) {
                    const response = await axios.post(
                      "https://express-airbnb-api.herokuapp.com/user/sign_up",
                      {
                        email: email,
                        username: username,
                        description: description,
                        password: password,
                      }
                    );
                    console.log(response.data);
                    if (response.data.token) {
                      alert("signin was successful");
                      setToken(response.data.token);
                    } else {
                      setError(1);
                    }
                  } else {
                    setError(4);
                  }
                } catch (error) {
                  console.log(error.response);
                  if (error.response.data) {
                    setError(3);
                  } else {
                    setError(1);
                  }
                }
              }}
            >
              <Text style={styles.signin_button_text}>SignUp</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.navigation}
            onPress={() => {
              navigation.navigate("SignIn");
            }}
          >
            <Text style={styles.navigation_text}>
              Already have an account ? Sign in
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  // **************************
  // **********SIGNIN*************
  // **************************

  signin_page: {
    alignItems: "center",
  },
  signin_form: {
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
    marginTop: 30,
    paddingBottom: 10,
  },
  description: {
    borderWidth: 2,
    paddingLeft: 10,
    textAlignVertical: "top",
    paddingTop: 10,
  },

  submit: {
    alignItems: "center",
    marginTop: 20,
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
  signin_button_text: {
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
