import { View, Text } from "react-native";

const NotificationCard = ({ title, subtitle, rightText }) => {
  return (
    <View className="bg-primary rounded-xl px-5 py-3 h-24 mb-6 shadow-sm">
      <View className="flex-row  justify-between mt-1 items-center">
        {/* Title & Subtitle */}
        <View>
          <Text className="text-white font-popinMedium text-[18px]">
            {title}
          </Text>
          <Text className="text-white font-popinMedium mt-1 text-[11px]">
            {subtitle}
          </Text>
        </View>

        {/* Right Side Text */}
        <Text className="text-white font-popinMedium text-[13px] font-medium">
          {rightText}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;
