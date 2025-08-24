// app/dashboard.jsx
import { View, Text } from "react-native";
import { Stack } from "expo-router";

export default function Dashboard() {
    return (

        <View className="flex-1 justify-center items-center bg-white">
            <Text className="text-2xl font-bold text-black">
                🎉 Welcome to Dashboard
            </Text>
        </View>
    );
}
