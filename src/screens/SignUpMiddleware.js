import React, {useContext, useEffect} from 'react';
import {Context as ActionCenterContext} from '../context/ActionCenterContext';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {View, Text, StyleSheet, Image, ImageBackground, KeyboardAvoidingView, Dimensions} from 'react-native';
import {navigate} from '../NavigationRef';


const SignUpMiddleware = ()=>{
   const {createActionCenter,setRawInstituteData}=useContext(ActionCenterContext);
   const {state:{user}}=useContext(AuthContext);
   const {setUser}=useContext(UserContext)
  useEffect(()=>{
  async function setUp()
  {
    setUser(user)
    //await createActionCenter({userId:user._id});
    setTimeout(function() {
      navigate('Setup');
      }, 3000)
    }
    setUp();
    }, []);

  return (

    <ImageBackground source={require('../../assets/SignUpMiddleware.png')}
      imageStyle={{resizeMode: 'cover'}}
      style={{width: Dimensions.get('window').width,
        height: Dimensions.get('window').height}}>
    </ImageBackground>


  );
};

export default SignUpMiddleware;
