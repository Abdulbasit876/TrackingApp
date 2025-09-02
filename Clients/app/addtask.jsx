import { View } from "react-native";    
import TaskForm from "../components/TaskAdd";
import { addTask } from "../services/Task_Services"; // ✅ import
import { useRouter } from "expo-router";
export default function AddTask() {
  const router = useRouter();
  return (
    <View style={{ flex: 1 }}>
      <TaskForm
        mode="add"
        onSubmit={async (task) => {
          try {
            await addTask(task);
            console.log("Task saved successfully:", task);
            router.replace("/task");
          } catch (err) {
            console.error("Error saving task:", err);
          }
        }}
        onCencel={() => router.push('/task')}
      />
    </View>
  );
}
