import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
//import firebaseApp, { Auth } from '../server/firebase';
import { AuthContext } from '../navigation/AuthProvider';

import FormButton from '../components/FormButton';

const ProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {user.uid}</Text>
            <FormButton buttonTitle='Logout' onPress={() => logout()} />
        </View>
    );
};
export default ProfileScreen;

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