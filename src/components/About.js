/* eslint-disable react/prop-types */
import React, {useState} from 'react';
import {Text, StyleSheet} from 'react-native';
import {Card, Icon} from 'react-native-elements';
import {TextInput} from 'react-native-paper';
const About = ({userId, about, editUser}) =>{
  const [userAbout, setUserAbout]=useState(about);
  const [edit, setEdit]=useState(false);

  const toggleEditvisibilaty =()=>{
    if (edit) 
       editUser(userId,{about:userAbout});
    setEdit(!edit);
  };
  return (
    <Card containerStyle={styles.card}>
      <Card.Title >About</Card.Title>
      {edit?<TextInput multiline={true} numberOfLines={3} autoFocus={true}
        onChangeText={(text) => setUserAbout(text)}
        value={userAbout}></TextInput>:<Text >{userAbout}</Text>}
      <Icon style={styles.icon} name='edit' size={20} type='font-awesome'
        reverse onPress={()=>toggleEditvisibilaty()}/>
    </Card>)
};
const styles =StyleSheet.create({
  icon: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  card: {
    flex: 1, shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,
    elevation: 13},

});


export default About;
