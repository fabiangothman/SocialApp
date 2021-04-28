import React, { useContext, useState } from 'react';
import {View, StyleSheet, Platform, Alert, ActivityIndicator, Text} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import {
    InputField,
    InputWrapper,
    AddImage,
    SubmitBtn,
    SubmitBtnText,
    StatusWrapper
} from '../styles/AddPost';
import * as ImagePicker from 'expo-image-picker';//'react-native-image-crop-picker';
import { useFonts } from 'expo-font';
import UploadToAnonymousFiles from "anonymous-files";
import { firebaseApp } from '../server/firebase';
import * as firebase from 'firebase';
import { AuthContext } from '../navigation/AuthProvider';

const AddPostScreen = () => {
    const { user, logout } = useContext(AuthContext);

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [post, setPost] = useState(null);
    const [loaded] = useFonts({
        "Lato-Bold": require('../assets/fonts/Lato-Regular.ttf')
    });
    if(!loaded)
        return null;

    const takePhotoFromCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== 'granted'){
                alert('Sorry, permission to access to media library is required, please accept it on your settings.');
                return;
            }
        }

        const pickerResult = await ImagePicker.launchCameraAsync();
        if(pickerResult.cancelled === true)
            return;

        if(Platform.OS === 'web'){
            const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
            setImage(remoteUri);
        }else{
            setImage(pickerResult.uri);
        }
    };

    let openImagePickerAsync = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted'){
                alert('Sorry, permission to access to media library is required, please accept it on your settings.');
                return;
            }
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        if(pickerResult.cancelled === true)
            return;

        if(Platform.OS === 'web'){
            const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
            setImage(remoteUri);
        }else{
            setImage(pickerResult.uri);
        }
    };

    const submitPost = async () => {
        const imageUrl = await uploadImage();

        //firebaseApp.firestore().collection('posts').doc('post_id').set({
        //firebaseApp.firestore().collection('posts').doc('post_id').collection('politica').add({
        firebaseApp.firestore().collection('posts').doc().set({
            userId: user.uid,
            post: post,
            postImg: imageUrl,
            postTime: firebase.firestore.FieldValue.serverTimestamp(),
            likes: null,
            comments: null
        }).then(() => {
            console.log('Post created!');
            Alert.alert(
                'Post created!',
                'Your post has been published successfully!'
            );
            setPost(null);
            setUploading(false);
        }).catch((error) => {
            console.log('Something went wrong with added post to firestore.', error);
        });
    }

    const uploadImage = async () => {
        if(image == null)
            return null;

        const uploadUri = image;
        let fileName = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        const extension = fileName.split('.').pop();
        const name = fileName.split('.').slice(0, -1).join('.');
        fileName = name + Date.now() + '.' + extension;

        setUploading(true);
        setTransferred(0);
        //Inicia la carga de la imagen
        const response = await fetch(uploadUri);
        const blob = await response.blob();
        //var ref = firebaseApp.storage().ref('photos/'+firebaseApp.auth().currentUser.uid+'/').child(fileName);
        var ref = firebaseApp.storage().ref(user.uid+'/posts/').child(fileName);
        var task = ref.put(blob);
        task.on('state_changed', taskSnapshot => {
            //console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
            setTransferred(
                Math.round(taskSnapshot.bytesTransferred/taskSnapshot.totalBytes*100)
            );
        });

        try{
            await task;
            const url = await ref.getDownloadURL();
            setImage(null);
            return url;
        }catch(e){
            console.log(e);
            return null;
        }
        
    }

    return (
        <View style={styles.container}>
            <InputWrapper>
                {image != null ? <AddImage source={{uri: image}} /> : null}

                <InputField placeholder="What's on your mind?"
                    multiline
                    numberOfLines={4}
                    value={post}
                    onChangeText={(content) => setPost(content)} />

                {uploading ? (
                    <StatusWrapper>
                        <Text>{transferred}% completed!</Text>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </StatusWrapper>
                ) : (
                    <SubmitBtn onPress={submitPost}>
                        <SubmitBtnText>Post</SubmitBtnText>
                    </SubmitBtn>
                )}
            </InputWrapper>

            <ActionButton buttonColor="rgba(231,76,60,1)">
                <ActionButton.Item buttonColor='#9b59b6' title="Take Photo" onPress={takePhotoFromCamera}>
                    <Icon name="camera-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item buttonColor='#3498db' title="Choose Photo" onPress={openImagePickerAsync}>
                    <Icon name="md-images-outline" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View>
    );
};
export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#f9fafd",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    actionButtonIcon:{
        fontSize: 20,
        height: 22,
        color: 'white'
    },
});