import React, { createContext, useState } from 'react';
import { firebaseApp } from '../server/firebase';
import * as GoogleSignIn from 'expo-google-sign-in';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    //alert(`Estado inicial del usuario: ${user}`);
    const [user, setUser] = useState(null);
    
    _syncUserWithStateAsync = async () => {
        const user = await GoogleSignIn.signInSilentlyAsync();
        setUser({ user });
    };
    
    /*signOutAsync = async () => {
        await GoogleSignIn.signOutAsync();
        setUser({ user: null });
    };*/
    signInAsync = async () => {
        try {
            await GoogleSignIn.askForPlayServicesAsync();
            const { type, user } = await GoogleSignIn.signInAsync();
            if (type === 'success') {
                //alert(`uid: ${user.uid}`);
                //alert(`email: ${user.email}`);
                //this._syncUserWithStateAsync();
                setUser(user);
            }
        } catch ({ message }) {
          //alert('login: Error:' + message);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login: async(email, password) => {
                try{
                    await firebaseApp.auth().signInWithEmailAndPassword(email, password);
                }catch(e){
                    console.log("Error when tried to login: ");
                    console.log(e);alert(e);
                }
            },
            register: async(email, password) => {
                try{
                    await firebaseApp.auth().createUserWithEmailAndPassword(email, password);
                }catch(e){
                    console.log("Error when tried to register: ");
                    console.log(e);alert(e);
                }
            },
            logout: async(email, password) => {
                try{
                    await firebaseApp.auth().signOut();
                    //await GoogleSignIn.signOutAsync();
                }catch(e){
                    console.log("Error when tried to logout: ");
                    console.log(e);
                }
            },
            googleLogin: async () => { 
                /*try {
                    GoogleSignIn.initAsync({
                        //sclientId: 'my-clientid',
                    });
                    signInAsync();
                } catch (e) {
                    console.log(e);alert(e);
                }*/
            },
            facebookLogin: async () => {
                //
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}