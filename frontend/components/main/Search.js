import React, {useState} from 'react'
import { StyleSheet, View, Text,TextInput, FlatList, TouchableOpacity,Dimensions, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback,Keyboard} from 'react-native'

import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData} from '../../redux/actions/index';
import firebase from 'firebase';

require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([]);

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('name', '>=', search)
            .get()
            .then((snapshot) =>{
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return {id, ...data}
                });
                
                setUsers(users);
            })
    }
    return (
        <ImageBackground    source={require('../../assets/bg.png')} style={styles.wholeContainer}>
            <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.loginScreenContainer}>
                        <TextInput
                            style={styles.loginFormTextInput} 
                            placeholder="Search here..." 
                            onChangeText={(search) => fetchUsers(search)}
                        />
                        <FlatList 
                            numColums={1}
                            horizontal={false}
                            data={users}
                            renderItem={({item}) => (
                                <View style={{width: '100%',padding: 5,paddingLeft:15,borderWidth:2,borderRadius:40}}>
                                <TouchableOpacity>
                                    <Text
                                        onPress={() => props.navigation.navigate("Profile",{uid: item.id})}>
                                        {item.name}
                                    </Text>     
                                </TouchableOpacity>
                                </View>
                            
                            )}
                        
                        />
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    )
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      wholeContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
    containerView: {
    flex: 1,
  },
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  logoText: {
    fontSize: 40,
    fontWeight: "800",
    marginTop: 150,
    marginBottom: 30,
    textAlign: 'center',
  },
  loginFormView: {
    flex: 1
  },
  loginFormTextInput: {
    height: 43,
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
  
  },
  loginButton: {
    backgroundColor: '#3897f1',
    borderRadius: 5,
    height: 45,
    marginTop: 10,
  },
  fbLoginButton: {
    height: 45,
    marginTop: 10,
    backgroundColor: 'transparent',
  },
})
