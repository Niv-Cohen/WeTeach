import React,{useState} from 'react'
import { Overlay,Text,ButtonGroup } from 'react-native-elements';

const SetupButtonGroup = ({selected,setSelected}) =>{
    const buttons = ['Teacher','Student']

    return(
        <>
            <ButtonGroup 
      onPress={(index)=>setSelected(index)}
      selectedIndex={selected}
      buttons={buttons}
      containerStyle={{height:50}}/>
        </>


    )


}



export default SetupButtonGroup