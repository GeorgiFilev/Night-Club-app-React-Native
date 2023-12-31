import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';


export default function Add({navigation}) {
  const [hasGalleryPermission, setHasCalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');


      const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasCalleryPermission(galleryStatus.status === 'granted');
     

    })();
  }, []);

  const takePicture = async () => {
    if(camera){
        const data = await camera.takePictureAsync(null);
        console.log(data.uri);
        setImage(data.uri);
    }
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };


  if (hasCameraPermission === null || hasCameraPermission === false) {
    return <View />;
  }
  if (hasGalleryPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1}}>
        <View style={styles.cameraContainer }>
            <Camera 
                ref= {ref => setCamera(ref)}
                style={styles.fixedRatio}
                type={type}
                ratio={'1:1'}/>    
        </View>
        
        <Button
            style={styles.button}
            title="Flip Image"
            onPress={() => {
            setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
            }}
        />
        <Button 
            title="Take Picture" 
            onPress= {() => takePicture()}
        />
        <Button 
            title="Pick Image From Gallery"
            onPress={() => pickImage()}
            />
        {image && <Image source={{uri: image}} style={{flex: 1}} />}
        <Button title="Next" onPress={() => navigation.navigate('Save', {image})} />
    </View>

  );
}

const styles = StyleSheet.create({
    cameraContainer:{
        flex: 1,
        flexDirection: 'row',
    },
    fixedRatio:{
        flex:1,
        aspectRatio: 1,
    },
    button:{
        flex: 0.1,
        alignSelf:'flex-end',
        alignItems: 'center',
    },

})