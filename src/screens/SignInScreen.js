import React, {useContext} from 'react';
import {View, Text, StyleSheet, Image, ImageBackground,
      KeyboardAvoidingView, Dimensions} from 'react-native';
import AuthForm from '../components/AuthForm';
import {Context as AuthContext} from '../context/AuthContext';
import NavLink from '../components/NavLink';
import Spacer from '../components/Spacer';

const SignInScreen = () =>{
  const {state, signin, clearErrMsg} = useContext(AuthContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={{backgroundColor: 'white', flex: 1} }>
        <ImageBackground source={require('../../assets/signInBackground.png')}
          imageStyle={{resizeMode: 'cover'}} style={style.backGroundImg}>
          <Spacer/>
          <Spacer/>
          <Image style={{alignSelf: 'center', width: 280, marginBottom: 5, marginRight: 20,
            height: 85}} source={require('../../assets/WeTeach_Transparent.png')} />
          <Text style={style.LetsSign}>Let's Sign You In</Text>
          <AuthForm buttonText='SIGN IN' errMessage={state.errMessage} onPress={signin} clearErrMsg={clearErrMsg}/>
          <NavLink
            routeName="Signup"
            text="Not a part of WeTeach?"
            linkText='Join us!'
          />
        </ImageBackground>
      </View>
    </KeyboardAvoidingView>

  );
};

const style =StyleSheet.create({
  backGroundImg:{width: Dimensions.get('window').width,
  height: Dimensions.get('window').height},
  signin: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  wellcome:
    {
      // position: 'absolute',
      left: '9.33%',
      right: '9.33%',
      alignSelf: 'center',
      marginRight: 80,
      marginBottom: 10,
      color: '#888889',
      // top: 'calc(50% - 32px/2 - 242px)',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 18,
    },
  LetsSign: {
    'alignSelf': 'center',
    'right': '11%',
    'fontStyle': 'normal',
    'fontWeight': 'bold',
    'fontSize': 24,
  },


});

export default SignInScreen;
