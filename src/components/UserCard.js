import React, {useEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import ProfileImg from './ProfileImage';
import About from './About';
import {Button, Text}  from 'native-base'
import {Context as AuthContext} from '../context/AuthContext';
import {Context as UserContext} from '../context/UserContext';
import Spacer from './Spacer';

const UserCard = () =>{
  const {signout} = useContext(AuthContext);
  const {editUser, state: {user,rawData, instituteData}}=useContext(UserContext);
  const {about, name, img}=user;
  useEffect(()=>{
    if (instituteData!==null) {
      const data = rawData;
      const institutes =[];
      let degrees=[];
      let courses=[];
      let subjects=[];
      let instIndex=0;
      let degIndex;
      let courseIndex;
      let subIndex;
      instIndex=0;
      data.map((inst)=>{
        degIndex=0;
        degrees=[];
        inst['degrees'].map((degree)=>{
          courseIndex=0;
          courses=[];
          degree['courses'].map((course)=>{
            subIndex=0;
            subjects=[];
            course['subjects'].map((subject)=>{
              subjects.push({hebName: subject.hebName,
                engName: subject.engName, subIndex});
              subIndex++;
            });
            courses.push({hebName: course.hebName, courseIndex, subjects});
            courseIndex++;
          });
          degrees.push({hebName: degree.hebName, degIndex, courses});
          degIndex++;
        });
        institutes.push({hebName: inst.hebName, instIndex, degrees});
        instIndex++;
      });
    }
  }, []);

  return <View>
    <ProfileImg editUser={editUser} img={img} name={name}/>
    <About about={about} userId={user._id} editUser={editUser}/>
    <Spacer/>
    <Button style={{alignSelf:'center'}} rounded bordered 
    onPress={()=>signout()}>
      <Text>Signout</Text>
    </Button>
    <Spacer/>
  </View>
};

const style = StyleSheet.create({});


export default UserCard;
