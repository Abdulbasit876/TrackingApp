import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { View as MotiView } from "moti";
import HeaderWithBack from "../components/HeaderWithBack";
import { getCompletedTasks, getBarData, getPieData } from "../services/Task_Services"; // ✅ tumhari services

export default function ProductivityInsights({ route }) {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasks = await getCompletedTasks();

        setBarData(getBarData(tasks));
        setPieData(getPieData(tasks));
      } catch (err) {
        console.error("Error in ProductivityInsights:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <View className="flex-1 bg-white dark:bg-dark px-4 py-6">
      <HeaderWithBack />
      <Text className="text-2xl font-popinSemiBold text-gray-800 dark:text-white">
        Productivity Insights
      </Text>

      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 500 }}
        className="mb-8 mt-10"
      >
        <View className="w-full bg-primary py-6 rounded-xl overflow-hidden">
          <Text className="text-lg font-popinMedium text-gray-700 pl-5 dark:text-gray-200">
            Tasks Completed
          </Text>

          <BarChart
            data={barData}
            barWidth={24}
            spacing={12}
            hideRules
            showFractionalValue
            frontColor="#6656BD"
            yAxisThickness={0}
            yAxisTextStyle={{ color: "transparent" }}
            xAxisLabelTextStyle={{
              color: "white",
              fontSize: 12,
              fontFamily: "popinMedium",
            }}
            maxValue={10}
            xAxisColor="transparent"
            rulesColor="transparent"
            isAnimated
            barBorderRadius={6}
          />
        </View>
      </MotiView>

      <MotiView
        from={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "timing", duration: 500, delay: 300 }}
      >
        <View className="w-full bg-primary py-6 rounded-xl overflow-hidden">
          <Text className="text-lgb font-popinMedium ml-5 text-gray-700 dark:text-gray-200 mb-2">
            Time Spent
          </Text>
          <View className="items-center">
            <PieChart
              data={pieData}
              donut
              radius={100}
              innerRadius={50}
              innerCircleColor="#181A1C"
              isAnimated
              showText
              textColor="#fff"
              textSize={16}
            />
          </View>
        </View>
      </MotiView>
    </View>
  );
}
