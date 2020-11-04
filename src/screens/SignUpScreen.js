import React, { useState, useContext } from 'react';
import {View,Text,StyleSheet} from 'react-native'

import AuthForm from '../components/AuthForm'
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext'
import NavLink from '../components/NavLink'

const SignUpScreen = () =>{
    const {state,signup,clearErrMsg} =  useContext(AuthContext);
    return (<>
            <Spacer/>
            <Spacer/>
        <AuthForm onPress={signup} buttonText='הרשם' errMessage={state.errMessage} clearErrMsg={clearErrMsg}/>
        <NavLink 
        routeName="Signin"
        text="משתמש רשום? התחבר במקום"
      />
    </>
    )

}

const style = StyleSheet.create({});

export default SignUpScreen;