import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { MotiView } from "moti";
import Icon_button from "./Icon_button";

const { width, height } = Dimensions.get("window");

const Navbar = ({ isOpen, toggleDrawer, handleNavigate }) => {
  const Navigate_to_Settings = () => {
    handleNavigate("/settings");
  };
  const Navigate_to_Notifications = () => {
    handleNavigate("/notification");
  };
  const Navigate_to_Insights = () => {  
    handleNavigate("/insights");
  };
    const Navigate_to_Login = async () => {
  try {
 
  await signOut(auth);
   await AsyncStorage.removeItem("user");
    handleNavigate("/Login");

    console.log("Logout successful!");
  } catch (error) {
    console.error("Logout error: ", error);
  }
};
  return (
    <View>
      {/* 3 dots button */}
      <TouchableOpacity onPress={toggleDrawer} className="p-3">
        <Ionicons name="ellipsis-vertical" size={24} color="white" />
      </TouchableOpacity>

      {/* Drawer inside Modal */}
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={toggleDrawer}
      >
        <Pressable
          onPress={toggleDrawer}
          style={{
            flex: 1,
            backgroundColor:"transparent",
          }}
        />

        {/* Drawer */}
        <MotiView
          from={{ translateX: width }}
          animate={{ translateX: 0 }}
          exit={{ translateX: width }}
          transition={{ type: "timing", duration: 300 }}
          style={{
            position: "absolute",
            top: 20,
            right:5,
            width: width * 0.6,
            height: height*0.4,
            zIndex: 50,
          }}
          className="bg-primary rounded-tl-3xl rounded-3xl p-6"
        >
          {/* Close Button */}
          <TouchableOpacity
            onPress={toggleDrawer}
            className="absolute top-5 right-3"
          >
            <Ionicons name="close" size={25} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl mb-6 font-popinMedium">Menu</Text>
          <Icon_button icon="settings" text="Settings" handleFunction={Navigate_to_Settings} />
          <Icon_button icon="notifications" text="Notifications" handleFunction={Navigate_to_Notifications} />
          <Icon_button icon="analytics" text="Insights" handleFunction={Navigate_to_Insights} />
          <Icon_button icon="log-out" text="Logout" handleFunction={Navigate_to_Login} />
        </MotiView>
      </Modal>
    </View>
  );
};

export default Navbar;