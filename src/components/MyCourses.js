import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity , Dimensions} from 'react-native'
import {Text,Button} from 'react-native-elements';
import { Chip } from 'react-native-paper';
import Spacer from './Spacer';

import { LogBox } from 'react-native';



const MyCourses = () => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    const courses = [{title:'Data Structures'},{title:'אלגברה 1'},{title:'אלגברה 2'},{title:'מבוא למדעי המחשב'},{title:'מערכות ספרתיות'},{title:'תכנות מערכות'},{title:'אלגברה לינארית'},{title:'אינפי 1'},{title:'אינפי 2'},{title:'אינפי 3'}]
    const screenHeight = Dimensions.get('window').height
    const [isPressed, setIsPressed] = useState(false)
    const [course, setCourse ] = useState(courses)
    const togglePress = (item) =>setCourse(course.filter((other) => other.title!==item.item.title))
     const changeCourseList = () => {
       
     }
  return(
    <View >
      <Text h3 style={{marginRight:10,marginTop:10}}>מלמד:</Text>
      <TouchableOpacity 
      onPress={() => setIsPressed(isPressed => !isPressed)}
       >
      <View >
      <Text h3 style={{color:'black',fontSize:18,textAlign:'left'}}>עדכן</Text>
      </View>
      </TouchableOpacity>   
      <Spacer/>
    <View >
        <FlatList 
         contentContainerStyle={{flex:1, flexWrap:'wrap', flexDirection: 'row', alignItems: 'center',alignSelf:'stretch', justifyContent: 'flex-start'}}
          data={course} renderItem={item=>{
            return(<Chip
               style={{marginVertical:10,marginHorizontal:0.5}}
              onPress ={isPressed?() => togglePress(item):()=> console.log("pressed")}
              icon={isPressed&&"close-circle"}
              // disabled={!isPressed}
                    >
                 {item.item.title}</Chip>)}}
                  keyExtractor={item=>item.title}/>
  </View>
  </View>

  )
  
};


export default MyCourses