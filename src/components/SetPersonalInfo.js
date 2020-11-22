import React, {useState} from 'react';
import {Input} from 'react-native-elements';
import {Button, Text} from 'native-base';
import Spacer from './Spacer';

const SetPersonalInfo = ({increaseSection})=>{
  const [userName, setUserName]=useState('');
  return (
    <>
      <Spacer/>
      <Spacer/>
      <Input
        onChangeText={(text)=>setUserName(text)} value={userName}
        placeholder='Set Name'
      />
      <Spacer/>
      <Spacer/>
      <Button onPress={()=>increaseSection()} 
        style={{alignSelf: 'center'}} disabled={userName===''} rounded bordered>
        <Text>Next</Text>
      </Button>
    </>
  );
};


export default SetPersonalInfo;
