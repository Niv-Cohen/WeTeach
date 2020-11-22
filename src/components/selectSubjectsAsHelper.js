
import React, {Component, useContext} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Overlay, Text} from 'react-native-elements';
import {Button} from 'native-base';
import {Chip} from 'react-native-paper';
import Spinner from '../components/Spinner';
import Congrats from '../components/Congrats';
import UserApi from '../api/Users';
import {Context as UserContext} from '../context/UserContext';
import Spacer from '../components/Spacer';

const selectSubjcetsAsHelper = ({state, coursePicker, addSubjectToggle})=>{
  const {institutes, userId, subjectsIHelp,
    myInstitute, myDegree, selectedCourse, myCourses}=state;
  const {editUser}=useContext(UserContext);
  return (
    <>
      <Spacer/>
      <Text h4>
        Pick a course to select subjects
      </Text>
      <Spacer/>
      <View style={style.chipListContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {institutes[myInstitute.index].degrees[myDegree.index].
              courses.map((course, index)=>{
                return (
                  <Chip style={style.chip}
                    onPress={()=>coursePicker(course.hebName, index)}>
                    {course.hebName}
                  </Chip>
                );
              })}
        </ScrollView>
      </View>
      <Spacer/>
      <View style={style.chipListContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedCourse&&institutes[myInstitute.index].degrees[myDegree.index]
              .courses[selectedCourse.index].subjects.map((subject)=>{
                return (
                  <Chip style={style.chip}
                    onPress={()=>addSubjectToggle(subject)} >
                    {subject.hebName!==''?subject.hebName:subject.engName}
                  </Chip>);
              })}
        </ScrollView>
      </View>
      <View>
        <Button disabled={subjectsIHelp.size===0?true:false}
          onPress={()=>editUser(userId, {subjectsIHelp: subjectsIHelp,
            coursesITake: {myInstitute, myCourses, myDegree}, fullName})}>
          <Text>Subscribe</Text>
        </Button>
      </View>
    </>
  );
};

const style=StyleSheet.create({
  chipListContainer: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'flex-start',
    bottom: 0,
  },
  chip: {
    marginVertical: 10,
    marginHorizontal: 0.5,
  },
});
export default selectSubjcetsAsHelper;
