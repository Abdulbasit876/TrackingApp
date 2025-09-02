import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import CustomToggle from "./CustomToggle";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Switch_cards = ({ title = "Title", storageKey }) => {
  const [enabled, setEnabled] = useState(false);

  // ✅ Load saved state only if storageKey is provided
  useEffect(() => {
    if (!storageKey) return; // agar key hi nahi to skip

    const loadSetting = async () => {
      try {
        const savedValue = await AsyncStorage.getItem(storageKey);
        if (savedValue !== null) {
          setEnabled(savedValue === "true"); // convert string to boolean
        }
      } catch (e) {
        console.error("Error loading setting:", e);
      }
    };
    loadSetting();
  }, [storageKey]);

  // ✅ Save to AsyncStorage whenever toggle changes (only if storageKey is given)
  const handleToggle = async (value) => {
    setEnabled(value);
    if (!storageKey) return; // agar key nahi hai to storage skip

    try {
      await AsyncStorage.setItem(storageKey, value.toString()); // store as string
    } catch (e) {
      console.error("Error saving setting:", e);
    }
  };

  return (
    <View className="flex-row justify-between h-20 items-center bg-primary p-4 rounded-2xl mb-4">
      <Text className="text-white font-popinMedium text-[20px]">{title}</Text>
      <CustomToggle value={enabled} onChange={handleToggle} />
    </View>
  );
};

export default Switch_cards;
