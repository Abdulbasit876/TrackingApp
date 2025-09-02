import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
  ActivityIndicator,
} from "react-native";
import { MotiView } from "moti";
import { useRouter, useLocalSearchParams } from "expo-router";
import HeaderWithBack from "../../components/HeaderWithBack";
import {
  completeTask,
  deleteTask,
  getTaskById,
} from "../../services/Task_Services";
import { useEffect, useState } from "react";

export default function TaskDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState({
    complete: false,
    update: false,
    delete: false,
  });

  // 🔹 Fetch task from Firebase
  const fetchTask = async () => {
    try {
      setLoading(true);
      const fetchedTask = await getTaskById(id);
      setTask(fetchedTask);
    } catch (error) {
      console.error("Error fetching task:", error);
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, []);

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center px-6">
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

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

  // 🔹 Handlers with loader
  const handleComplete = async () => {
    try {
      setBtnLoading((prev) => ({ ...prev, complete: true }));
      await completeTask(id); // marks task completed in Firebase
      await fetchTask(); // refresh local task data
    } catch (error) {
      console.error("Error completing task:", error);
    } finally {
      setBtnLoading((prev) => ({ ...prev, complete: false }));
    }
  };

  const handleUpdate = () => {
    router.push(`/update/${id}`);
  };

  const handleDelete = async () => {
    try {
      setBtnLoading((prev) => ({ ...prev, delete: true }));
      await deleteTask(id);
      router.push("/task"); // redirect after delete
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setBtnLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <StatusBar barStyle="light-content" />
      <View className="flex-1 px-6 pt-5">
        <HeaderWithBack />

        <Text
          className="text-white text-4xl mb-2 font-popinMedium"
          style={{
            lineHeight: 42,
            includeFontPadding: false,
            textAlignVertical: "center",
          }}
        >
          {task.title}
        </Text>

        <View className="mt-7">
          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Description
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-5">
            {task.description ?? "No description"}
          </Text>

          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Priority
          </Text>
          <Text className="text-[#fb923c] text-lg font-popinRegular mb-5">
            {task.priority}
          </Text>

          <Text className="text-[#8b5cf6] text-xl upercase font-popinMedium">
            Due Date
          </Text>
          <Text className="text-[#d4d4d4] text-lg font-popinRegular mb-6">
            {task.deadline
              ? task.deadline.toDate
                ? task.deadline.toDate().toLocaleDateString()
                : new Date(task.deadline).toLocaleDateString()
              : "No deadline"}
          </Text>
        </View>

        <View className="flex-1" />
        <View className={Platform.OS === "ios" ? "pb-[18px]" : "pb-[34px]"}>

          <View className="flex-row justify-between mb-3">
            {/* Complete */}
            <MotiView
              from={{ opacity: 0, translateY: 18 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ type: "timing", duration: 380 }}
              className="flex-1 mr-2.5"
            >
              <TouchableOpacity
                onPress={handleComplete}
                activeOpacity={0.85}
                className={`py-3 rounded-xl items-center flex-row justify-center ${
                  task.isCompleted ? "bg-gray-500" : "bg-[#008660]"
                }`}
                disabled={task.isCompleted || btnLoading.complete}
              >
                {btnLoading.complete ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-popinRegular text-base">
                    {task.isCompleted ? "Completed" : "Complete"}
                  </Text>
                )}
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
                className={`py-3 rounded-xl items-center flex-row justify-center ${
                  task.isCompleted ? "bg-gray-500" : "bg-[#6f57d8]"
                }`} // ✅ color gray if completed
                disabled={btnLoading.update || task.isCompleted} // ✅ disable if completed
              >
                {btnLoading.update ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-popinRegular text-base">
                    Update
                  </Text>
                )}
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
                className="bg-[#fb923c] py-3 rounded-xl items-center flex-row justify-center"
                disabled={btnLoading.delete}
              >
                {btnLoading.delete ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text className="text-white font-popinRegular text-base">
                    Delete
                  </Text>
                )}
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
              <Text className="text-white font-popinRegular text-lg">
                Cancel
              </Text>
            </TouchableOpacity>
          </MotiView>
        </View>
      </View>
    </SafeAreaView>
  );
}
