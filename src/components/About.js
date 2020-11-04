import React,{useState} from 'react'
import { View, Text, Image,StyleSheet } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';
import { TextInput } from 'react-native-paper';

// implemented without image with header
const About = ({userId,about,editUser}) =>{
  const [userAbout,setUserAbout]=useState(about);
  const [edit,setEdit]=useState(false)

  const toggleEditvisibilaty =()=>{
    if(edit){
      const params={};
      params.about=userAbout;
      editUser({userId,params});
    }
    setEdit(!edit)
    

  }
    return(
<Card containerStyle={{flex:1,borderColor:'red',borderWidth:3,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,}}>
  <Card.Title style={{textAlign:'left'}}>About</Card.Title>
      {edit?<TextInput autoFocus={true}  onChangeText={(text) => setUserAbout(text)} value={userAbout}></TextInput>:<Text >{userAbout}</Text>}
      <Icon style={styles.icon} name='edit' size={20} type='font-awesome' reverse onPress={()=>toggleEditvisibilaty()}/>
</Card>)
}

const styles =StyleSheet.create({
  icon:{
    bottom:0,
    left:0,
    position: 'absolute',
    alignSelf:"flex-start"
  }

})


export default About