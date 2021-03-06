import React from 'react';
import {ButtonGroup} from 'react-native-elements';

const SetupButtonGroup = ({selected, setSelected}) =>{
  const valuesArr = [
    {text: '45 Min', val: 45},
    {text: '60 Min', val: 60},
    {text: '90 Min', val: 90},
    {text: '120 Min', val: 120}];
  const buttons = ['45 Min', '60 Min', '90 Min', '120 Min'];

  return (
    <>
      <ButtonGroup
        onPress={(index)=>setSelected(index, valuesArr[index].val)}
        selectedIndex={selected}
        buttons={buttons}
        containerStyle={{height: 50}}/>
    </>
  );
};
export default SetupButtonGroup;
