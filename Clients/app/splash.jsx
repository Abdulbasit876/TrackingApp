import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../config/firebase';

const SplashScreen = () => {
  const router = useRouter();

useEffect(() => {
  const checkUser = async () => {
    const storedUser = await AsyncStorage.getItem('user');

    setTimeout(async () => {
      if (storedUser) {
        try {
          // Firebase current user check
          const currentUser = auth.currentUser;
          if (currentUser) {
            router.replace('/task'); 
            console.log('User exists:', storedUser);
          } else {
            // user Firebase me delete ho chuka hai
            await AsyncStorage.removeItem('user');
            router.replace('/Login');
            console.log('User not found in Firebase');
          }
        } catch (err) {
          // error handling
          await AsyncStorage.removeItem('user');
          router.replace('/Login');
          console.log('Error checking Firebase user:', err);
        }
      } else {
        router.replace('/Login');
        console.log('No user found in AsyncStorage');
      }
    }, 2000);
  };

  checkUser();
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
      <ActivityIndicator size="large" color="#fff" style={{ position: 'absolute', bottom: 50 }} />
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
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default SplashScreen;
