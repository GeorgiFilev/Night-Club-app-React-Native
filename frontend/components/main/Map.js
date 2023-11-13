import React, {Component} from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions, Alert } from 'react-native';
// import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';

import {connect} from 'react-redux';



export class Map extends Component {

  state={
    location: {},
    errorMessage:'',
    loading:true,
    check:false,
    text: 'error',
    posts: {}
  }
  
  componentDidMount(){
    this.setState({
      location:{},
      errorMessage:'',
      loading:true,
      text: 'loading maps',
      posts: this.props.feed,
    });
    this._interval = setInterval(() => {
      if(this.state.text.length >= 16){
        this.setState({
          text: 'loading maps'
        });
      }

      text = this.state.text;
      this.setState({
        text:text + '.'
      })
    }, 1000);
    // console.log(this.state.posts);
    this.getPermission();
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    
    if(this.state.location !== prevState.location && Location.getPermissionsAsync() != 'none'){
      this.getLocation();
    }
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }

  getPermission =async() => {
    if(this.state.check === false){
      let {status} = await Location.requestPermissionsAsync();
      if(status !== 'granted'){
        console.log('PERMISSION NOT GRANTED');
        this.setState({
          errorMessage:'PERMISSION NOT GRANTED'
        });
        Alert.alert('Please enable location', 'You must provide permissions in settings to use location',[
          {text:'Okay'}
        ]);
  
      }
      else{
        console.log('PERMISSION GRANTED');
        this.getLocation();
      }
      this.setState({
        check:true
      })
    }


  }
  getLocation = async() => {

    const location = await Location.getCurrentPositionAsync({});
    this.setState({
      location:location,
      loading: false
    })
  }
  
  render(){
    return (
      <View style={styles.container}>
        <View>
          {
            this.state.loading ===true ? 
            <View style={{ alignSelf:'center',alignContent:'center',alignItems:'center'}}>
              <Text> {this.state.text}</Text>
            </View>
            :
            <MapView style={styles.map}>
              {/* <Text style={{textAlign: 'center'}}> {JSON.stringify(this.state.location.coords)}</Text> */}
              <MapView.Marker
                pinColor='red'
                coordinate={this.state.location.coords}
                title="My Marker"
                description="Some description"
              />

              {
                this.state.posts.map((post) =>
                post.location !=undefined ? 
                <MapView.Marker
                  key={post.id}
                  pinColor='#000000'
                  coordinate={post.location.coords}
                  title="My Marker"
                  description="Some description"
                />
                :
                null
                )

              }
            </MapView>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

function mapStateToProps(store){
  
  return{
  currentUser: store.userState.currentUser,
  following: store.userState.following,
  feed: store.usersState.feed,
  usersFollowingLoaded: store.usersState.usersFollowingLoaded,};
}

export default connect(mapStateToProps,null)(Map);