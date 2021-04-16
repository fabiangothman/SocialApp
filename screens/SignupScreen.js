//import React, {useState} from 'react';
import React, { useContext } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useFonts } from 'expo-font';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import SocialButton from '../components/SocialButton';
import { AuthContext } from '../navigation/AuthProvider';

const SignupScreen = ({navigation}) => {
    const [email, setEmail] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [confirmPassword, setConfirmPassword] = React.useState(null);
    const [loginData, setLoginData] = React.useState({
        isValidEmail : true,
        isValidPassword: true,
        isValidConfirmPassword: true
    });

    const {register} = useContext(AuthContext);

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
    const handleValidConfirmPassword = (val) => {
        if(val.trim() == password)
            setLoginData({
                ...loginData,
                isValidConfirmPassword: true,
            });
        else
            setLoginData({
                ...loginData,
                isValidConfirmPassword: false,
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create an account</Text>

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
            { loginData.isValidConfirmPassword ? null :
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>Password don't match</Text>
            </Animatable.View> }
            <FormInput 
                labelValue={confirmPassword}
                onChangeText={(userPassword) => setConfirmPassword(userPassword)}
                onEndEditing={(e) => handleValidConfirmPassword(e.nativeEvent.text)}
                placeholderText="Confirm password"
                iconType="lock"
                secureTextEntry={true} />

            <FormButton buttonTitle="Sign Up"
                onPress={() => {
                    if((email!==null) && loginData.isValidEmail &&
                        (password!==null) && loginData.isValidPassword &&
                        (confirmPassword!==null) && loginData.isValidConfirmPassword)
                        register(email, password)
                    else
                        alert("You need to fill all fields first.");
                }
            } />

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
    errorMsg:{
        fontSize: 15,
        marginBottom: 0,
        color: "#ff0000"
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