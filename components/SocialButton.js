import React from 'react';
import {Text, TouchableOpacity, StyleSheet, View} from 'react-native';
import {windowWidth, windowHeight} from '../utils/Dimentions';
import { useFonts } from 'expo-font';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({buttonTitle, btnType, color, backgroundColor, ...props}) => {
    let bgColor = backgroundColor;
    const [loaded] = useFonts({
        "Lato-Regular": require('../assets/fonts/Lato-Regular.ttf'),
    });
    if(!loaded)
        return null;

    return (
        <TouchableOpacity style={[styles.buttonContainer, {backgroundColor: bgColor}]} {...props}>
            <View style={styles.iconWrapper}>
                <FontAwesome style={styles.icon} name={btnType} size={22} color={color} />
            </View>
            <View style={styles.btnTxtWrapper}>
                <Text style={[styles.buttonText, {color: color}]}>{buttonTitle}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default SocialButton;

const styles = StyleSheet.create({
    buttonContainer:{
        marginTop: 10,
        width: '100%',
        height: windowHeight/15,
        padding: 10,
        flexDirection: "row",
        borderRadius: 3
    },
    iconWrapper:{
        width: 30,
        justifyContent: "center",
        alignItems: "center"
    },
    icon:{
        fontWeight: "bold"
    },
    btnTxtWrapper:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText:{
        fontSize:18,
        fontWeight: "bold",
        fontFamily: "Lato-Regular"
    }
});