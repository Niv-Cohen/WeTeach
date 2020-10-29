import React,{useState, useEffect} from 'react'
import { ActivityIndicator } from 'react-native';
import { Image,Text } from 'react-native-elements';
import { StyleSheet,TouchableOpacity,View } from 'react-native';
import ProfileImg from './ProfileImage';
import StarRanking from './StarRanking';
import About from './About'
import MyCourses from './MyCourses';


const UserCard = () =>{
    return <View>
              <StarRanking/>
              <ProfileImg/>
              <About/>
              <MyCourses/>
           </View>
}

const style = StyleSheet.create({
    personalImg:{
        width:200,
        height:200
    }
})


export default UserCard