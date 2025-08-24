import React from "react";
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
} from "react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 600,
      }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 bg-[#f3f2ef] px-6 mt-8">
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
            <Text className="text-5xl h-14 font-popinMedium tracking-tight text-black mt-16 mb-10">
              Login or sign up
            </Text>

            <View className="rounded-xl border-gray-200 mb-6">
              <TextInput
                placeholder="Email"
                className="p-4 bg-white text-[18px] font-popinMedium border border-gray-200 rounded-lg mb-4 "
              />
              <TextInput
                placeholder="Password"
                secureTextEntry
                className="p-4 bg-white text-[18px] mb-6 font-popinMedium border border-gray-200 rounded-lg"
              />
            </View>

            {/* Login Button */}
            <TouchableOpacity
              className="bg-black p-4 rounded-xl mb-6"
              onPress={() => router.push("/dashboard")} // 👈 navigation added here
            >
              <Text className="text-white text-[18px] text-center font-popinMedium">
                Log in
              </Text>
            </TouchableOpacity>

            {/* OR Divider */}
            <View className="flex-row items-center mb-6">
              <View className="flex-1 h-[1px] bg-gray-300" />
              <Text className="mx-2 text-[18px] text-gray-500 font-popinMedium">
                or
              </Text>
              <View className="flex-1 h-[1px] bg-gray-300" />
            </View>

            {/* Google Button */}
            <TouchableOpacity className="flex-row items-center justify-center bg-white p-4 rounded-xl border border-gray-300 mb-6">
              <Image
                source={require("../assets/images/googlelogo.png")}
                style={{ width: 24, height: 24, marginLeft: 10 }}
              />
              <Text className="ml-2 text-[18px] font-popinMedium mt-1">
                Continue with Google
              </Text>
            </TouchableOpacity>

            {/* Signup Link */}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </MotiView>
  );
};

export default Login;
