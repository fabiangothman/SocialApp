import React, {useContext} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

import FormButton from '../components/FormButton';

const ChatScreen = () => {
    const {user, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Chat Screen</Text>
            <Button title="Click Here" onPress={() => alert("Button Clickeds")} />
        </View>
    );
};
export default ChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text:{
        fontSize: 20,
        color: "#333",
    },
});