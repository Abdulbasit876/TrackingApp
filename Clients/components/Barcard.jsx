import { Text, TouchableOpacity, View } from "react-native";
const COLOR_CLASSES = {
  secondary: "bg-secondary",
  orange: "bg-orange",
  green: "bg-green",
  danger: "bg-danger",
};
const Barcard = ({
  title = "High",
  text = "8 of task • Today",
  barColor = "secondary",
  progress = 70,
  onPress,
}) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8} // 👈 thoda button effect aayega
      className="mt-4 bg-primary p-4 rounded-3xl"
    >
      <Text className="text-white text-xl font-popinMedium">{title}</Text>

      {/* Bar Background */}
      <View className="w-full h-2 bg-gray-800 rounded-full mt-2 overflow-hidden">
        {/* Bar Fill */}
        <View
          className={`${COLOR_CLASSES[barColor] || COLOR_CLASSES.secondary}`}
          style={{
            width: `${clampedProgress}%`,
            height: "100%",
            borderRadius: 999,
          }}
        />
      </View>

      <Text className="text-gray-400 mt-1">{text}</Text>
    </TouchableOpacity>
  );
};

export default Barcard;
