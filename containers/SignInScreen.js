import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  // controlled Fields
  const [username, setUsername] = useState("");
  const [passWord, setPassWord] = useState("");
  //states to handle errors
  // 0 everything is okay , 1 server 400 status response 2 , one of the fields is empty
  const [error, setError] = useState();

  return (
    <View>
      <View>
        <Text>Name: </Text>
        <TextInput
          placeholder="Username"
          onChangeText={(text) => {
            setUsername(text);
            setError(0);
          }}
          value={username}
          required={true}
        />

        <Text>Password: </Text>
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={passWord}
          onChangeText={(text) => {
            setPassWord(text);
            setError(0);
          }}
        />

        {/* error display */}
        <View>
          {error === 1 && (
            <Text>
              Incorrect login information. Please check your credentials and try
              again.
            </Text>
          )}
          {error === 2 && <Text>Please fill all required fields</Text>}
        </View>

        {/* submit request button */}
        <Button
          title="Sign in"
          onPress={async () => {
            try {
              if (username.length === 0 || passWord.length === 0) {
                setError(2);
              } else {
                setError(0);
                // query to check the existence of the User

                const response = await axios.post(
                  "http://express-airbnb-api.herokuapp.com/user/log_in",

                  { email: username, password: passWord }
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
        />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
