import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity} from 'react-native'
import {Text,Button,Overlay} from 'react-native-elements';
import { Chip, overlay } from 'react-native-paper';
import Spacer from './Spacer';



const CourseSelectionOverlay = () => {
    

    const courses = [{title:'Data Structures'},{title:'אלגברה 1'},{title:'אלגברה 2'},{title:'מבוא למדעי המחשב'},{title:'מערכות ספרתיות'},{title:'תכנות מערכות'},{title:'אלגברה לינארית'},{title:'אינפי 1'},{title:'אינפי 2'},{title:'אינפי 3'}];
    const [selectedCourses, setSelectedCourses ] = useState([]);
    console.log(selectedCourses)

    const isSelected = (courseTitle) => {
        for (let selectedCourse of selectedCourses)
        {
            if (selectedCourse === courseTitle)
            {
                return true;
            }
        }
        return false;
    }

  return <>
  <Overlay isVisible={true}>
    <View>
          <FlatList
          contentContainerStyle={{flex:1, flexWrap:'wrap', flexDirection: 'row', alignItems: 'center',alignSelf:'stretch', justifyContent: 'flex-start'}}
          data={courses}
          renderItem={({item})=>{
              return <>
              <Chip
              ref={item}
              style={{marginVertical:10,marginHorizontal:0.5}}
              mode='outlined'

              onPress ={() => {
                  if (isSelected(item.title))
                  {
                      setSelectedCourses(selectedCourses.filter((other) => other!==item.title))
                  }
                  else
                  {
                      setSelectedCourses([...selectedCourses, item.title])
                  }
                }}
        
                //selectedColor='rgb(179, 230, 255)'
                selected={isSelected(item.title)}
                >{item.title}</Chip>
                </>
                }}
            keyExtractor={item=>item.key}/>  
      </View>
  </Overlay>
  </>
  
};


export default CourseSelectionOverlay