import React, { useEffect, useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Barcard from "@/components/Barcard";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";
import { auth } from "../../config/firebase";
import Icon_button from "../../components/Icon_button";
import { getTasks } from "../../services/Task_Services";
import { useFocusEffect } from "@react-navigation/native"; // For auto refresh on focus

export default function TaskListScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const priorityColors = {
    High: "bg-danger",
    Medium: "bg-orange",
    Low: "bg-green",
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await getTasks();
      const mapped = data.map((task) => ({
        ...task,
        color: priorityColors[task.priority] || "bg-gray-500",
      }));
      setTasks(mapped);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auth check + initial fetch
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        router.replace("/Login");
      } else {
        fetchTasks();
      }
    });
    return unsubscribe;
  }, []);

  // 🔹 Auto refresh when screen focus
  useFocusEffect(
    useCallback(() => {
      fetchTasks();
    }, [])
  );

  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const handleNavigate = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  const filteredTasks =
    filter === "All" ? tasks : tasks.filter((task) => task.priority === filter);

  const getStats = (priority) => {
    const priorityTasks = tasks.filter((t) => t.priority === priority);
    const completed = priorityTasks.filter((t) => t.isCompleted).length;
    const total = priorityTasks.length;
    return {
      text: `${completed} of ${total} • ${priority}`,
      progress: total > 0 ? (completed / total) * 100 : 0,
    };
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-dark items-center justify-center px-6">
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark px-4">
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View className="flex-row items-center justify-between mt-6 mb-4">
        <Text className="text-white text-3xl font-popinSemiBold">Task List</Text>
        <Navbar
          isOpen={isOpen}
          toggleDrawer={toggleDrawer}
          handleNavigate={handleNavigate}
        />
      </View>

      {/* Barcards */}
      <Barcard title="High" text={getStats("High").text} barColor="danger" progress={getStats("High").progress} onPress={() => setFilter("High")} />
      <Barcard title="Medium" text={getStats("Medium").text} barColor="orange" progress={getStats("Medium").progress} onPress={() => setFilter("Medium")} />
      <Barcard title="Low" text={getStats("Low").text} barColor="green" progress={getStats("Low").progress} onPress={() => setFilter("Low")} />

      {tasks.length > 0 && (
        <View className="mt-6 flex-1 bg-primary p-4 pb-10 rounded-3xl">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-white text-2xl font-popinMedium mb-3">
              {filter === "All" ? "All Tasks" : `${filter} Tasks`}
            </Text>
            {filter !== "All" && (
              <Icon_button
                text="All"
                icon="reader"
                icon_size={20}
                handleFunction={() => setFilter("All")}
              />
            )}
          </View>

       <FlatList
  showsVerticalScrollIndicator={false}
  data={filteredTasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => {
    const isCompleted = item.isCompleted;
    return (
      <TouchableOpacity
        disabled={false} // 🔹 Allow navigation even if completed
        onPress={() => {
          setIsOpen(false);
          router.push(`/taskDetail/${item.id}`);
        }}
        className={`flex-row items-center justify-between p-4 mb-3 rounded-2xl ${
          isCompleted ? "bg-black/10" : "bg-black/30"
        }`}
      >
        <View className="flex-row items-center">
          <View
            className={`w-3 h-3 rounded-full mr-3 ${
              isCompleted ? "bg-gray-500" : item.color
            }`}
          />
          <Text
            className={`font-popinRegular text-sm ${
              isCompleted ? "text-gray-500" : "text-white"
            } max-w-[60%]`}  // 👈 yahan width limit di
            numberOfLines={1} // 👈 sirf ek line
            ellipsizeMode="tail" // 👈 baaki dots (...)
          >
            {item.title}
          </Text>
        </View>
        <Text
          className={`font-popinRegular text-xs ${
            isCompleted ? "text-gray-400" : "text-gray-300"
          }`}
        >
          {isCompleted
            ? "Completed"
            : item.deadline?.toDate
            ? item.deadline.toDate().toLocaleString()
            : new Date(item.deadline).toLocaleString()}
        </Text>
      </TouchableOpacity>
    );
  }}
/>

        </View>
      )}

      <TouchableOpacity
        onPress={() => setIsOpen(false) || router.push("/addtask")}
        className="absolute bottom-6 right-6 bg-secondary p-4 rounded-full shadow-lg"
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
