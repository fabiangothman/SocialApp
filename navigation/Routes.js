import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
//import Auth from '@react-native-firebase/auth';
import firebaseApp, { Auth } from '../server/firebase';
import {AuthContext} from './AuthProvider';
import * as GoogleSignIn from 'expo-google-sign-in';

import AuthStack from './AuthStack';
import AppStack from './AppStack';

const Routes = () => {
    const {user, setUser} = useContext(AuthContext);
    const [initializing, setInitializing] = useState(true);
    
    const onAuthStateChanged = (user) => {
        alert(`Cambió el estado de Auth, cambiando state de Routes, user: ${user}`);
        setUser(user);
        if(initializing)
            setInitializing(false);
    }

    useEffect(() => {
        try{
            const subscriber = Auth.onAuthStateChanged(onAuthStateChanged);            
            const {gUser} = GoogleSignIn.getCurrentUser();
            if(gUser)
                setUser(gUser);
            return subscriber;   //Unsubscribe on unmount
        }catch(e){
            console.log("Error when tried to refresh state onAuthStateChanged: ");
            console.log(e);
        }
    }, []);

    if(initializing)
        return null;

    return (
        <NavigationContainer>
            { user ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};
export default Routes;