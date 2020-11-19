import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity , Dimensions} from 'react-native'
import {Text,Overlay} from 'react-native-elements';
import {Button} from 'native-base'
import { Chip } from 'react-native-paper';
import Spacer from './Spacer';
import CoursesSet from './SetCourseList';
import Popover from 'react-native-popover-view';
import { LogBox } from 'react-native';


const MyCourses = ({coursesITeach,coursesITake,subjectIHelp}) => {
    
    LogBox.ignoreAllLogs(true);
    const [isEditCoursesVisible,setIsEditCoursesVisible]=useState(false);
    console.log(coursesITake)
  return(
            <View>
                <Text style={{fontWeight:'bold', marginRight:15}}>Courses I take this semester:</Text>
                <View style={{flex:1,  flexWrap:'wrap', flexDirection: 'row', alignItems:'center' ,alignSelf:'stretch', justifyContent: 'flex-start',bottom:0}}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                  {coursesITake.length!==0?coursesITake.map((course,index)=>{
                    return(
                      <Chip style={{marginVertical:10,marginHorizontal:0.5}} onPress={()=>coursePicker(course.hebName,index)}>
                        {course.hebName}
                      </Chip>
                    )
                  }):null}
                  </ScrollView>
                  </View>
                  <View style={{alignSelf:'center',alignItems:'center',alignContent:'center'}}>
                  <Button rounded bordered  onPress= {()=>setIsEditCoursesVisible(!isEditCoursesVisible)}>

                  {coursesITake.length!==0?<Text style={{margin:10}}>edit</Text>:<Text style={{margin:10}}>Which Course Do You Take?</Text>}
                  </Button>
                  </View>
                  <Overlay isVisible={isEditCoursesVisible} onBackdropPress={()=>setIsEditCoursesVisible(!isEditCoursesVisible)}>
                    {/* <CoursesSet /> */}
                  </Overlay>
          </View>

  )
  
};


export default MyCourses