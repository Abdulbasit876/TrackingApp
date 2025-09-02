import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  Keyboard 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useRouter } from "expo-router";

export default function TaskForm({
  initialTitle = "",
  initialDescription = "",
  initialPriority = "High",
  initialDeadline = null,
  mode = "add",
  onSubmit,
  onCencel,
}) {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [priority, setPriority] = useState(initialPriority);
  const [showDropdown, setShowDropdown] = useState(false);
  const [deadline, setDeadline] = useState(initialDeadline);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const priorities = ["High", "Medium", "Low"];

  useEffect(() => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    setPriority(initialPriority);
    setDeadline(initialDeadline);
  }, [initialTitle, initialDescription, initialPriority, initialDeadline]);

  // 👇 Validation check
  const isFormValid = title.trim() && priority && deadline;

  const handleSubmit = async () => {
    if (!isFormValid || loading) return; // safety
    try {
      setLoading(true);
      if (onSubmit) {
        await onSubmit({ title, description, priority, deadline });
      }
      // ✅ Redirect after success
      router.replace("/task");
    } catch (err) {
      console.error("Error saving task:", err);
    } finally {
      setLoading(false);
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
          <Text className="text-light mt-16 text-4xl font-popinMedium mb-5">
            {mode === "add" ? "Add Task" : "Update Task"}
          </Text>

          {/* Title + Description */}
          <View className="bg-dark border mt-10 border-secondary rounded-2xl p-5 mb-4">
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="Title *"
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

          <TouchableOpacity
            onPress={() => {
            setShowDropdown(!showDropdown)
            Keyboard.dismiss();
            }}
            className="bg-dark mt-8 border border-primary rounded-2xl p-5 mb-4 flex-row justify-between items-center"
          >
            <Text className="text-light">Priority *</Text>
            <View className="flex-row items-center">
              <Text className="text-light mr-2">{priority}</Text>
              <Ionicons
                name={showDropdown ? "chevron-up" : "chevron-down"}
                size={20}
                color="#aaa"
              />
            </View>
          </TouchableOpacity>

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

          {/* Deadline */}
          <TouchableOpacity
            onPress={() => setDatePickerVisibility(true)}
            className="bg-dark border mt-4 border-primary rounded-2xl p-5 mb-6 flex-row justify-between items-center"
          >
            <Text className="text-light">Deadline *</Text>
            <Text className="text-light">
              {deadline ? deadline.toLocaleString() : "Select Date & Time"}
            </Text>
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="datetime"
            minimumDate={new Date()}
            onConfirm={(date) => {
              setDeadline(date);
              setDatePickerVisibility(false);
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
        </View>

        {/* Save/Update Button */}
        <TouchableOpacity
          onPress={handleSubmit}
          disabled={!isFormValid || loading}
          className={`p-6 rounded-2xl items-center absolute bottom-40 left-5 right-5 ${
            isFormValid && !loading ? "bg-secondary" : "bg-gray-500"
          }`}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text className="text-light font-semibold">
              {mode === "add" ? "Save" : "Update"}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCencel}
          disabled={loading}
          className="bg-primary p-6 rounded-2xl items-center absolute bottom-14 left-5 right-5"
        >
          <Text className="text-light font-semibold">Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
