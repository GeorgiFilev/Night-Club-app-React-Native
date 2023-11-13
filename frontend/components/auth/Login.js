import React, { Component } from 'react';
import {Keyboard, View, Button , TextInput,StyleSheet,KeyboardAvoidingView, TouchableWithoutFeedback,Text,ImageBackground,Dimensions} from 'react-native';
import firebase from 'firebase';
import StyledButton from '../../components/main/custom/StyledButton';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state={
            email : '',
            password : '',
            valid: false,
            clicked:false,
        }

        this.onSignUp = this.onSignUp.bind(this);
    }

    onSignUp(){
        const { email,password , name} = this.state;
        this.setState({
            clicked:true
        })
        
        firebase.auth().signInWithEmailAndPassword(email , password)
        .then((result) => {
            console.log(result)
            this.setState({
                valid: true,
            })
        })
        .catch((e) => {
            console.log(e)
        })
    }
    render() {
        return (
            <ImageBackground    source={require('../../assets/bg.png')} style={styles.wholeContainer}>
                <KeyboardAvoidingView style={styles.containerView} behavior="padding">
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <View style={styles.loginScreenContainer}>
                            {this.state.clicked===true && this.state.valid===false ?
                                <View style={{alignContent:'center',alignItems:'center'}}> 
                                    <Text style={{color:'red'}}>Wrong credentials</Text>
                                </View>
                                :null
                            }
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
                                buttonStyle={styles.fbLoginButton}
                                onPress={() =>this.onSignUp()}
                                content={"Log in"}
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
