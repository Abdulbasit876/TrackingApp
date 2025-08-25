import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MotiView } from 'moti';
import { useRouter } from 'expo-router';

export default function TaskDetailScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-[#0f0f0f] px-5 pt-14">
      {/* Back Arrow */}
      <TouchableOpacity onPress={() => router.back()}>
        <Text className="text-[#a78bfa] text-xl">{'←'}</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text className="text-white text-[28px] font-bold mt-4">Plan budget</Text>

      {/* Description */}
      <Text className="text-[#a78bfa] uppercase text-xs mt-6">Description</Text>
      <Text className="text-[#d4d4d4] text-base mt-1">
        Set up a budget plan for the upcoming project
      </Text>

      {/* Priority */}
      <Text className="text-[#a78bfa] uppercase text-xs mt-6">Priority</Text>
      <Text className="text-[#fb923c] text-base mt-1">High</Text>

      {/* Due Date */}
      <Text className="text-[#a78bfa] uppercase text-xs mt-6">Due Date</Text>
      <Text className="text-[#d4d4d4] text-base mt-1">June 6</Text>

      {/* Buttons */}
      <View className="flex-row justify-between mt-12">
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 400 }}
          className="flex-1 mr-2"
        >
          <TouchableOpacity className="bg-[#16a34a] py-3 rounded-lg active:opacity-80">
            <Text className="text-white text-center font-semibold">Completed</Text>
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 500 }}
          className="flex-1 mx-2"
        >
          <TouchableOpacity className="bg-[#8b5cf6] py-3 rounded-lg active:opacity-80">
            <Text className="text-white text-center font-semibold">Update</Text>
          </TouchableOpacity>
        </MotiView>

        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'timing', duration: 600 }}
          className="flex-1 ml-2"
        >
          <TouchableOpacity className="bg-[#f97316] py-3 rounded-lg active:opacity-80">
            <Text className="text-white text-center font-semibold">Delete</Text>
          </TouchableOpacity>
        </MotiView>
      </View>
    </View>
  );
}