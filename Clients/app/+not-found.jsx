import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRouter, Stack } from "expo-router";
import { MotiView } from "moti";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

export default function NotFoundScreen() {
  const router = useRouter();

  return (
    <>
      <Stack.Screen options={{ headerShown:false }} />
      <View style={styles.container} className="bg-dark text-white">
        <MotiView
          from={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", duration: 700 }}
          style={styles.iconContainer}
        >
          <Ionicons name="alert-circle-outline" size={100} color="#7158CC" />
        </MotiView>

        {/* Text with fade animation */}
        <Animated.View
          entering={FadeIn.duration(700)}
          exiting={FadeOut}
          style={styles.textContainer}
        >
          <Text  className="font-popinSemiBold text-2xl text-white mb-3 ">Oops! Page Not Found</Text>
          <Text className="font-popinRegular text-base text-white text-center mt-2">
            The page you are looking for doesn’t exist or has been moved.
          </Text>
        </Animated.View>

        {/* Button with spring animation */}
        <MotiView
          from={{ translateY: 20, opacity: 0 }}
          animate={{ translateY: 0, opacity: 1 }}
          transition={{ type: "timing", duration: 600, delay: 400 }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/task")}
          >
            <Text style={styles.buttonText}>Go to Home</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "#7158CC",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
