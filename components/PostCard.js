import React, {useContext, useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    CardContainer,
    UserImg,
    UserInfo,
    UserInfoText,
    UserName,
    PostTime,
    PostText,
    PostImg,
    InteractionWrapper,
    Interaction,
    InteractionText,
    Divider
} from '../styles/FeedStyles';
import { AuthContext } from '../navigation/AuthProvider';
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { firebaseApp } from '../server/firebase';

const PostCard = ({item, onDelete, onPress}) => {
    const { user, logout } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    let likeIcon = item.liked ? 'heart' : 'heart-outline';
    let likeIconColor = item.liked ? '#2e64e5' : '#333';
    let likeText = "";

    if(item.likes == 1)
        likeText = '1 Like';
    else if(item.likes > 1)
        likeText = item.likes+' Likes';
    else
        likeText = 'Like';

    if(item.comments == 1)
        commentText = '1 Comment';
    else if(item.comments > 1)
        commentText = item.comments+' Comments';
    else
        commentText = 'Comment';

    const getUser = async() => {
        await firebaseApp.firestore().collection('users').doc(item.userId).get().then((documentSnapshot) => {
            if( documentSnapshot.exists ) {
                console.log('User Data', documentSnapshot.data());
                setUserData(documentSnapshot.data());
            }
        })
    }

    useEffect(() => {
        getUser();
    }, []);

    return(
        <CardContainer>
            <UserInfo>
                <TouchableOpacity onPress={onPress}>
                    <UserImg source={{uri: userData ? userData.userImg || 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png' : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'}} />
                </TouchableOpacity>
                <UserInfoText>
                    <TouchableOpacity onPress={onPress}>
                        <UserName>{userData ? userData.fname || 'No' : 'No'} {userData ? userData.lname || 'data' : 'data'}</UserName>
                        <PostTime>{moment(item.postTime.toDate()).fromNow()}</PostTime>
                    </TouchableOpacity>
                </UserInfoText>
            </UserInfo>
            <PostText>{item.post}</PostText>
            {item.postImg != null ? <PostImg source={{uri: item.postImg}}/> : <Divider />}
            <InteractionWrapper>
                <Interaction active={item.liked}>
                    <Ionicons name={likeIcon} size={25} color={likeIconColor} />
                    <InteractionText active={item.liked}>{likeText}</InteractionText>
                </Interaction>
                <Interaction>
                    <Ionicons name="md-chatbubble-outline" size={25} />
                    <InteractionText>{commentText}</InteractionText>
                </Interaction>
                {user.uid == item.userId ? (
                    <Interaction onPress={() => onDelete(item.id)}>
                        <Ionicons name="md-trash-bin" size={25} />
                    </Interaction>
                ): null }
            </InteractionWrapper>
        </CardContainer>
    );
}
export default PostCard;