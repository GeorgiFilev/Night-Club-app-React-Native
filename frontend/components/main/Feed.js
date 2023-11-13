import React, {useState, useEffect} from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button,Dimensions} from 'react-native'

import firebase from 'firebase';
require('firebase/firestore')
import {connect} from 'react-redux';
import StyledButton from './custom/StyledButton';


function Feed(props) {
    const [posts, setPosts] = useState([]);
    

    useEffect(() => {
        if(props.usersFollowingLoaded == props.following.length && props.following.length !==0){

            props.feed.sort(function(x,y) {
                return x.creation - y.creation;
            })

            setPosts(props.feed);
        }
        // console.log(props.feed);
        
    }, [props.usersFollowingLoaded, props.feed])  //When any of those are changed this effect is called

    const onLikePress = (userId,postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .set({})
    }
    const onDislikePress = (userId,postId) => {
        firebase.firestore()
            .collection("posts")
            .doc(userId)
            .collection("userPosts")
            .doc(postId)
            .collection("likes")
            .doc(firebase.auth().currentUser.uid)
            .delete()
    }
    return (
        <View style={styles.container}>
            <FlatList 
                showsVerticalScrollIndicator={false}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({item}) => (
                    <View style={styles.containerPost}>
                        <View style={styles.viewText}>
                            <Text style={styles.name}>{item.user.name}</Text>
                        </View>
                        <Image 
                            style={styles.image}
                            source= {{uri: item.downloadURL}}
                        />
                        { item.currentUserLike ?
                            (
                                <View style={styles.viewText}>
                                    <StyledButton 
                                        type="secondary"
                                        content="Liked"
                                        onPress={() => onDislikePress(item.user.uid,item.id)}
                                    />
                                </View>
                            )
                            :
                            (
                                <View style={styles.viewText}>
                                    <StyledButton 
                                        type="primary"
                                        content="Like"
                                        onPress={() => onLikePress(item.user.uid,item.id)}
                                    />
                                </View>
                            )
                        }
                        <View style={styles.viewText}>
                            <StyledButton
                                type="other"
                                onPress={() => props.navigation.navigate('Comment',{postId: item.id,uid: item.user.uid})}
                                content="View Comments..."
                            />
                        </View>
                        {
                            item.location ? 
                            <View>
                                <Text style={{color: 'pink'}}> {JSON.stringify(item.location)}</Text>
                            </View>
                            :
                            null
                        }
                       

                        {/* <View style={styles.buttonsView}>
                            <Button 
                            title='mama'/>
                            <Button 
                            title='tati'/>
                        </View> */}
                    </View>
                    

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    buttonsView:{
    flex: 2,    
    flexDirection: 'column',
    },
    container:{
        flex:1,
        backgroundColor: 'black',
    },
    viewText:{
        backgroundColor: 'black',
        width:'100%'
    },
    name:{
        paddingLeft: 5,
        color: 'pink',
        alignSelf: 'flex-start',
        fontSize: 15,
        fontWeight:'bold',
        textTransform: 'lowercase'
    },
    containerInfo:{
        margin:20,
    },
    containerGallery:{

    },
    image:{
        flex:1,
        aspectRatio: 1/1
    },
    containerPost:{
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'purple',
    }
    
})

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    following: store.userState.following,
    feed: store.usersState.feed,
    usersFollowingLoaded: store.usersState.usersFollowingLoaded,

})

export default connect(mapStateToProps,null)(Feed);