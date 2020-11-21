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
    const {setUser,editUser,state:{rawData,instituteData}}=useContext(UserContext);
    const {coursesITeach,coursesITake,subjectIHelp,about,name,img}=user;
    
    useEffect(()=>{
        if(instituteData!==null)
        {
            const data = rawData;
            var institutes =[];
            var degrees=[];
            var courses=[];
            var subjects=[];
            var instIndex=0;
            var degIndex;
            var courseIndex;
            var subIndex;
              instIndex=0;
            data.map(inst=>{
                degIndex=0;
                degrees=[];
                inst['degrees'].map(degree=>{
                    courseIndex=0;
                    courses=[];
                     degree['courses'].map(course=>{                   
                        subIndex=0;
                        subjects=[];
                        course['subjects'].map(subject=>{
                            subjects.push({hebName:subject.hebName,engName:subject.engName,subIndex})
                            subIndex++;
                        })
                        courses.push({hebName:course.hebName,courseIndex,subjects});
                        courseIndex++;            
                    })
                    degrees.push({hebName:degree.hebName,degIndex,courses});
                    degIndex++;
                })
                institutes.push({hebName:inst.hebName,instIndex,degrees})
                instIndex++;
            })
        }
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