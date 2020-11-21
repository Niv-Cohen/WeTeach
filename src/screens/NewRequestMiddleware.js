import React, { useContext,useEffect } from 'react';
import {Context as ActionCenterContext} from '../context/ActionCenterContext'
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import {navigate} from '../NavigationRef'
import {View,Text,StyleSheet,Image,ImageBackground,KeyboardAvoidingView,Dimensions} from 'react-native'

const NewRequestMiddleware =({userId,course,subjects,additionalInfo,lessonLength,timeSlots})=>{
        const{addReq}=useContext(ActionCenterContext);

    useEffect(()=>{
        addReq()
         async function createNewReq(){
           let temp=[];
           let timeSlotsToSend=[]
           timeSlots= Object.values(timeSlots)
           timeSlots.map(object=>{
                temp=temp.concat(object.slots);
           })
           temp.map(object=>{
                timeSlotsToSend=timeSlotsToSend.concat([String(object.dateString).concat(String(object.start).slice(15,21)),String(object.dateString).concat(String(object.end).slice(15,21))])
           })
           timeSlots=timeSlotsToSend;
           await addReq({userId,course,subjects,additionalInfo,timeSlots,lessonLength})
        }
        createNewReq();
    },[])

    return(
        <>
        <ImageBackground source={require('../../assets/SignUpMiddleware.png')} imageStyle={{resizeMode:'cover'}} style={{ width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>
</ImageBackground>
        </>
    )


}


export default NewRequestMiddleware