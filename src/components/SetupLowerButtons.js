import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button, Icon} from 'native-base';


const SetupLowerButtons = ({usableState, onPressFun, buttonText, iconName}) =>{
  return (
    <View style={{justifyContent: 'flex-end', display: 'flex'}} >
      <Button disabled={buttonText==='Back'?false:usableState?false:true}
        onPress={()=>onPressFun()} 
        style={usableState&&{backgroundColor: '#195e83'}}>
        <Icon style={{marginRight: 15}} name={iconName}/>
        <Text style={{marginRight: 10}}>{buttonText}</Text>
      </Button>
    </View>
  );
};


export default SetupLowerButtons;
