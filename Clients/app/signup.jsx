import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "expo-router";
import { auth } from "../config/firebase";

export default function SignUpScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();
  
  const handleNameChange = (text) => {
    setName(text);
    if (text.length >= 4) {
      setNameError("");
    } else {
      setNameError("Name must be at least 4 characters");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (text.length >= 8) {
      setPasswordError("");
    } else {
      setPasswordError("Password must be at least 8 characters");
    }
  };

  const handleEmailLogin = async () => {
    let valid = true;

    if (name.length < 4) {
      setNameError("Name must be at least 4 characters");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters");
      valid = false;
    }

    if (!email || !password || !name) {
      Alert.alert("Missing fields", "Please enter username, email and password");
      valid = false;
    }

    if (!valid) return;

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      console.log("Registered with:", user.email, "Username:", name);
      Alert.alert("Success", "User registered successfully!");

      setEmail("");
      setPassword("");
      setName("");

    router.replace("/Login"); // redirect to login
    } catch (err) {
      let errorMessage = "Registration failed";
      switch (err.code) {
        case "auth/email-already-in-use":
          errorMessage = "This email is already registered. Please login.";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address.";
          break;
        case "auth/weak-password":
          errorMessage = "Password should be at least 6 characters.";
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
    <MotiView
      from={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "timing", duration: 200 }}
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
            <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
            <View className="flex-1 px-6 pt-6">
              <Text className="text-5xl h-14 font-popinMedium tracking-tight text-black mt-10">
                Sign Up
              </Text>

              <View className="mt-8 space-y-4 mb-6">
                {/* Name Input */}
                <TextInput
                  value={name}
                  onChangeText={handleNameChange}
                  placeholder="Name"
                  placeholderTextColor="#6b7280"
                  textAlignVertical="center"
                  className="h-[56px] rounded-2xl bg-white border border-neutral-200 font-popinMedium px-4 text-[17px] leading-[22px] mb-1"
                  style={{ paddingVertical: 0 }}
                />
                {nameError ? <Text className="text-red-500 text-sm mb-2">{nameError}</Text> : null}

                {/* Email Input */}
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Email"
                  placeholderTextColor="#6b7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  textAlignVertical="center"
                  className="h-[56px] rounded-2xl bg-white border border-neutral-200 font-popinMedium px-4 text-[17px] leading-[22px] mb-1"
                  style={{ paddingVertical: 0 }}
                />

                {/* Password Input */}
                <TextInput
                  value={password}
                  onChangeText={handlePasswordChange}
                  placeholder="Password"
                  placeholderTextColor="#6b7280"
                  secureTextEntry
                  textAlignVertical="center"
                  className="h-[56px] rounded-2xl bg-white border border-neutral-200 font-popinMedium px-4 text-[17px] leading-[22px] mb-1"
                  style={{ paddingVertical: 0 }}
                />
                {passwordError ? <Text className="text-red-500 text-sm">{passwordError}</Text> : null}
              </View>

              {/* Signup Button */}
              <TouchableOpacity
                disabled={loading}
                onPress={handleEmailLogin}
                className={`mt-6 h-[56px] rounded-2xl items-center justify-center ${
                  loading ? "bg-neutral-400" : "bg-black"
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white text-[18px] font-popinMedium">Sign up</Text>
                )}
              </TouchableOpacity>

              {/* Divider */}
              <View className="flex-row items-center my-6">
                <View className="h-[1px] bg-neutral-200 flex-1" />
                <Text className="mx-4 text-neutral-500 text-[16px]">or</Text>
                <View className="h-[1px] bg-neutral-200 flex-1" />
              </View>

              {/* Login Redirect */}
              <View className="mt-10 flex-row justify-center">
                <Text className="text-[16px] text-neutral-600 font-popinMedium">
                  Have an account?
                </Text>
                <TouchableOpacity onPress={() => router.push("/Login")}>
                  <Text className="ml-1 text-[16px] text-blue-700 font-popinMedium">Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </KeyboardAvoidingView>
    </MotiView>
  );
}
