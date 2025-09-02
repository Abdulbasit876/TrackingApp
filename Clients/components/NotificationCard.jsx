import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const NotificationCard = ({ title, dueText, rightText, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true); // loader start
      await onDelete(); // parent se delete function call
    } finally {
      setIsDeleting(false); // agar hata diya ya error hua to loader band
    }
  };
  return (
    <View className="bg-[#1E1E1E] rounded-2xl px-4 py-4 mb-6">
      {/* Top Row */}
      <View className="flex-row justify-between items-start">
        {/* Left Side (Title + Due text) */}
        <View style={{ width: "60%" }}>
          <Text
            className="text-white font-popinMedium text-[16px]"
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Text className="text-gray-400 font-popinRegular text-[13px] mt-1">
            {dueText}
          </Text>
        </View>

        {/* Right Side (Right text + Delete button) */}
        <View className="items-end">
          <Text className="text-gray-300 font-popinMedium text-[13px] mb-2">
            {rightText}
          </Text>

          {/* Delete Icon / Loader */}
          <TouchableOpacity
            onPress={handleDelete}
            disabled={isDeleting}
            className="absolute -top-8 -right-2  rounded-full bg-danger "
          >
            {isDeleting ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Ionicons name="close" size={18} color="#FFFFFF" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default NotificationCard;
