import React, { createContext, useState } from 'react';
//import Auth from '@react-native-firebase/auth';
import firebaseApp, { Auth } from '../server/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            login: async(email, password) => {
                try{
                    await Auth.signInWithEmailAndPassword(email, password);
                }catch(e){
                    console.log("Error when tried to login: ");
                    console.log(e);alert(e);
                }
            },
            register: async(email, password) => {
                try{
                    await Auth.createUserWithEmailAndPassword(email, password);
                }catch(e){
                    console.log("Error when tried to register: ");
                    console.log(e);alert(e);
                }
            },
            logout: async(email, password) => {
                try{
                    await Auth.signOut();
                }catch(e){
                    console.log("Error when tried to logout: ");
                    console.log(e);alert(e);
                }
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}