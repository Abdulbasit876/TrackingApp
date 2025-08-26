import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  initialPriority = "High",
  mode = "add", // "add" or "update"
  onSubmit, // function jab save/update button dabaye
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [showDropdown, setShowDropdown] = useState(false);

  const priorities = ["High", "Medium", "Low"];

  // agar props change ho to state update ho jaye
  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
  }, [initialTitle, initialDescription, initialPriority]);

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit({ title, description, priority });
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-dark"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-5 pt-14">
          {/* Header */}
          <Text className="text-light mt-14 text-4xl font-popinMedium mb-5">
            {mode === "add" ? "Add Task" : "Update Task"}
          </Text>

          {/* Title + Description */}
          <View className="bg-dark border mt-10 border-secondary rounded-2xl p-5 mb-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title"
              placeholderTextColor="#aaa"
              className="text-light font-bold text-base mb-2"
            />
            <TextInput
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
              placeholderTextColor="#aaa"
              multiline
              scrollEnabled={true}
              className="text-light text-base"
              style={{
                height: 50,
                textAlignVertical: "top",
              }}
            />
          </View>

          {/* Priority */}
          <TouchableOpacity
            onPress={() => setShowDropdown(!showDropdown)}
            className="bg-dark mt-8 border border-primary rounded-2xl p-5 mb-4 flex-row justify-between items-center"
          >
            <Text className="text-light">Priority</Text>
            <View className="flex-row items-center">
              <Text className="text-light mr-2">{priority}</Text>
              <Ionicons
                name={showDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>

          {/* Dropdown */}
          {showDropdown && (
            <View className="bg-dark border border-primary rounded-2xl mb-4">
              {priorities.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setPriority(item);
                    setShowDropdown(false);
                  }}
                  className="p-3 border-b border-neutral-700"
                >
                  <Text
                    className={`${
                      priority === item ? "text-secondary" : "text-light"
                    }`}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Deadline (static for now) */}
          <View className="bg-dark border mt-4 border-primary rounded-2xl p-5 mb-6 flex-row justify-between items-center">
            <Text className="text-light">Deadline</Text>
            <Text className="text-light">May 25, 2024</Text>
          </View>
        </View>

        {/* Save/Update Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          className="bg-secondary p-6 rounded-2xl items-center absolute bottom-14 left-5 right-5"
        >
          <Text className="text-light font-semibold">
            {mode === "add" ? "Save" : "Update"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
