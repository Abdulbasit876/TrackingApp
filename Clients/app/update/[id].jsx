import React from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "../../components/TaskAdd";

export default function UpdateTask() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const task = {
    id,
    title: "Old Task Title",
    description: "This is old description",
    priority: "High",
    deadline: "May 25, 2024",
  };

  const handleUpdate = (updatedTask) => {
    console.log("Updated Task:", updatedTask);
    router.back();
  };

  return (
    <TaskForm
      initialTitle={task.title}
      initialDescription={task.description}
      initialPriority={task.priority}
      mode="update"
      onSubmit={handleUpdate}
    />
  );
}
