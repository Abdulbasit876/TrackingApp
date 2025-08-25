import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity,StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import Barcard from "@/components/Barcard";
import Navbar from "../../components/Navbar";
import { useRouter } from "expo-router";
import Icon_button from "../../components/Icon_button";
const tasks = [
  { id: "1", title: "Update website", color: "bg-danger", date: "Today" },
  { id: "2", title: "Client presentation", color: "bg-orange", date: "Jun 6" },
  { id: "3", title: "Plan budget", color: "bg-green", date: "Tomorrow" },
  { id: "4", title: "Call Alex", color: "bg-danger", date: "Jun 4" },
  { id: "5", title: "Book flights", color: "bg-orange", date: "Jun 7" },
  { id: "6", title: "Buy groceries", color: "bg-green", date: "Today" },
];
export default function TaskListScreen() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAll,setIsAll]=useState(false);
  const router = useRouter();
  const toggleDrawer = () => setIsOpen((prev) => !prev);
  const handleNavigate = (path) => {
    setIsOpen(false);
    router.push(path);
  };

  return (
    <SafeAreaView className="flex-1 bg-dark px-4">
      <StatusBar
                    barStyle="light-content"
                    translucent
                    backgroundColor="transparent"
                  />
      {/* Header with Navbar */}
      <View className="flex-row items-center justify-between mt-6 mb-4">
        <Text className="text-white text-3xl font-popinSemiBold">Task List</Text>
        <Navbar  isOpen={isOpen} toggleDrawer={toggleDrawer} handleNavigate={handleNavigate} />
      </View>  
      <Barcard title="High" text="8 of task • Today" barColor="danger" progress="30" />
      <Barcard title="Medium" text="5 of task • Tomorrow" barColor="orange" progress="50" />
      <Barcard title="Low" text="2 of task • This Week" barColor="green" progress="90" />
      <View className="mt-6 flex-1 bg-primary p-4 pb-10 rounded-3xl">
        <View className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-2xl font-popinMedium mb-3">All Tasks</Text>
          {  isAll?<Icon_button text="All" icon_size={20} icon="reader"/>: ""}
        </View>
        <FlatList
  showsVerticalScrollIndicator={false}
  data={tasks}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setIsOpen(false);
       router.push('/task/taskDetail');
      }}
      className="flex-row items-center justify-between bg-black/30 p-4 mb-3 rounded-2xl"
    >
      <View className="flex-row items-center">
        <View className={`w-3 h-3 rounded-full ${item.color} mr-3`} />
        <Text className="text-white font-popinRegular text-sm">{item.title}</Text>
      </View>
      <Text className="text-gray-400 font-popinRegular text-xs">{item.date}</Text>
    </TouchableOpacity>
  )}
/>

      </View>
      <TouchableOpacity
        onPress={() => setIsOpen(false)}
        className="absolute bottom-6 right-6 bg-secondary p-4 rounded-full shadow-lg"
      >
        <MaterialIcons name="add" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}
