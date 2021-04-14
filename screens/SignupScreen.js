//import React, {useState} from 'react';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);

    const [loaded] = useFonts({
        "Kufam-SemiBoldItalic": require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        "Lato-Regular": require('../assets/fonts/Lato-Regular.ttf'),
    });
    if(!loaded)
        return null;

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

            <FormInput 
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false} />
            
            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true} />
            <FormInput 
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                placeholderText="Confirm password"
                iconType="lock"
                secureTextEntry={true} />

            <FormButton buttonTitle="Sign Up"
                onPress={() => alert("Sign Up clicked!")} />

            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>By registering, you confirm that you accept our </Text>
                <TouchableOpacity onPress={() => alert("Terms clicked!")}>
                    <Text style={[styles.color_textPrivate, {color: "#e88832"}]}>Terms of service</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}> and </Text>
                <TouchableOpacity onPress={() => alert("Policy clicked!")}>
                    <Text style={[styles.color_textPrivate, {color: "#e88832"}]}>Privacy policy</Text>
                </TouchableOpacity>
                <Text style={styles.color_textPrivate}>.</Text>
            </View>

            <SocialButton
                buttonTitle="Sign up with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {}} />
                
            <SocialButton
                buttonTitle="Sign up with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {}} />

            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.navButtonText}>Already have an account? Sign in here</Text>
            </TouchableOpacity>
        </View>
    );
};
export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    text:{
        fontFamily: 'Kufam-SemiBoldItalic',
        fontSize: 28,
        marginBottom: 10,
        color: "#051d5f",
    },
    navButton: {
        marginTop: 15
    },
    navButtonText:{
        fontSize: 18,
        fontWeight: "500",
        color: "#2e64e5",
        fontFamily: 'Lato-Regular'
    },
    textPrivate:{
        flexDirection: "row",
        flexWrap: "wrap",
        marginVertical: 35,
        justifyContent: "center"
    },
    color_textPrivate: {
        fontSize: 13,
        fontWeight: "400",
        fontFamily: "Lato-Regular",
        color: "grey"
    }
});