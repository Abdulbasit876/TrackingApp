import { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import HeaderWithBack from "../components/HeaderWithBack";
import { MotiView } from "moti";
import Switch_cards from "../components/Switch_cards";

export default function SettingsScreen() {
    const router = useRouter();
    const [darkMode, setDarkMode] = useState(true);
    const [notifications, setNotifications] = useState(true);
    const [cloudBackup, setCloudBackup] = useState(true);
    const [exportType, setExportType] = useState("PDF");

    return (

        <View className="flex-1 bg-dark p-6">
            <MotiView
                from={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{
                    type: "timing",
                    duration: 100,
                }}
                style={{ flex: 1 }}
            >
                <HeaderWithBack />
                <Text className="text-white text-[40px] font-popinMedium font-bold mb-8">
                    Settings
                </Text>
                <Switch_cards title="Dark Mode" />
                <Switch_cards title="Cloud Backup" />
                <Switch_cards title="Notification" storageKey="notificationsEnabled"/>
                <View className="bg-primary p-4 rounded-2xl mb-4">
                    <Text className="text-white font-popinMedium text-[18px] mb-3">Export Data</Text>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className={`flex-1 px-4 py-2 rounded-xl mr-2 ${exportType === "PDF" ? "bg-secondary" : "bg-dark"
                                }`}
                            onPress={() => setExportType("PDF")}
                        >
                            <Text className="text-white font-popinMedium text-center">PDF</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className={`flex-1 px-4 py-2 rounded-xl ml-2 ${exportType === "CSV" ? "bg-secondary" : "bg-dark"
                                }`}
                            onPress={() => setExportType("CSV")}
                        >
                            <Text className="text-white font-popinMedium text-center">CSV</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </MotiView>

        </View>

    );
}
