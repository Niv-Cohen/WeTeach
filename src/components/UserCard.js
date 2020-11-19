import React,{useState, useEffect,useContext} from 'react'
import { ActivityIndicator } from 'react-native';
import { Image,Text } from 'react-native-elements';
import {Button} from 'native-base';
import { StyleSheet,TouchableOpacity,View } from 'react-native';
import ProfileImg from './ProfileImage';
import StarRanking from './StarRanking';
import About from './About'
import MyCourses from './MyCourses';
import {Context as AuthContext} from '../context/AuthContext'
import {Context as UserContext} from '../context/UserContext';
import Spacer from './Spacer';

const UserCard = () =>{
    const {state:{user}} = useContext(AuthContext);
    const {setUser,editUser}=useContext(UserContext);
    console.log(user)
    const {coursesITeach,coursesITake,subjectIHelp,about,name}=user;
    //array of univerisites, complex stucture, try cosole.log(institutens) first
    //const {state:{institutens}}=useContext(Institutecontext);
    useEffect(()=>{
        setUser(user);
    },[])

    return <View>
              <StarRanking/>
              <ProfileImg editUser={editUser} name={name}/>
              <About about={about} userId={user._id} editUser={editUser}/>
              <Spacer/>
              <MyCourses coursesITake={coursesITake} coursesITeach={coursesITeach}  subjectsIHelp={subjectIHelp} />
           </View>
}

const style = StyleSheet.create({
    personalImg:{
        width:200,
        height:200
    }
})


export default UserCard