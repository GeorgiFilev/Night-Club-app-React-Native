import React, { Component } from 'react';
import {View , Text, TabBarIOS, Settings} from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialComunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from 'firebase';


import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { fetchUser, fetchUserPosts, fetchUserFollowing, clearData} from '../redux/actions/index';

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SearchScreen from './main/Search'
import MapScreen from './main/Map';
import { Button } from 'react-native-paper';


const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
    return(null)
}
 
export class Main extends Component {
    componentDidMount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }
    componentWillUnmount(){
        this.props.clearData();
        this.props.fetchUser();
        this.props.fetchUserPosts();
        this.props.fetchUserFollowing();
    }

    render() {
        return (
            
            <Tab.Navigator initialRouteName="Feed" 
                shifting={true}
                labeled={false} 
                barStyle={{backgroundColor: '#171A20CC'}} 
                sceneAnimationEnabled={true}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialComunityIcons name="home" color={color} size={26} />
                        ),
                }}
                />

                <Tab.Screen name="Search" component={SearchScreen} navigation={this.props.navigation}
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialComunityIcons name="magnify" color={color} size={26} />
                        ),
                }}
                />

                <Tab.Screen name="AddContainer" component={EmptyScreen}
                    listeners={({navigation}) => ({
                        tabPress: event =>{
                            event.preventDefault();
                            navigation.navigate("Add")
                        }
                    })} 
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialComunityIcons name="plus-box" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen name="MapContainer" component={EmptyScreen}
                    listeners={({navigation}) => ({
                        tabPress: event =>{
                            event.preventDefault();
                            navigation.navigate("Map");
                        }
                    })} 
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialComunityIcons name="map-marker-radius" color={color} size={26} />
                        ),
                    }}
                />

                <Tab.Screen name="Profile" component={ProfileScreen} 
                    listeners={({navigation}) => ({
                        tabPress: event =>{
                            event.preventDefault();
                            navigation.navigate("Profile", {uid: firebase.auth().currentUser.uid})
                        }
                    })} 
                    options={{
                        tabBarIcon: ({color,size}) => (
                            <MaterialComunityIcons name="account-circle" color={color} size={26} />
                        ),
                    }}
                />
              
            </Tab.Navigator>
        )
    }
}

const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser, fetchUserPosts, fetchUserFollowing, clearData} , dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);

