import React, {useEffect, useContext, useState} from 'react';
import {View, Image, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { AuthContext } from '../navigation/AuthProvider';

import FormButton from '../components/FormButton';
import PostCard from '../components/PostCard';
import { firebaseApp } from '../server/firebase';

const ProfileScreen = ({navigation, route}) => {
    const {user, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    const [loadContent, setLoadContent] = useState(true);
    const [userData, setUserData] = useState(null);

    const fetchPosts = async() => {
        const dynamicUser = route.params ? route.params.userId : user.uid;
        try{
            const list = [];
            await firebaseApp.firestore().collection('posts')
            .where('userId', '==', dynamicUser).orderBy('postTime', 'desc').get().then((querySnapshot) => {
                //console.log('Total posts: ', querySnapshot.size);
                querySnapshot.forEach((doc) => {
                    const {userId, post, postImg, postTime, likes, comments} = doc.data();
                    list.push({
                        id: doc.id,
                        userId,
                        userName: 'Test name',
                        userImg: 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png',
                        postTime: postTime,
                        post,
                        postImg,
                        liked: false,
                        likes,
                        comments
                    });
                });
            });
            setPosts(list);
            if(loading)
                setLoading(false);

            //console.log(list);
        }catch(e){
            console.log(e);
        }
    }

    const getUser = async() => {
        const dynamicUser = route.params ? route.params.userId : user.uid;
        await firebaseApp.firestore().collection('users').doc(dynamicUser).get().then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
    }

    /*First screen load
        if detects ction on home, reloads too
    */
    useEffect(() => {
        getUser();
        fetchPosts();
        navigation.addListener("focus", () => setLoadContent(!loadContent));
    }, [loadContent, navigation]);

    const handleDelete = () => {
        //
    }

    return (
        <SafeAreaView style={{flex:1, backgroundColor: '#fff'}}>
            <ScrollView style={styles.container}
                contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}}
                showsVerticalScrollIndicator={false}>
                <Image style={styles.userImg} source={{uri: userData ? userData.userImg || 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png' : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'}} />
                <Text style={styles.userName}>{userData ? userData.fname : 'No'} {userData ? userData.lname : 'data'}</Text>
                {/*<Text>{route.params ? route.params.userId: user.uid}</Text>*/}
                <Text style={styles.aboutUser}>{userData ? userData.about : 'No description available'}</Text>
                <View style={styles.userBtnWrapper}>
                    {route.params ? (
                        <>
                        <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                            <Text style={styles.userBtnTxt}>Message</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                            <Text style={styles.userBtnTxt}>Follow</Text>
                        </TouchableOpacity>
                        </>
                    ) : (
                        <>
                        <TouchableOpacity style={styles.userBtn} onPress={() => navigation.navigate('EditProfile')}>
                            <Text style={styles.userBtnTxt}>Edit</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.userBtn} onPress={() => logout()}>
                            <Text style={styles.userBtnTxt}>Logout</Text>
                        </TouchableOpacity>
                        </>
                    )}
                    
                </View>

                <View style={styles.userInfoWrapper}>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>{posts.length}</Text>
                        <Text style={styles.userInfoSubTitle}>Posts</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>10,000</Text>
                        <Text style={styles.userInfoSubTitle}>Followers</Text>
                    </View>
                    <View style={styles.userInfoItem}>
                        <Text style={styles.userInfoTitle}>100</Text>
                        <Text style={styles.userInfoSubTitle}>Following</Text>
                    </View>
                </View>

                {posts.map((item) => (
                    <PostCard key={item.id} item={item} onDelete={handleDelete} />
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    userImg: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
    },
    aboutUser: {
        fontSize: 12,
        fontWeight: '600',
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    userBtnWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        marginBottom: 10,
    },
    userBtn: {
        borderColor: '#2e64e5',
        borderWidth: 2,
        borderRadius: 3,
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
    },
    userBtnTxt: {
        color: '#2e64e5',
    },
    userInfoWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginVertical: 20,
    },
    userInfoItem: {
        justifyContent: 'center',
    },
    userInfoTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    userInfoSubTitle: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});