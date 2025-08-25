import React, { useEffect } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { MotiView } from 'moti';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import {useRouter} from 'expo-router';

const SplashScreen = () => {
    const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/Login"); 
    }, 3000);
    return () => clearTimeout(timer);
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
    backgroundColor:'#0A0C0C'
  },
  logoContainer: {
    padding: 40,
     display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SplashScreen;
