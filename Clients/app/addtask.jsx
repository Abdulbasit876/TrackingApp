import { View, Text, TouchableOpacity } from "react-native";    
import { Ionicons } from "@expo/vector-icons";
import TaskForm from "../components/TaskAdd";
export default function AddTask() {

  return (
<>
<TaskForm
  mode="add"
  onSubmit={(task) => {
    console.log("New Task:", task);
  }}
/>
</>
  );
}
