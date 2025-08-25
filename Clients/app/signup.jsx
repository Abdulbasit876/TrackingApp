import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; // <-- for navigation

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation()

  return (
    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        type: "timing",
        duration: 200,
      }}
      style={{ flex: 1 }}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SafeAreaView className="flex-1 bg-neutral-50">
            <StatusBar
              barStyle="dark-content"
              translucent
              backgroundColor="transparent"
            />
            <View className="flex-1 px-6 pt-6">
              {/* Title */}
              <Text className="text-5xl h-14 font-popinMedium tracking-tight text-black mt-10">
                Sign Up
              </Text>

              {/* Fields */}
              <View className="mt-8 space-y-4 mb-6">
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Name"
                  placeholderTextColor="#6b7280"
                  className="h-[56px] rounded-2xl bg-white border border-neutral-200 font-popinMedium px-4 text-[17px] pt-6 leading-[22px] mb-5"
                />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#6b7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="h-[56px] rounded-2xl bg-white border pt-6 border-neutral-200 font-popinMedium px-4 text-[17px] leading-[22px] mb-5"
                />
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry
                  className="h-[56px] rounded-2xl bg-white border pt-6 border-neutral-200 font-popinMedium px-4 text-[17px] leading-[22px]"
                />
              </View>

              {/* Primary button */}
              <Pressable onPress={() => { }} className="mt-6">
                {({ pressed }) => (
                  <View
                    className={`h-[56px] rounded-2xl items-center justify-center ${pressed ? "bg-neutral-900" : "bg-black"
                      }`}
                  >
                    <Text className="text-white text-[18px] font-popinMedium">
                      Sign up
                    </Text>
                  </View>
                )}
              </Pressable>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="h-[1px] bg-neutral-200 flex-1" />
                <Text className="mx-4 text-neutral-500 text-[16px]">or</Text>
                <View className="h-[1px] bg-neutral-200 flex-1" />
              </View>

              <View className="mt-10 flex-row justify-center">
                <Text className="text-[16px] text-neutral-600 font-popinMedium">
                  Have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text className="ml-1 text-[16px] text-blue-700 font-popinMedium">
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </MotiView>
  );
}
