import React, { useContext,useEffect } from 'react';
import {Context as ActionCenterContext} from '../context/ActionCenterContext'
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {navigate} from '../NavigationRef'
import {View,Text,StyleSheet,Image,ImageBackground,KeyboardAvoidingView,Dimensions} from 'react-native'

const SignInMiddleware = ()=>{
    const {setActionCenter}=useContext(ActionCenterContext);
    const {state:{user}}=useContext(AuthContext);
    const {setUser,setRawInstituteData}=useContext(UserContext)
    useEffect(()=>{
        setUser(user);
        async function setUpData(){
        // await setRawInstituteData();
        // setActionCenter(user._id)
        navigate('Account')
        }
        setUpData();
        
        
       
    },[])

   


return(
<>
<ImageBackground source={require('../../assets/SignUpMiddleware.png')} imageStyle={{resizeMode:'cover'}} style={{ width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>
</ImageBackground>
</>


)

}

export default SignInMiddleware