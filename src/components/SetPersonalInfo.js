import React, {useState} from 'react';
import {KeyboardAvoidingView} from 'react-native'
import {Input} from 'react-native-elements';
import {Button, Text} from 'native-base';
import Spacer from './Spacer';

const SetPersonalInfo = ({increaseSection})=>{
  const [userName, setUserName]=useState('');
  return (
    <>
    <KeyboardAvoidingView>
      <Spacer/>
      <Spacer/>
      <Input
        onChangeText={(text)=>setUserName(text)} value={userName}
        placeholder='Set Name'
      />
      <Spacer/>
      <Spacer/>
      <Button onPress={()=>increaseSection(userName)} 
        style={{alignSelf: 'center'}} disabled={userName===''} rounded bordered>
        <Text>Next</Text>
      </Button>
      </KeyboardAvoidingView>
    </>
  );
};


export default SetPersonalInfo;
