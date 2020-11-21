import React, { useState, useContext } from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView,ImageBackground,Dimensions,Image} from 'react-native'

import AuthForm from '../components/AuthForm'
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext'
import NavLink from '../components/NavLink'

const SignUpScreen = () =>{
    const {state,signup,clearErrMsg} =  useContext(AuthContext);
    return (<>

      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
            <View style={{backgroundColor:'white' ,flex:1} }>
                <ImageBackground source={require('../../assets/signInBackground.png')} imageStyle={{resizeMode:'cover'}} style={{ width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>
            <Spacer/>
            <Spacer/>
            <Image style={{alignSelf:'center',width:280,marginBottom:5,marginRight:20,
    height: 85,}} source={require('../../assets/WeTeach_Transparent.png')} />
            <Text style={style.LetsSign}>Let's Add You To WeTeach!</Text>     
        <AuthForm onPress={signup} buttonText='Register' errMessage={state.errMessage} clearErrMsg={clearErrMsg}/>
        <NavLink 
        routeName="Signin"
        text="Are you a WeTeach member?" linkText="Sign In"
      />
      </ImageBackground>
      </View>
      </KeyboardAvoidingView>
    </>
    )

}

const style = StyleSheet.create({
  LetsSign:{
    alignSelf:'center',
    "fontStyle": "normal",
    "fontWeight": "bold",
    "fontSize": 24,
  }
});

export default SignUpScreen;