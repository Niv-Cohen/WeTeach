import React from 'react'
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

// implemented without image with header
const About = () =>{
    return(
<Card containerStyle={{shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.39,
shadowRadius: 8.30,

elevation: 13,}}>
  <Card.Title style={{textAlign:'left'}}>About</Card.Title>
  
          <Text >Hi there! my name is Dani and I am a Computer Science graduate.
              
          </Text>
</Card>)
}

export default About