import React, { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import TaskForm from "../../components/TaskAdd";
import { Text, ActivityIndicator, SafeAreaView } from "react-native";
import { getTaskById,updateTask } from "../../services/Task_Services";

export default function UpdateTask() {
  const { id } = useLocalSearchParams(); // task ID from params
  const router = useRouter();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch task from Firebase
  const fetchTask = async () => {
    try {
      setLoading(true);
      const data = await getTaskById(id);
      setTask(data);
    } catch (error) {
      console.error("Error fetching task:", error);
      setTask(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTask();
  }, [id]);

  // Handle updated task submission
  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      router.back(); // go back after update
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

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
      onCencel={() => router.push('/task')}
    />
  );
}
