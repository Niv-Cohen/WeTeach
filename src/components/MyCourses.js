import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity , Dimensions} from 'react-native'
import {Text,Overlay,Card} from 'react-native-elements';
import {Button} from 'native-base'
import { Chip } from 'react-native-paper';
import Spacer from './Spacer';
import SetHelper from '../components/selectSubjectsAsHelper'
import coursesAndSubjects from '../components/selectSubjectsAsHelper'
import CoursesSet from './SetCourseList';
import Popover from 'react-native-popover-view';
import { LogBox } from 'react-native';
import ChipList from './ChipList';


const MyCourses = ({instituteData,coursesITeach,coursesITake,subjectIHelp}) => {
    
    LogBox.ignoreAllLogs(true);
    const [isEditCoursesVisible,setIsEditCoursesVisible]=useState(false);
    console.log(coursesITake)
    const {myCourses,myInstitute,MyDegree}=coursesITeach;
    const [selectedCourse,setSelctedCourse]=useState(null);
    const [coursesToBeAdded,setCoursesToBeAdded]=useState([]);
    const [coursesToBeRemoved,setCoursesToBeRemoved]=useState([]);
    const coursePicker = (courseName,index)=>setSelctedCourse({courseName,index})
    const toggleCourses= (course)=>{
      myCourses.some(courseFromList=>courseFromList.hebName===course.hebName)?
      setCoursesToBeRemoved([...coursesToBeRemoved,course]):
      coursesToBeAdded.some(toBeAdded=>toBeAdded.hebName===course.hebName)?
      setCoursesToBeAdded(coursesToBeAdded.filter(toBeAdded=>toBeAdded.hebName!==course.hebName)):
      setCoursesToBeAdded([...coursesToBeAdded,course]);
    }
  return(
    <>
                <Card>
                <Card.Title></Card.Title>
                <Card.Title >Courses I Teach:</Card.Title>
                <ChipList array={instituteData[0].degrees[myDegree.index].courses} pressFunc={coursePicker} doublePressFunc={toggleCourses}/> 
                <Card.Divider/>
                  <Spacer/>
                  <Spacer/>
                  <Spacer/>
                  <Spacer/>
                  <Card.Title>Helper In:</Card.Title>
                  <Card.Divider/>
                  {selectedCourse&&<ChipList array={instituteData[0].degrees[0].courses[selectedCourse.index].subjects}
                   pressFunc={addSubjectToggle} />}
                  <View>             
                   {/* <Button onPress={()=>editUser(userId,subjectIHelp)}>
                   <Text>Subscribe</Text>
                   </Button> */}
                 </View>
                 </Card>
        </>

  )
  
};


export default MyCourses