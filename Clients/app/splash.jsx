import React, { useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from "firebase/auth";

const SplashScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setTimeout(async () => {
        if (user) {
          // Save user in AsyncStorage for backup
          await AsyncStorage.setItem("user", JSON.stringify(user));
          router.replace("/task");
        } else {
          await AsyncStorage.removeItem("user");
          router.replace("/Login");
        }
      }, 2000);
    });

    return () => unsubscribe(); 
  }, [router]);

  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(400)}
      exiting={FadeOut.duration(400)}
    >
      <MotiView
        from={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'timing', duration: 2000 }}
        style={styles.logoContainer}
      >
        <Image
          source={require("../assets/images/splashLogo.png")}
          style={{ width: 400, height: 400 }}
          resizeMode="contain"
        />
      </MotiView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0A0C0C',
  },
  logoContainer: {
    padding: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SplashScreen;
