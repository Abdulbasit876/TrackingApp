import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
   useEffect(() => {
    const checkUser = async () => {
      const storedUser = await AsyncStorage.getItem("user");
      if (storedUser) {
        router.replace("/task");
        console.log("User exists:", storedUser);
      } else {
        console.log("No user found in AsyncStorage");
      }
    };
    checkUser();
   }, [router]);
  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please enter email and password");
    }
    try {
      setLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (user) {
        await AsyncStorage.setItem("user", JSON.stringify(user));
        Alert.alert("Success", "Logged in successfully!");
        router.replace("/task");
      } else {
        Alert.alert("Error", "User not found");
      }
    } catch (err) {
      let errorMessage = "Login failed";
      switch (err.code) {
        case "auth/user-not-found":
          errorMessage = "User not found. Please sign up first.";
          break;
        case "auth/wrong-password":
          errorMessage = "Incorrect password.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        default:
          errorMessage = err.message;
      }
      Alert.alert("Error", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={0}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
        <MotiView
          from={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "timing", duration: 600 }}
          style={{ flex: 1 }}
          className="mt-7"
        >
          <View className="flex-1 bg-[#f3f2ef] px-6 mt-8">
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />

            {/* Title */}
            <Text className="text-[35px] h-14 font-bold font-popinMedium tracking-tight text-black mt-16 mb-10">
              Login or Sign-up
            </Text>

            {/* Inputs */}
            <View className="rounded-xl border-gray-200 mb-6">
              <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                className="p-4 bg-white text-[18px] font-popinMedium border border-gray-200 rounded-lg mb-4"
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="p-4 bg-white text-[18px] mb-6 font-popinMedium border border-gray-200 rounded-lg"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className={`p-4 rounded-xl mb-6 ${loading ? "bg-gray-400" : "bg-black"}`}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-[18px] text-center font-popinMedium">Log in</Text>
              )}
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-2 text-[18px] text-gray-500 font-popinMedium">or</Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Google Button */}
            <TouchableOpacity
              className="flex-row items-center justify-center bg-white p-4 rounded-xl border border-gray-300 mb-6"
              onPress={() => Alert.alert("Info", "Google login not implemented")}
            >
              <Image
                source={require("../assets/images/googlelogo.png")}
                style={{ width: 24, height: 24, marginLeft: 10 }}
              />
              <Text className="ml-2 text-[18px] font-popinMedium mt-1">Continue with Google</Text>
            </TouchableOpacity>

            {/* Signup Text */}
            <Text className="text-center text-[16px] text-gray-600 font-popinMedium mb-10">
              Don’t have an account?{" "}
              <Text
                className="text-blue-600 text-[16px] font-popinMedium"
                onPress={() => router.push("/signup")}
              >
                Signup
              </Text>
            </Text>
          </View>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
