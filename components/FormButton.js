import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';
//import { useFonts } from 'expo-font';

const FormButton = ({buttonTitle, ...props}) => {
    /*const [loaded] = useFonts({
        "Lato-Regular": require('../assets/fonts/Lato-Regular.ttf'),
    });
    if(!loaded)
        return null;*/

    return (
        <TouchableOpacity style={styles.buttonContainer} {...props}>
            <Text style={styles.buttonText}>{buttonTitle}</Text>
        </TouchableOpacity>
    );
};
export default FormButton;

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop:10,
        width:'100%',
        height: windowHeight/15,
        backgroundColor: "#2e64e5",
        padding:10,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:3
    },
    buttonText:{
        fontSize:18,
        fontWeight: "bold",
        color: "#ffffff",
        fontFamily: "Lato-Regular"
    }
});