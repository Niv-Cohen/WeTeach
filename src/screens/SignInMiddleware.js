import React, {useContext, useEffect} from 'react';
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {navigate} from '../NavigationRef';
import {ImageBackground, Dimensions} from 'react-native';

const SignInMiddleware = ()=>{
  const {state: {user}}=useContext(AuthContext);
  const {setUser}=useContext(UserContext);

  useEffect(()=>{
    async function setUpData() {
      setUser(user);
      setTimeout(function() {
        navigate('Account');
      }, 3000);
    }
    setUpData();
  }, []);


  return (
    <>
      <ImageBackground source={require('../../assets/SignUpMiddleware.png')}
        imageStyle={{resizeMode: 'cover'}}
        style={{width: Dimensions.get('window').width,
          height: Dimensions.get('window').height}}>
      </ImageBackground>
    </>
  );
};

export default SignInMiddleware;
