import { Stack} from "expo-router";
import 'react-native-reanimated';
import '../global.css';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    popinLight: require('../assets/fonts/Poppins-Light.ttf'),
    popinRegular: require('../assets/fonts/Poppins-Regular.ttf'),
    popinMedium: require('../assets/fonts/Poppins-Medium.ttf'),
    popinSemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    popinBold: require('../assets/fonts/Poppins-Bold.ttf'),
    popinExtraBold: require('../assets/fonts/Poppins-ExtraBold.ttf'),
    popinBlack: require('../assets/fonts/Poppins-Black.ttf'),
    popinExtraLight: require('../assets/fonts/Poppins-ExtraLight.ttf'),
    popinThin: require('../assets/fonts/Poppins-Thin.ttf'),
    popinLightItalic: require('../assets/fonts/Poppins-LightItalic.ttf'),
    popinItalic: require('../assets/fonts/Poppins-Italic.ttf'),
    popinMediumItalic: require('../assets/fonts/Poppins-MediumItalic.ttf'),
    popinSemiBoldItalic: require('../assets/fonts/Poppins-SemiBoldItalic.ttf'),
    popinBoldItalic: require('../assets/fonts/Poppins-BoldItalic.ttf'),
    popinExtraBoldItalic: require('../assets/fonts/Poppins-ExtraBoldItalic.ttf'),
    popinBlackItalic: require('../assets/fonts/Poppins-BlackItalic.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack initialRouteName="splash">
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} />
      <Stack.Screen name="signup" options={{ headerShown: false }} />
    </Stack>
  );
}