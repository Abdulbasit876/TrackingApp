import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Ionicons } from "@expo/vector-icons";

const Icon_button = ({
  icon = "settings",
  text = "Settings",
  handleFunction,
  icon_size = 20,
}) => {
  return (
    <TouchableOpacity
      className="bg-secondary p-3 rounded-xl mb-3 flex-row items-center"
      onPress={() => {
        if (typeof handleFunction === "function") {
          handleFunction();
        }
      }}
    >
      <Ionicons name={icon} size={icon_size} color="white" />
      <Text className="text-white text-lg ml-2 font-popinMedium">{text}</Text>
    </TouchableOpacity>
  );
};

export default Icon_button;
