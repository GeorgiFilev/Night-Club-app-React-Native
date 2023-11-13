import { StatusBar } from 'expo-status-bar';
import React , {Component} from 'react';
import { StyleSheet, Text, View,Button,Image,TouchableOpacity } from 'react-native';

import firebase from 'firebase';


import { Provider } from 'react-redux';
import { createStore , applyMiddleware} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))




const firebaseConfig = {
  apiKey: "AIzaSyA9rmhW6PH8ybQSoTmO9bFyHLMwX5j06bE",
  authDomain: "werave-production.firebaseapp.com",
  projectId: "werave-production",
  storageBucket: "werave-production.appspot.com",
  messagingSenderId: "719874154393",
  appId: "1:719874154393:web:592e6046696121a2c0bd08",
  measurementId: "G-HQQ190Y3X9"
};

if(firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/auth/Landing';
import RegisterScreen from './components/auth/Register';
import MainScreen from './components/Main';
import AddScreen from './components/main/Add';
import LoginScreen from './components/auth/Login';
import SaveScreen from './components/main/Save';
import CommentScreen from './components/main/Comment';
import MapScreen from './components/main/Map';

import StyledHeader from './components/main/custom/StyledHeader';


const Stack = createStackNavigator();

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

export class App extends Component {
  
  constructor(props){
    super(props);
    this.state={
      loaded:false,

    }
    this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
  }
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if(!user){
        this.setState({
          loggedIn:false,
          loaded:true
        })
      }
      else{
        this.setState({
          loggedIn:true,
          loaded:true,
        })
      }
    })
  }
  forceUpdateHandler(){
    this.forceUpdate();
  }

  render() {
    const {loggedIn, loaded} = this.state;
    if(!loaded){
      return(
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text> Loading </Text>
        </View>
      )
    }
    
    if(!loggedIn){
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component = {LandingScreen} options={{title: 'Landing',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
            <Stack.Screen name="Register" component = {RegisterScreen} options={{title: 'Register',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{title: 'Login',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
          </Stack.Navigator>
        
        </NavigationContainer>
        
      );
    }
    return(
      <Provider store = {store}>
          <NavigationContainer >
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" component = {MainScreen}
                options={({ navigation}) => {
                  return{
                    headerTitle: () => <StyledHeader navigation={navigation} />
                  }
                }
              }/>
              <Stack.Screen name="Add" component = {AddScreen} navigation={this.props.navigation} options={{title:'Add',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
              <Stack.Screen name="Save" component = {SaveScreen} navigation={this.props.navigation} options={{title:'Save',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
              <Stack.Screen name="Comment" component = {CommentScreen} navigation={this.props.navigation} options={{title:'Comment',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
              <Stack.Screen name="Map" component = {MapScreen} navigation={this.props.navigation} options={{title:'Map',headerStyle: {backgroundColor: '#171A20',},headerTintColor: '#FFFFFF',headerTitleStyle: {fontWeight: 'bold',},}}/>
            </Stack.Navigator>
          </NavigationContainer>
      </Provider>
  
    )
  }
}

export default App



