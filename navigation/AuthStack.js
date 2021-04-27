import React, {useEffect} from 'react';
//import React, {useEffect, useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import AsyncStorage from '@react-native-community/async-storage';
import { View, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import * as AppAuth from 'expo-app-auth';
//import * as GoogleSignIn from 'expo-google-sign-in';

const Stack = createStackNavigator();

const AuthStack = () => {
    const [isFirstLaunch, setIsFirstLaunch] = React.useState(null);
    let routeName;

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
        if(value == null){
            AsyncStorage.setItem('alreadyLaunched', 'true');
            setIsFirstLaunch(true);
        }else{
            setIsFirstLaunch(false);
        }
        });

    }, []);
    
    if(isFirstLaunch === null){
        return null;
    }else if (isFirstLaunch === true){
        routeName = 'Onboarding';
    }else{
        routeName = 'Login';
    }

    return (
        <Stack.Navigator styles={styles.baseStyle} initialRouteName={routeName}>
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Onboarding"
                component={OnboardingScreen}
                options={{header: () => null}}
            />
            <Stack.Screen
                name="Signup"
                component={SignupScreen}
                options={({navigation}) => ({
                    title: "",
                    headerStyle: {
                        backgroundColor: "#f9fafd",
                        shadowColor: "f9fafd",
                        elevation: 0
                    },
                    headerLeft: () => (
                        <View>
                            <FontAwesome.Button
                            name="long-arrow-left"
                            size={25}
                            backgroundColor="#f9fafd"
                            color="#333"
                            onPress={() => navigation.navigate("Login")} />
                        </View>
                    )
                })}
            />
        </Stack.Navigator>
    );
};
export default AuthStack;

const styles = StyleSheet.create({
    baseStyle: {
        borderWidth: 5,
        borderColor: "#ff0000",
        backgroundColor: "#808080"
    }
});