//import liraries
import { StyleSheet, Text, View } from 'react-native';

// create a component
const login = () => {
    return (
        <View style={styles.container}>
            <Text>login</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default login;
