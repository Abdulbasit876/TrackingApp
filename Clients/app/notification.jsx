import { View, Text, ScrollView } from "react-native";
import NotificationCard from "../components/NotificationCard";
import HeaderWithBack from "../components/HeaderWithBack";

export default function NotificationsScreen() {
  const notifications = [
    { title: "Design meeting", subtitle: "Due ef 5:00 AM", rightText: "9:00 AM" },
    { title: "Client presentation", subtitle: "Due Jun 2", rightText: "Tomorrow" },
    { title: "Book flights", subtitle: "Due Jun 13", rightText: "Jun 14" },
  ];

  return (
    <View className="flex-1 bg-dark px-4 pt-10">
      <HeaderWithBack/>
      {/* Heading */}
      <Text className="text-white  font-popinMedium text-[30px] mb-8">
        Notifications
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        {notifications.map((item, index) => (
          <NotificationCard
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            rightText={item.rightText}
          />
        ))}
      </ScrollView>
    </View>
  );
}
