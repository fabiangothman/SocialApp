import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Alert } from 'react-native';
import { ViewContainer } from '../styles/FeedStyles';
import PostCard from '../components/PostCard';
import { firebaseApp } from '../server/firebase';

const Posts = [
    {
        id: '1',
        userName: 'Jenny Doe',
        userImg: require('../assets/users/user-3.jpg'),
        postTime: '4 mins ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-3.jpg'),
        liked: true,
        likes: '14',
        comments: '5'
    },
    {
        id: '2',
        userName: 'John Doe',
        userImg: require('../assets/users/user-1.jpg'),
        postTime: '2 hours ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '8',
        comments: '0'
    },
    {
        id: '3',
        userName: 'Ken William',
        userImg: require('../assets/users/user-4.jpg'),
        postTime: '1 hours ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-2.jpg'),
        liked: true,
        likes: '1',
        comments: '0'
    },
    {
        id: '4',
        userName: 'Selina Paul',
        userImg: require('../assets/users/user-6.jpg'),
        postTime: '1 day ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: require('../assets/posts/post-img-4.jpg'),
        liked: true,
        likes: '22',
        comments: '4'
    },
    {
        id: '5',
        userName: 'Christy Alex',
        userImg: require('../assets/users/user-7.jpg'),
        postTime: '2 days ago',
        post: 'Hey there, this is my test for a post of my social app in React Native.',
        postImg: 'none',
        liked: false,
        likes: '0',
        comments: '0'
    },
  ];

const HomeScreen = ({ navigation }) => {
    const [posts, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadContent, setLoadContent] = useState(true);
    const [deleted, setDeleted] = useState(false);

    const fetchPosts = async() => {
        try{
            const list = [];
            await firebaseApp.firestore().collection('posts').orderBy('postTime', 'desc').get().then((querySnapshot) => {
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

    /*First screen load
        if detects ction on home, reloads too
    */
    useEffect(() => {
        fetchPosts();
        navigation.addListener("focus", () => setLoadContent(!loadContent));
    }, [loadContent, navigation]);

    //Activates when the state "deleted" changes
    useEffect(() => {
        fetchPosts();
        setDeleted(false);
    }, [deleted]);

    const handleDelete = (postId) => {
        Alert.alert(
            'Delete post',
            'Are you sure?',
            [{
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'Confirm',
              onPress: () => deletePost(postId),
            }],
            {cancelable: false},
        );
    }

    const deletePost = (postId) => {
        firebaseApp.firestore().collection('posts').doc(postId).get().then((documentSnapshot) => {
            if(documentSnapshot.exists){
                const {postImg} = documentSnapshot.data();

                //If image exists on firestore, then delete it on storage too. Else just delete the firestore
                if(postImg != null){
                    const storageRef = firebaseApp.storage().refFromURL(postImg);
                    const imageRef = firebaseApp.storage().ref(storageRef.fullPath);

                    imageRef.delete().then(() => {
                        console.log(`${postImg} has been deleted successfully!`);
                        deleteFirestoreData(postId);
                    }).catch((e) => {
                        console.log('Error while deleting the image. ', e);
                    });
                }else{
                    deleteFirestoreData(postId);
                }
            }
        });
    }

    const deleteFirestoreData = (postId) => {
        firebaseApp.firestore().collection('posts').doc(postId).delete().then(() => {
            Alert.alert(
              'Post deleted!',
              'Your post has been deleted successfully!',
            );
            setDeleted(true);
          })
          .catch((e) => console.log('Error deleting posst.', e));
    };

    const ListHeader = () => {
        return null;
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <ViewContainer>
                <FlatList style={{width:'100%'}}
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <PostCard item={item} onDelete={handleDelete} /> }
                    ListHeaderComponent={ListHeader}
                    ListFooterComponent={ListHeader}
                    showsVerticalScrollIndicator={false} />
            </ViewContainer>
        </SafeAreaView>
    );
};
export default HomeScreen;