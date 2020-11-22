/* eslint-disable max-len */
/* eslint-disable linebreak-style */

import React, {useContext} from 'react';
import {StyleSheet,View} from 'react-native';
import {Text} from 'react-native-elements';
import {Button} from 'native-base';
import Spacer from '../components/Spacer';
import {Context as UserContext} from '../context/UserContext';


const Congrats = ({state, increaseSection})=>{
  const {myInstitute, myDegree, myCourses, userId, fullName}=state;
  const {editUser}=useContext(UserContext);
  return (
    <>
      <Spacer/>
      <Text >Congrats! you are now a part of WeTeach</Text>
      <Spacer/>
      <Text style={{alignContent: 'center'}}>Are there any subject you could assist?</Text>
      <Spacer/>
      <Text style={{alignSelf: 'center'}}>Be A Helper!</Text>
      <Spacer/>
      <Text style={{fontWeight: 'bold'}}> Recieve variaty of discounts in Resturants Bars and more!</Text>
      <Spacer/>
      <Text style={{fontWeight: 'bold'}}>You will gain priority over other Student Helper Requests!</Text>
      <Spacer/>
      <Text>Do you wish to join our growing community?</Text>
      <View style={{flex:1,flexDirection:'row'}}>
      <Button bordered rounded onPress={()=>increaseSection()}>
        <Text>Count me in!</Text>
      </Button>
      <Button bordered rounded
        onPress={
          ()=>editUser(userId, {coursesITake: {myInstitute, myDegree, myCourses}, fullName})
        }>
        <Text>Maybe later</Text>
      </Button>
      </View>
    </>

  );
};

styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d35400',
  },

  spinner: {
    marginBottom: 50,
  },
  btn: {
    marginTop: 20,
  },

  text: {
    color: 'white',
  },
  chosen: {
    backgroundColor: '#7690AC',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});


export default Congrats;
