import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity } from 'react-native'
import {Text,Button} from 'react-native-elements';
import { Chip } from 'react-native-paper';
import Spacer from './Spacer'

import { LogBox } from 'react-native';


const MyCourses = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    const screenHeight = Dimensions.get('window').height
 const courses = [{title:'Data Structures'},{title:'אלגברה 1'},{title:'אלגברה 2'},{title:'מבוא למדעי המחשב'},{title:'מערכות ספרתיות'},{title:'תכנות מערכות'},{title:'אלגברה לינארית'},{title:'אינפי 1'},{title:'אינפי 2'},{title:'אינפי 3'}]
  return(
    <View style={{ Height: "auto", maxHeight: screenHeight}}>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
  
        
      <Text h3 style={{marginRight:10,marginTop:10}}>מלמד:</Text>
      <TouchableOpacity >
      <View >
      <Text h3 style={{color:'black',fontSize:18,textAlign:'left'}}>עדכן</Text>
      </View>
      </TouchableOpacity>   
      <Spacer/>
    <View >
        <FlatList 
         contentContainerStyle={{flex:1, flexWrap:'wrap', flexDirection: 'row', alignItems: 'center',alignSelf:'stretch', justifyContent: 'flex-start'}}
          data={courses} renderItem={item=>{
            return(<Chip icon="close-circle" style={{marginVertical:10,marginHorizontal:0.5}}
             onPress={() => console.log('Pressed')}>
                 {item.item.title}</Chip>)}}
                  keyExtractor={item=>item.title}/>
  </View>
  
  </ScrollView>
  </View>

  )
  
};


export default MyCourses