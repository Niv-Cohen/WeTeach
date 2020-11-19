import React,{Component,useContext, useState,useEffect} from 'react'
import {View,StyleSheet,TouchableOpacity,FlatList} from 'react-native'
import { Overlay,Text,Divider,ListItem,ActivityIndicator, } from 'react-native-elements';
import { Container, Header, Content, Button, Icon } from 'native-base';


const SetupLowerButtons = ({usableState,onPressFun,buttonText,iconName}) =>{
    return(
      <View style={{justifyContent:"flex-end",display:"flex"}} >
      <Button disabled={buttonText==='Back'?false:usableState?false:true} onPress={()=>onPressFun()} style={usableState&&{backgroundColor:'#195e83'}}>
        <Icon style={{marginRight:15}} name={iconName}/>
        <Text style={{marginRight:10}}>{buttonText}</Text>
        </Button>
        </View>
    )
}



export default SetupLowerButtons