import React, { useState, useEffect } from "react";
import { TouchableOpacity, Animated } from "react-native";
import { View } from "react-native";

export default function CustomToggle({ value, onChange }) {
  const [animValue] = useState(new Animated.Value(value ? 1 : 0));

  // Add this effect to sync animValue with value prop changes
  useEffect(() => {
    Animated.timing(animValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const toggleSwitch = () => {
    const newValue = !value;
    onChange(newValue);

    Animated.timing(animValue, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const translateX = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // left to right move
  });

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggleSwitch}
      className={`w-[50px] h-[28px] rounded-full p-[2px] justify-center ${
        value ? "bg-secondary" : "bg-dark"
      }`}
    >
      <Animated.View
        style={{
          transform: [{ translateX }],
        }}
        className="w-[24px] h-[24px] rounded-full bg-white"
      />
    </TouchableOpacity>
  );
}
