import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity} from 'react-native'
import {Text,Button} from 'react-native-elements';
import { Chip, overlay } from 'react-native-paper';
import Spacer from './Spacer';



const CourseSelectionOverlay = () => {
    

    const courses = [{title:'Data Structures'},{title:'אלגברה 1'},{title:'אלגברה 2'},{title:'מבוא למדעי המחשב'},{title:'מערכות ספרתיות'},{title:'תכנות מערכות'},{title:'אלגברה לינארית'},{title:'אינפי 1'},{title:'אינפי 2'},{title:'אינפי 3'}];
    const [selectedCourses, setSelectedCourses ] = useState([]);

  return <>
  
  </>
  
};


export default CourseSelectionOverlay