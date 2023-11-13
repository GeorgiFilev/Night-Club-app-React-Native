import React, {useState, useEffect} from 'react'
import { View, TextInput, Image, Button,Text, TouchableWithoutFeedback,KeyboardAvoidingView, StyleSheet,Keyboard, Dimensions} from 'react-native'
import * as Location from 'expo-location';

import firebase from 'firebase';
import {NavigationContainer} from '@react-navigation/native';
require("firebase/firestore")
require("firebase/firebase-storage")

export default function Save(props) {
    const [caption, setCaption] = useState("");

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }
    
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        })();
    }, []); 


    let ready = false;
    let text = 'Waiting...';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      ready = true;
    }

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;


        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
                .storage()
                .ref()
                .child(childPath)
                .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }
        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
            })
        }
        const taskError = snapshot => {
            console.log(snapshot);
        }
        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        if(location){
            firebase
            .firestore().collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp() ,
                location: location
            }).then((function () {
                props.navigation.popToTop();
            }))
        }
    }
    return (
        <View style={{flex:1}}>
            <View style={{justifyContent: 'center'}}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Text>{text}</Text>
                </TouchableWithoutFeedback>
            </View>
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.ContentContainer}>
                        <TextInput
                            multiline={true}
                            numberOfLines={3}
                            style= {styles.loginFormTextInput}
                            placeholder="Write a Caption . . ."
                            onChangeText={(caption) => setCaption(caption)}
                        />
                        <View style={{justifyContent: 'center',alignItems: 'center'}}>
                            <Image 
                                style={{width: 300, height:300}}
                                source={{uri: props.route.params.image}}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
            
            
            {
                ready ===true ? 
                 <View>
                    <Button 
                        title="Save"
                        onPress={() => uploadImage()}
                    />
                </View>
                :
                <View style={{alignItems: 'center'}}>
                    <Text> Processing </Text>
                </View>
            }

        </View>
    )
}

const styles=StyleSheet.create({
    containerView: {
    height:Dimensions.get('window').height*3/5,
  },
  ContentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    height: 100,
  },
  loginFormTextInput: {
    height: 50,
    fontSize: 14,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eaeaea',
    backgroundColor: '#fafafa',
    paddingLeft: 10,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 5,
    marginBottom: 5,
  
  }
})
