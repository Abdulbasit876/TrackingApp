
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { MotiView } from "moti";
import { useRouter, useLocalSearchParams } from "expo-router";
import HeaderWithBack from "../../components/HeaderWithBack";

const tasks = [
  { id: "1", title: "Update website", color: "bg-danger", date: "Today", priority: "High", description: "Update the landing page and fix hero section" },
  { id: "2", title: "Client presentation", color: "bg-orange", date: "Jun 6", priority: "Medium", description: "Prepare slides and demo for the client" },
  { id: "3", title: "Plan budget", color: "bg-green", date: "Tomorrow", priority: "Low", description: "Work on budget estimates for next quarter" },
  { id: "4", title: "Call Alex", color: "bg-danger", date: "Jun 4", priority: "High", description: "Discuss partnership terms" },
  { id: "5", title: "Book flights", color: "bg-orange", date: "Jun 7", priority: "Medium", description: "Book flights for conference" },
  { id: "6", title: "Buy groceries", color: "bg-green", date: "Today", priority: "Low", description: "Milk, Bread, Eggs, Vegetables" },
];

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // find task from dummy array
  const task = tasks.find((t) => t.id === id);

  // If no task found (id invalid), show a friendly message and back button
  if (!task) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center px-6">
        <StatusBar barStyle="light-content" />
        <Text className="text-white text-xl mb-4">Task not found</Text>
        <TouchableOpacity
          onPress={() => router.back?.()}
          className="bg-primary py-3 px-6 rounded-xl"
        >
          <Text className="text-white">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const handleComplete = () => {
    // currently just navigate back to list; later add real logic
    router.push("/task");
  };
  const handleUpdate = () => {
    router.push(`/update/${id}`);
  };
  const handleDelete = () => {
    // currently just navigate back to list; later add delete logic
    router.push("/task");
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 pt-5">
        <HeaderWithBack />

        <Text
          className="text-white text-4xl mb-2 font-popinMedium"
          style={{ lineHeight: 42, includeFontPadding: false, textAlignVertical: "center" }}
        >
          {task.title}
        </Text>

        <View className="mt-7">
          {/* Description */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Description
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-5">
            {task.description ?? "No description"}
          </Text>

          {/* Priority */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Priority
          </Text>
          <Text className="text-[#fb923c] text-lg font-popinRegular mb-5">
            {task.priority}
          </Text>

          {/* Due Date */}
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Due Date
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-6">
            {task.date}
          </Text>
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
