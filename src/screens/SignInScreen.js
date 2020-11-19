import React , { useContext } from 'react';
import {View,Text,StyleSheet} from 'react-native'
import AuthForm from '../components/AuthForm'
import {Context as AuthContext} from '../context/AuthContext'
import NavLink from '../components/NavLink'
import Spacer from '../components/Spacer';

const SignInScreen = () =>{
    const {state,signin,clearErrMsg} =  useContext(AuthContext);
    return (<>
            <Spacer />
            <Spacer />
            <AuthForm buttonText='Signin' errMessage={state.errMessage} onPress={signin} clearErrMsg={clearErrMsg}/>
            <NavLink 
        routeName="Signup"
        text="Not a part of WeTeach? join us!"
      />
    </>
    )

}

const style =StyleSheet.create({
    signin:{
        justifyContent:"center",
        alignContent:"center"
    }
   
});

export default SignInScreen;