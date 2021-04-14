//import React, {useState} from 'react';
import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { useFonts } from 'expo-font';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);

    const [loaded] = useFonts({
        "Kufam-SemiBoldItalic": require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        "Lato-Regular": require('../assets/fonts/Lato-Regular.ttf'),
    });
    if(!loaded)
        return null;

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/rn-social-logo.png")} />
            <Text style={styles.text}>RN  Social App</Text>

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

            <FormButton buttonTitle="Sign In"
                onPress={() => alert("Sign In clicked!")} />

            <TouchableOpacity style={styles.forgotButton} onPress={() => {}}>
                <Text style={styles.navButtonText}>Forgot password?</Text>
            </TouchableOpacity>

            <SocialButton
                buttonTitle="Sign in with Facebook"
                btnType="facebook"
                color="#4867aa"
                backgroundColor="#e6eaf4"
                onPress={() => {}} />
                
            <SocialButton
                buttonTitle="Sign in with Google"
                btnType="google"
                color="#de4d41"
                backgroundColor="#f5e7ea"
                onPress={() => {}} />

            <TouchableOpacity style={styles.forgotButton} onPress={() => navigation.navigate("Signup")}>
                <Text style={styles.navButtonText}>Don't have an account? Create here</Text>
            </TouchableOpacity>
        </View>
    );
};
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    logo:{
        height: 150,
        width: 150,
        resizeMode: "cover"
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
    forgotButton:{
        marginVertical: 35
    },
    navButtonText:{
        fontSize: 18,
        fontWeight: "500",
        color: "#2e64e5",
        fontFamily: 'Lato-Regular'
    }
});