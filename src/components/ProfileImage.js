import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Spacer from './Spacer';

const ProfileImage =({name}) =>{

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {status} = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  return (
    <View>
      <Spacer/>
      <Spacer/>
      <Text h4 style={style.nameText}>
        {name}
      </Text>
    </View>
  );
};

const style =StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    alignSelf: 'center'
  },
  nameText:{
    marginRight: 10, fontFamily: 'sans-serif-light', 
    fontSize: 20, fontWeight: 'bold',alignSelf:'center'
  }
});

export default ProfileImage;
