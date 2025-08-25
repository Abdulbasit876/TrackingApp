import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function HeaderWithBack({ title }) {
  const router = useRouter();

  return (
    <View className="flex-row items-center mb-4 mt-12">
      <TouchableOpacity
        onPress={() => router.back()}
        className="p-2 rounded-full"
      >
        <Ionicons name="arrow-back" size={28} color="white" />  
      </TouchableOpacity>
      <Text className="text-white text-[24px] font-bold ml-4">{title}</Text>
    </View>
  );
}
