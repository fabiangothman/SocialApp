//import React, {useState} from 'react';
import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [loginData, setLoginData] = React.useState({
        isValidEmail : true,
        isValidPassword: true
    });

    const {login} = useContext(AuthContext);

    const [loaded] = useFonts({
        "Kufam-SemiBoldItalic": require('../assets/fonts/Kufam-SemiBoldItalic.ttf'),
        "Lato-Regular": require('../assets/fonts/Lato-Regular.ttf'),
    });
    if(!loaded)
        return null;

    const handleValidEmail = (val) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(val))
            setLoginData({
                ...loginData,
                isValidEmail: true,
            });
        else
            setLoginData({
                ...loginData,
                isValidEmail: false,
            });
    }
    const handleValidPassword = (val) => {
        if(val.trim().length >= 6)
            setLoginData({
                ...loginData,
                isValidPassword: true,
            });
        else
            setLoginData({
                ...loginData,
                isValidPassword: false,
            });
    }

    return (
        <View style={styles.container}>
            <Image style={styles.logo} source={require("../assets/rn-social-logo.png")} />
            <Text style={styles.text}>RN  Social App</Text>
            
            { loginData.isValidEmail ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Invalid email format</Text>
            </Animatable.View> }
            <FormInput 
                labelValue={email}
                onChangeText={(userEmail) => setEmail(userEmail)}
                onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                placeholderText="Email"
                iconType="user"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false} />
            
            { loginData.isValidPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password must be at least 6 character long</Text>
            </Animatable.View> }
            <FormInput 
                labelValue={password}
                onChangeText={(userPassword) => setPassword(userPassword)}
                onEndEditing={(e) => handleValidPassword(e.nativeEvent.text)}
                placeholderText="Password"
                iconType="lock"
                secureTextEntry={true} />

            <FormButton buttonTitle="Sign In"
                onPress={() => {
                    if((email!==null) && loginData.isValidEmail &&
                        (password!==null) && loginData.isValidPassword)
                        login(email, password)
                    else
                        alert("You need to fill all fields first.");
                }
            } />

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
    errorMsg:{
        fontSize: 15,
        marginBottom: 0,
        color: "#ff0000"
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