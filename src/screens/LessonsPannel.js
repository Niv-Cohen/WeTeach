import React ,{useEffect}from 'react'
import {Text} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';
import UserCard from '../components/UserCard';
import { LogBox } from 'react-native';

const LessonsPannel = () =>{
  useEffect(()=>{LogBox.ignoreAllLogs(true)},[])
     return <SafeAreaView forceInset={{top:"always"}}>
    <Text style={{fontWeight:"bold",fontSize:48,justifyContent:"center"}}>LessonsPannel</Text>
</SafeAreaView>
}

LessonsPannel.navigationOptions = {
    tabBarIcon: <FontAwesome name="plus-circle" size={35} />
  };


export default LessonsPannel