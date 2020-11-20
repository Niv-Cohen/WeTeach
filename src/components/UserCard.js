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
    const {setUser,editUser,state:{instituteData}}=useContext(UserContext);
    console.log(instituteData)
    const {coursesITeach,coursesITake,subjectIHelp,about,name,img}=user;
    useEffect(()=>{
        setUser(user);
    },[])

    
    return <View>
              <ProfileImg editUser={editUser} img={img}  name={name}/>
              <About about={about} userId={user._id} editUser={editUser}/>
              <Spacer/>
              {/* <MyCourses instituteData={instituteData} coursesITake={coursesITake}  coursesITeach={coursesITeach}  subjectsIHelp={subjectIHelp} /> */}
           </View>
}

const style = StyleSheet.create({
    personalImg:{
        width:200,
        height:200
    }
})


export default UserCard