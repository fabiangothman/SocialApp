import React from 'react';
import {View, StyleSheet} from 'react-native';
import { InputField, InputWrapper } from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons'

const AddPostScreen = () => {
    return (
        <View style={styles.container}>
            <InputWrapper>
                <InputField placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4} />
            </InputWrapper>

            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={() => console.log("notes tapped!")}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Take Photo" onPress={() => {}}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};
export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    actionButtonIcon:{
        fontSize: 20,
        height: 22,
        color: 'white'
    },
});