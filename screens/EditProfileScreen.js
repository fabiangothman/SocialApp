import React, {useEffect, useContext, useState} from 'react';
import { View, Text, TouchableOpacity, ImageBackground, TextInput, StyleSheet, Alert} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FormButton from '../components/FormButton';

import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import * as ImagePicker from 'expo-image-picker';//'react-native-image-crop-picker';

import { AuthContext } from '../navigation/AuthProvider';
import { firebaseApp } from '../server/firebase';

const EditProfileScreen = () => {
    const {user, logout} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transferred, setTransferred] = useState(0);
    const [userData, setUserData] = useState(null);
    
    const getUser = async() => {
        const currentUser = await firebaseApp.firestore().collection('users').doc(user.uid).get().then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
    }
  
    const handleUpdate = async() => {
        let imgUrl = await uploadImage();

        if(imgUrl == null && userData.userImg)
            imgUrl = userData.userImg;
            
        firebaseApp.firestore().collection('users').doc(user.uid).update({
            fname: userData.fname,
            lname: userData.lname,
            about: userData.about,
            phone: userData.phone,
            country: userData.country,
            city: userData.city,
            userImg: imgUrl,
        }).then(() => {
            console.log('User Updated!');
            Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
            );
        })
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
        var ref = firebaseApp.storage().ref(user.uid+'/photos/').child(fileName);
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
    useEffect(() => {
        getUser();
    }, []);

    const takePhotoFromCamera = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if(status !== 'granted'){
                alert('Sorry, permission to access to media library is required, please accept it on your settings.');
                return;
            }
        }

        const pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            quality: 0.2,
            aspect: [4, 3]
        });
        if(pickerResult.cancelled === true)
            return;

        if(Platform.OS === 'web'){
            const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
            setImage(remoteUri);
        }else{
            setImage(pickerResult.uri);
        }
        this.bs.current.snapTo(1);
    };

    let choosePhotoFromLibrary = async () => {
        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status !== 'granted'){
                alert('Sorry, permission to access to media library is required, please accept it on your settings.');
                return;
            }
        }

        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.2,
            aspect: [4, 3]
        });
        if(pickerResult.cancelled === true)
            return;

        if(Platform.OS === 'web'){
            const remoteUri = await UploadToAnonymousFiles(pickerResult.uri);
            setImage(remoteUri);
        }else{
            setImage(pickerResult.uri);
        }
        this.bs.current.snapTo(1);
    };
  
    renderInner = () => (
      <View style={styles.panel}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.panelTitle}>Upload Photo</Text>
          <Text style={styles.panelSubtitle}>Choose Your Profile Picture</Text>
        </View>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={takePhotoFromCamera}>
          <Text style={styles.panelButtonTitle}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={choosePhotoFromLibrary}>
          <Text style={styles.panelButtonTitle}>Choose From Library</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.panelButton}
          onPress={() => this.bs.current.snapTo(1)}>
          <Text style={styles.panelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  
    renderHeader = () => (
      <View style={styles.header}>
        <View style={styles.panelHeader}>
          <View style={styles.panelHandle} />
        </View>
      </View>
    );
  
    bs = React.createRef();
    fall = new Animated.Value(1);
  
    return (
      <View style={styles.container}>
        <BottomSheet
          ref={this.bs}
          snapPoints={[330, -5]}
          renderContent={this.renderInner}
          renderHeader={this.renderHeader}
          initialSnap={1}
          callbackNode={this.fall}
          enabledGestureInteraction={true}
          enabledContentGestureInteraction={false}
        />
        <Animated.View
          style={{
            margin: 20,
            opacity: Animated.add(0.1, Animated.multiply(this.fall, 1.0)),
          }}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={() => this.bs.current.snapTo(0)}>
              <View
                style={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ImageBackground
                  source={{
                    uri: image
                      ? image
                      : userData
                      ? userData.userImg ||
                        'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
                      : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 15}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
            </TouchableOpacity>
            <Text style={{marginTop: 10, fontSize: 18, fontWeight: 'bold'}}>
              {userData ? userData.fname : ''} {userData ? userData.lname : ''}
            </Text>
            {/* <Text>{user.uid}</Text> */}
          </View>
  
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#333333" size={20} />
            <TextInput
              placeholder="First Name"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.fname : ''}
              onChangeText={(txt) => setUserData({...userData, fname: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <FontAwesome name="user-o" color="#333333" size={20} />
            <TextInput
              placeholder="Last Name"
              placeholderTextColor="#666666"
              value={userData ? userData.lname : ''}
              onChangeText={(txt) => setUserData({...userData, lname: txt})}
              autoCorrect={false}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <Ionicons name="ios-clipboard-outline" color="#333333" size={20} />
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="About Me"
              placeholderTextColor="#666666"
              value={userData ? userData.about : ''}
              onChangeText={(txt) => setUserData({...userData, about: txt})}
              autoCorrect={true}
              style={[styles.textInput, {height: 40}]}
            />
          </View>
          <View style={styles.action}>
            <Feather name="phone" color="#333333" size={20} />
            <TextInput
              placeholder="Phone"
              placeholderTextColor="#666666"
              keyboardType="number-pad"
              autoCorrect={false}
              value={userData ? userData.phone : ''}
              onChangeText={(txt) => setUserData({...userData, phone: txt})}
              style={styles.textInput}
            />
          </View>
  
          <View style={styles.action}>
            <FontAwesome name="globe" color="#333333" size={20} />
            <TextInput
              placeholder="Country"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.country : ''}
              onChangeText={(txt) => setUserData({...userData, country: txt})}
              style={styles.textInput}
            />
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
              name="map-marker-outline"
              color="#333333"
              size={20}
            />
            <TextInput
              placeholder="City"
              placeholderTextColor="#666666"
              autoCorrect={false}
              value={userData ? userData.city : ''}
              onChangeText={(txt) => setUserData({...userData, city: txt})}
              style={styles.textInput}
            />
          </View>
          <FormButton buttonTitle="Update" onPress={handleUpdate} />
        </Animated.View>
      </View>
    );
};
  
export default EditProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    commandButton: {
        padding: 15,
        borderRadius: 10,
        backgroundColor: '#FF6347',
        alignItems: 'center',
        marginTop: 10,
    },
    panel: {
        padding: 20,
        backgroundColor: '#FFFFFF',
        paddingTop: 20,
        width: '100%',
    },
    header: {
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
    panelTitle: {
        fontSize: 27,
        height: 35,
    },
    panelSubtitle: {
        fontSize: 14,
        color: 'gray',
        height: 30,
        marginBottom: 10,
    },
    panelButton: {
        padding: 13,
        borderRadius: 10,
        backgroundColor: '#2e64e5',
        alignItems: 'center',
        marginVertical: 7,
    },
    panelButtonTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: 'white',
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5,
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5,
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#333333',
    },
  });