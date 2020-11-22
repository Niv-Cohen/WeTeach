/* eslint-disable react/prop-types */
import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Button, Input} from 'react-native-elements';
import {NavigationEvents} from 'react-navigation';
import Spacer from './Spacer';
import {LogBox} from 'react-native';
import {Feather, MaterialCommunityIcons, AntDesign} from '@expo/vector-icons';


Feather;
const AuthForm = ({buttonText, onPress, errMessage, clearErrMsg}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isVisible, setIsVisible]=useState(false);
  useEffect(()=>{
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <>
      <Spacer>
      </Spacer>
      <NavigationEvents onWillFocus={clearErrMsg} />
      <Input containerStyle={style.inputContainer}
        leftIcon={
          <MaterialCommunityIcons
            name='owl'
            size={24}
            color='black'
          />}
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input containerStyle={style.inputContainer} 
        rightIcon={<AntDesign name='eyeo' 
          onPress={()=>setIsVisible(!isVisible)} size={24}
          color='black' />
        }
        leftIcon={<Feather name='lock'size={24} color='black'/>}
        secureTextEntry={!isVisible?true:false}
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {errMessage? <Text style={style.errMessage}>{errMessage}</Text>:null }
      <Spacer>
        <Button iconRight icon={ <Feather style={{alignSelf: 'flex-end'}} 
          name='log-in' size={24}
          color='black'/> } titleStyle={style.titleStyle}
        iconContainerStyle={{marginLeft: 20}} buttonStyle={style.buttonStyle}
        title={buttonText}
        onPress={()=>onPress({email, password})}
        />
      </Spacer>
    </>
  );
};

const style = StyleSheet.create({
  headerText: {
    justifyContent: 'flex-start',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  errMessage: {
    fontSize: 16,
    color: 'red',
    marginRight: 15,
    fontWeight: 'bold',
  },
  titleStyle:{
    color: 'black', fontWeight: 'bold', fontFamily: 'sans-serif-condensed'
  },
  buttonStyle:{
    backgroundColor: '#FFDB47', width: '80%', alignSelf: 'center'
  },
  inputContainer:{
    width: '80%', alignSelf: 'center'
  }
});

export default AuthForm;
