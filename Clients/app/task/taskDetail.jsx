// TaskDetailScreen.jsx
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MotiView } from "moti";
import { useRouter } from "expo-router";
import HeaderWithBack from "../../components/HeaderWithBack";

export default function TaskDetailScreen() {
  const router = useRouter();

  const handleComplete = () => console.log("Complete pressed");
  const handleUpdate = () => console.log("Update pressed");
  const handleDelete = () => console.log("Delete pressed");

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 pt-5">
      <HeaderWithBack/>
       <Text
  className="text-white text-4xl mb-2 font-popinMedium"
  style={{ lineHeight: 42, includeFontPadding: false, textAlignVertical: "center" }}
>
  Plan budget for the new project
</Text>

        <View className="mt-7">
          {/* Description */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Description
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-5">
            Set up a budget plan for the upcoming project
          </Text>

          {/* Priority */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Priority
          </Text>
          <Text className="text-[#fb923c] text-lg font-popinRegular mb-5">
            High
          </Text>

          {/* Due Date */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Due Date
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-6">June 6</Text>
        </View>

        {/* Spacer */}
        <View className="flex-1" />

        {/* Buttons group */}
        <View className={Platform.OS === "ios" ? "pb-[18px]" : "pb-[34px]"}>
          <View className="flex-row justify-between mb-3">
            {/* Completed */}
            <MotiView
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 380 }}
              className="flex-1 mr-2.5"
            >
              <TouchableOpacity
                onPress={handleComplete}
                activeOpacity={0.85}
                className="bg-[#008660] py-3 rounded-xl items-center"
              >
                <Text className="text-white font-popinRegular text-base">
                  Completed
                </Text>
              </TouchableOpacity>
            </MotiView>

            {/* Update */}
            <MotiView
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 520 }}
              className="flex-1 mx-1.5"
            >
              <TouchableOpacity
                onPress={handleUpdate}
                activeOpacity={0.85}
                className="bg-[#6f57d8] py-3 rounded-xl items-center"
              >
                <Text className="text-white font-popinRegular text-base">Update</Text>
              </TouchableOpacity>
            </MotiView>

            {/* Delete */}
            <MotiView
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 680 }}
              className="flex-1 ml-2.5"
            >
              <TouchableOpacity
                onPress={handleDelete}
                activeOpacity={0.85}
                className="bg-[#fb923c] py-3 rounded-xl items-center"
              >
                <Text className="text-white font-popinRegular text-base">Delete</Text>
              </TouchableOpacity>
            </MotiView>
          </View>

          {/* Cancel */}
          <MotiView
            from={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ type: "timing", duration: 420 }}
          >
            <TouchableOpacity
              onPress={() => router.back?.()}
              activeOpacity={0.85}
              className="bg-primary py-4 rounded-xl items-center"
            >
              <Text className="text-white font-popinRegular text-lg">Cancel</Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </View>
    </SafeAreaView>
  );
}
