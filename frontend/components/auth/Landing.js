import React from 'react';
import { Button, Text, View, StyleSheet,Dimensions, ImageBackground} from 'react-native';
import StyledButton from '../main/custom/StyledButton';

export default function Landing( {navigation} ) {
    return (
        <ImageBackground    source={require('../../assets/bg.png')} style={styles.wholeContainer}>
          <View style={{ flex: 1, justifyContent: 'center'}}>
            <StyledButton 
                type="primary"
                content={"Register"}
                onPress= {()=> navigation.navigate("Register")}
            />
            <StyledButton 
                type="primary"
                content={"Login"}
                onPress= {()=> navigation.navigate("Login")}
                upper="true"
            />
          </View>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    wholeContainer: {
      width: '100%',
      height: Dimensions.get('window').height,
    },
    titles: {
      marginTop: '30%',
      width: '100%',
      alignItems: 'center',
    },
    title: {
      fontSize: 40,
      fontWeight: '500',
    },
    subtitleCTA: {
      textDecorationLine: 'underline',
    },
    subtitle: {
      fontSize: 16,
      color: '#5c5e62'
    },
  
    image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
      position: 'absolute',
    },
  
    buttonsContainer: {
      position: 'absolute',
      bottom: 50,
      width: '100%',
    }
  });