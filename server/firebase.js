import * as firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyC-zlyZxBFFu_ZRxei6xadNklncH8Frptw",
    authDomain: "socialapp-ea282.firebaseapp.com",
    projectId: "socialapp-ea282",
    storageBucket: "socialapp-ea282.appspot.com",
    messagingSenderId: "826391558870",
    appId: "1:826391558870:web:8294fa322694e9621be777",
    measurementId: "G-5Z5CBQ1CXT"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

/*  Analytics:
    Not supported on NodeJS/ReactNative */
//firebase.analytics();

export const Auth = firebase.auth();

export default firebaseApp;