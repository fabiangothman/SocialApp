import React from 'react';
import {View, Text, Button, Image, StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => {
    return (
        <Button title='Skip' color="#000000" />
    );
};
const Next = ({...props}) => {
    return (
        <Button title='Next' color="#000000" {...props} />
    );
};
const Done = ({...props}) => {
    return (
        <TouchableOpacity style={{marginHorizontal:10}} {...props}>
            <Text style={{fontSize:16}}>Done</Text>
        </TouchableOpacity>
    );
};
const Dots = ({selected}) => {
    let backgroundColor;
    backgroundColor= selected ? "rgba(0, 0, 0, 0.8)": "rgba(0, 0, 0, 0.3)";
    return (
        <View style={{
            width:5,
            height:5,
            marginHorizontal:3,
            backgroundColor
        }} />
    );
};

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            DotComponent={Dots}
            //onSkip={() => navigation.navigate("Login")}
            onSkip={() => navigation.replace("Login")}
            onDone={() => navigation.navigate("Login")}
            pages={[
                {
                    backgroundColor: '#a6e4d0',
                    image: <Image source={require('../assets/onboarding-img1.png')} />,
                    title: 'Connect to the world',
                    subtitle: 'A new way to connect with the world',
                },
                {
                    backgroundColor: '#fdeb93',
                    image: <Image source={require('../assets/onboarding-img2.png')} />,
                    title: 'Share your favorites',
                    subtitle: 'Share your thoughts with similar kind of people',
                },
                
                {
                    backgroundColor: '#e9bcbe',
                    image: <Image source={require('../assets/onboarding-img3.png')} />,
                    title: 'Become the star',
                    subtitle: 'Let the spot light capture you',
                }
            ]}
        />
    );
};
export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});