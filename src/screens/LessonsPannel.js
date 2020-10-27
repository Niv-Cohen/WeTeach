import React from 'react'
import {Text} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import {SafeAreaView} from 'react-navigation';
import UserCard from '../components/UserCard';

const LessonsPannel = () =>{

     return <SafeAreaView forceInset={{top:"always"}}>
    <Text style={{fontWeight:"bold",fontSize:48,justifyContent:"center"}}>LessonsPannel</Text>
    <UserCard/>
</SafeAreaView>
}

LessonsPannel.navigationOptions = {
    tabBarIcon: <FontAwesome name="book" size={22} />
  };


export default LessonsPannel