import { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import NotificationCard from "../components/NotificationCard";
import HeaderWithBack from "../components/HeaderWithBack";
import { fetchNotifications, deleteNotification } from "../services/Task_Services";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNotis = async () => {
    setLoading(true);
    const notis = await fetchNotifications();
    setNotifications(notis);
    setLoading(false);
  };

  useEffect(() => {
    loadNotis();
  }, []);

  const handleDelete = async (taskId, id) => {
    const success = await deleteNotification(taskId, id);
    if (success) {
      loadNotis();
    }
  };

  // helper function to extract actual title
  const extractTitle = (message) => {
    if (!message) return "No Title";
    return message.replace("Deadline Reached:", "").trim();
  };

  return (
    <View className="flex-1 bg-black px-4 pt-10">
      <HeaderWithBack />
      <Text className="text-white font-popinMedium text-[28px]">
        Notifications
      </Text>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#fff" />
          <Text className="text-white mt-4">Loading Notifications...</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
        className="flex-1 pt-8 ">
          {notifications.length === 0 ? (
            <Text className="text-gray-400 text-center mt-10">
              No notifications yet
            </Text>
          ) : (
            notifications.map((item) => (
              <NotificationCard
                key={item.id}
                title={extractTitle(item.message)}  // 👈 only show title after "Deadline Reached:"
                dueText={`Due at ${
                  item.time
                    ? item.time.toDate().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Unknown"
                }`}
                rightText={
                  item.time ? item.time.toDate().toDateString() : "Unknown Date"
                }
                onDelete={() => handleDelete(item.taskId, item.id)}
              />
            ))
          )}
        </ScrollView>
      )}
    </View>
  );
}
