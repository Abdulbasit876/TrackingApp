import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import CustomToggle from './CustomToggle'
const Switch_cards = ({title="Title"}) => {
    const [enabled, setEnabled] = useState(true);
  return (
    <View className="flex-row justify-between h-20 items-center bg-primary p-4 rounded-2xl mb-4">
                        <Text className="text-white font-popinMedium text-[20px]">{title}</Text>
                        <CustomToggle value={enabled} onChange={setEnabled} />
                    </View>
  )
}
export default Switch_cards