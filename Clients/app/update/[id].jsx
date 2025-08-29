import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "../../components/TaskAdd";
import { Text } from "react-native";


export default function UpdateTask() {
  const { id } = useLocalSearchParams(); // yahan se id mil rahi hai
  const router = useRouter();

  // Dummy Task List (baad me Firebase se aa sakta hai)
  const tasks = [
    {
      id: "1",
      title: "Complete Assignment",
      description: "Math assignment due tomorrow",
      priority: "High",
      deadline: "Aug 28, 2025",
    },
    {
      id: "2",
      title: "Buy Groceries",
      description: "Milk, Bread, Eggs, Fruits",
      priority: "Medium",
      deadline: "Aug 30, 2025",
    },
    {
      id: "3",
      title: "Gym Workout",
      description: "Leg day workout session",
      priority: "Low",
      deadline: "Sep 01, 2025",
    },
  ];
  const task = tasks.find((t) => t.id === id);

  const handleUpdate = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    router.back();
  };

  if (!task) {
    return (
      <Text style={{ color: "red", textAlign: "center", marginTop: 50 }}>
        Task not found!
      </Text>
    );
  }

  return (
    
    <TaskForm
      initialTitle={task.title}
      initialDescription={task.description}
      initialPriority={task.priority}
      initialDeadline={task.deadline}
      mode="update"
      onSubmit={handleUpdate}
    />
  );
}
