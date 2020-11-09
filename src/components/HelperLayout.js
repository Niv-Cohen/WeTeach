import React, {useState} from 'react'
import { FlatList, StyleSheet,TouchableOpacity,View, Text , Button} from 'react-native';
import { Overlay } from 'react-native-elements';
import Hr from 'react-native-hr-component';
import MyCourses from './MyCourses';



const HelperLayout = ()=>{

    const [visible, setVisible] = useState(false);

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const [selectedCourse, setSelectedCourse] = useState({title:"",subjects:["fdsfds","fdafds"]});

    const [selectedSubjects, setSelectedSubjects] = useState([]);
    
    
    const isSelected = (subject) => {
        for (let selectedSubject of selectedSubjects)
        {
            if (selectedSubject === subject)
            {
                return true;
            }
        }
        return false;
    }

    const toggleSOverlay = () => {
        setSVisible(!visible);
    };

    const courses = [
        {title:'Data Structures', subjects:['AVL','Binary Tree']},
        {title:'אלגברה 1', subjects:['Linear-Search','Big O']},
        {title:'אלגברה 2', subjects:['Object Oriented','Recursion']},
        {title:'מבוא למדעי המחשב', subjects:['AVL','Binary Tree']},
        {title:'מערכות ספרתיות', subjects:['Linear-Search','Big O']},
        {title:'תכנות מערכות', subjects:['Object Oriented','Recursion']},
        {title:'אלגברה לינארית', subjects:['AVL','Binary Tree']},
        {title:'אינפי 1', subjects:['Linear-Search','Big O']},
        {title:'אינפי 2', subjects:['Object Oriented','Recursion']},
        {title:'אינפי 3', subjects:['AVL','Binary Tree']}
    ]

    const subjectes = [
        {title:'AVL'},
        {title:'Binary Tree'},
        {title:'Linear-Search'}
        ,{title:'Big O'},
        {title:'Object Oriented'},
        {title:'Recursion'}]
        
    return(
        <View>
            <Button title ="helper" onPress={toggleOverlay}/> 
            <Overlay 
                isVisible={visible} 
                onBackdropPress={toggleOverlay}
                animationType="zoomIn"
                containerStyle={{backgroundColor: 'rgba(37, 8, 10, 0.78)'}}
            >
                <FlatList 
                    data={courses}
                    renderItem={({item})=>{
                       return <TouchableOpacity 
                                onPress={()=>{
                                    setSelectedCourse(item);
                                }}>
                                    <Text
                                        // style= {item.title===selectedCourse.title?styles.selectedCourseStyle:styles.notSelectedCourseStyle} 
                                    >
                                    {item.title}
                                    </Text>
                                </TouchableOpacity>
                    }}
                    keyExtractor={(course)=>course.title}
                />
                <Hr lineColor="#eee" width={1} text="Dummy Text!" textStyles={styles.customStylesHere} />
                {/* {selectedCourse.title?:null} */}
                <FlatList
                    data={selectedCourse.subjects}
                    renderItem={({item})=>{
                        return <TouchableOpacity
                                onPress={()=>{
                                    if (isSelected(item))
                                    {
                                        setSelectedSubjects(selectedSubjects.filter((other) => other!==item))
                                    }
                                    else
                                    {
                                        setSelectedSubjects([...selectedSubjects    , item])
                                    }
                                }}>
                                <Text 
                                style={isSelected(item)?styles.selectedCourseStyle:styles.notSelectedCourseStyle}
                                >
                                     {item}
                                </Text>
                            </TouchableOpacity>
                    }}
                />
            </Overlay>
        </View>
    );
};

const styles = StyleSheet.create({
    layStyle:{
        borderWidth: 2,
        fontSize: 100
    },
    customStylesHere: {
        fontWeight: "bold",
        color: "red"
    },
    selectedCourseStyle: {
        fontWeight: "bold",
        color: "blue"
    },
    notSelectedCourseStyle: {
        fontWeight: "normal",
        color: "green"
    },
    coursListStyle:{
        marginVertical:10
    }
})

export default HelperLayout