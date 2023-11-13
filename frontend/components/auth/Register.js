import React, { Component } from 'react';
import { View, Button , TextInput, StyleSheet,ImageBackground,KeyboardAvoidingView,TouchableWithoutFeedback,Dimensions,Keyboard} from 'react-native';
import firebase from 'firebase';

import StyledButton from '../../components/main/custom/StyledButton';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state={
            email : '',
            password : '',
            name: '',
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp(){
        const { email,password , name} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email , password)
        .then((result) => {
            firebase.firestore().collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
                name,
                email
            })
            console.log(result)
        })
        .catch((e) => {
            console.log(e);
            alert(e)
        })
    }
    render() {
        return (
            <ImageBackground    source={require('../../assets/bg.png')} style={styles.wholeContainer}>
                <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            <TextInput
                                placeholder="name"
                                onChangeText={(name) => this.setState({name})}
                                style={styles.loginFormTextInput}
                            />
                            <TextInput
                                placeholder="email"
                                onChangeText={(email) => this.setState({email})}
                                style={styles.loginFormTextInput}
                            />
                            <TextInput
                                placeholder="password"
                                secureTextEntry= {true}
                                onChangeText={(password) => this.setState({password})}
                                style={styles.loginFormTextInput}
                            />
                            <StyledButton 
                                type="primary"
                                onPress={() =>this.onSignUp()}
                                content={"Log in"}
                                buttonStyle={styles.fbLoginButton}
                            />
                            
                        </View>
                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ImageBackground>
        )
    }
}
const styles = StyleSheet.create({
    wholeContainer: {
        width: '100%',
        height: Dimensions.get('window').height,
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