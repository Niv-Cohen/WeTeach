
import React,{Component} from 'react'
import {View,StyleSheet,ScrollView} from 'react-native'
import { Overlay,Text } from 'react-native-elements';
import { Button} from 'native-base';
import { Chip } from 'react-native-paper';
import Spinner from '../components/Spinner';
import Congrats from '../components/Congrats';
import UserApi from '../api/Users';
import {Context as UserContext} from '../context/UserContext';
import Spacer from '../components/Spacer'

const selectSubjcetsAsHelper = ({state,coursePicker,addSubjectToggle,editUser})=>{
    const {institutes,myInstitute,myDegree,selectedCourse}=state;
return(
                  <>  
                  <Spacer/>
                  <Text h4>Pick a course to select subjects</Text>
                  <Spacer/>
                  <View style={{flex:1,  flexWrap:'wrap', flexDirection: 'row', alignItems:'center' ,alignSelf:'stretch', justifyContent: 'flex-start',bottom:0,borderWidth:3,borderColor:'red'}}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {institutes[myInstitute.index].degrees[myDegree.index].courses.map((course,index)=>{
                    return(
                      <Chip style={{marginVertical:10,marginHorizontal:0.5}} onPress={()=>coursePicker(course.hebName,index)}>
                        {course.hebName}
                      </Chip>
                    )
                  })}
                  </ScrollView>
                  </View>
                  <Spacer/>
                  <View style={{flex:1,  flexWrap:'wrap', flexDirection: 'row', alignItems:'center',alignSelf:'stretch',bottom:0}}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {selectedCourse&&institutes[myInstitute.index].degrees[myDegree.index]
                  .courses[selectedCourse.index].subjects.map((subject)=>{return(
                  <Chip style={{marginVertical:10,marginHorizontal:0.5}} onPress={()=>addSubjectToggle(subject)} >
                      {subject.hebName!==''?subject.hebName:subject.engName}
                  </Chip>)})}
                  </ScrollView>
                  </View>
                  <View>
                   <Button onPress={()=>editUser(userId,subjectIHelp)}>
                     <Text>Subscribe</Text>
                   </Button>
                 </View>
                  </>
)


}

export default selectSubjcetsAsHelper