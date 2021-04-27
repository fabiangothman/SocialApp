//import * as firebase from 'firebase';
//import 'firebase/auth';
//import 'firebase/firestore';
import firebase from "firebase/app";

import { Platform } from 'react-native';

let firebaseConfig = null;
if(Platform.OS == 'android')
    firebaseConfig = {
        apiKey: "AIzaSyBY7jaLmFHjawRtOMxrRylin5pAzCaaNjE",
        authDomain: "socialapp-ea282.firebaseapp.com",
        projectId: "socialapp-ea282",
        storageBucket: "socialapp-ea282.appspot.com",
        messagingSenderId: "826391558870",
        appId: "1:826391558870:android:014f621e2e1b727a1be777",
        measurementId: "G-5Z5CBQ1CXT"
    };
else if(Platform.OS == 'ios')
    firebaseConfig = {
        apiKey: "AIzaSyBbPltHKJwYhV3i8wic3CUs5V1pf4lY_tw",
        authDomain: "socialapp-ea282.firebaseapp.com",
        projectId: "socialapp-ea282",
        storageBucket: "socialapp-ea282.appspot.com",
        messagingSenderId: "826391558870",
        appId: "1:826391558870:ios:451a513804a417c81be777",
        measurementId: "G-5Z5CBQ1CXT"
    };
else
    firebaseConfig = {
        apiKey: "AIzaSyC-zlyZxBFFu_ZRxei6xadNklncH8Frptw",
        authDomain: "socialapp-ea282.firebaseapp.com",
        projectId: "socialapp-ea282",
        storageBucket: "socialapp-ea282.appspot.com",
        messagingSenderId: "826391558870",
        appId: "1:826391558870:web:8294fa322694e9621be777",
        measurementId: "G-5Z5CBQ1CXT"
    };

/*  Analytics:
    Not supported on NodeJS/ReactNative */
//firebase.analytics();

export const firebaseApp = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
//export default firebase;
//export const firebaseStorage = firebase.storage();
//export const Auth = firebaseApp.auth();
//export const Storage = firebaseApp.firestore();