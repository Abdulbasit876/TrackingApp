import React from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#f3f2ef] px-6 mt-6">
      {/* Title */}
      <Text className="text-4xl  h-20 font-popinSemiBold  mb-9 mt-16">
        Login or sign up
      </Text>
      <View className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <TextInput
          placeholder="Email"
          className="p-4 border-b border-gray-200 font-popinRegular"
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          className="p-4 font-popinRegular"
        />
      </View>
      <TouchableOpacity className="bg-black p-4 rounded-xl mb-6">
        <Text className="text-white text-center font-popinSemiBold text-xl">
          Log in
        </Text>
      </TouchableOpacity>
      <View className="flex-row items-center mb-6">
        <View className="flex-1 h-[1px] bg-gray-300" />
        <Text className="mx-2 text-gray-500 font-popinRegular">or</Text>
        <View className="flex-1 h-[1px] bg-gray-300" />
      </View>

      <TouchableOpacity className="flex-row items-center justify-center bg-white p-4 rounded-xl border border-gray-300 mb-6">
        <Image
          source={require('../assets/images/googlelogo.png')} // apna path check karo
          style={{ width: 20, height: 20, resizeMode: "contain" }}
        />
        <Text className="ml-2 text-base font-popinRegular">
          Continue with Google
        </Text>
      </TouchableOpacity>

      {/* Signup Link */}
      <Text className="text-center text-gray-600 font-popinRegular">
        Don’t have an account?{" "}
        <Text
          className="text-blue-600 font-popinSemiBold"
          onPress={() => router.push("/signup")}
        >
          Signup
        </Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
