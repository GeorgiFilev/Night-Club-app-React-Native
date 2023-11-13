import React from 'react';
import {View, Text, Pressable, StyleSheet, Dimensions} from 'react-native';


function StyledHeader({ navigation,forceUpdateHandler }){
    console.log(navigation);
    
    return (
      <View style={styles.size}>
        <Pressable
          style={styles.pressable}
          onPress={() => navigation.navigate("Feed")}
        >
          <Text style={styles.text}>Main</Text>
        </Pressable>
      </View>
    );
  };
const styles = StyleSheet.create({
    size: {
        height: Dimensions.get('window').height*4/59,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    pressable:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    text: {
        color:'black',
        fontSize: 15,
        fontWeight: '500',
        textTransform: 'uppercase',
      }


});
  
export default StyledHeader;