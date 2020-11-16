import React , { useContext,useState } from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity, FlatList} from 'react-native'
import FilterSelection from '../components/FilterSelection';
import { Overlay } from 'react-native-elements';
import { Textarea } from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {Feather} from '@expo/vector-icons'

const CreateRequestScreen = () =>{
    const [myCourse, setMyCourse] = useState("");
    const [mySubjects, setMySubjects] = useState([]);
    const [myAvailability, setMyAvailability] = useState({});
    const [myNotes, setMyNotes] = useState("");
    const [currentComponent, setcurrentComponent] = useState("courseSelection");
    const courses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב','מערכות ספרתיות','תכנות מערכות','אלגברה לינארית','אינפי 1','אינפי 2','אינפי 3'];
    const intialCourses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב'];
    const subjects = ['AVL','Binary Tree', 'Linear-Search','Big O', 'Object Oriented','Recursion']
    const MAXIMUM_DAYS=3

    console.log(myAvailability)
    const getAvailabilty = () =>{
      let arr = []
      for (const property in myAvailability) {
        arr.push({
           date: property,
           slots: myAvailability[property].slots,
           timesstamp: myAvailability[property].timesstamp})
      }
      arr.sort(function(a, b){return a.timesstamp - b.timesstamp});
      console.log(arr)
      return arr
    }
    return (
    <>
        <Overlay isVisible={currentComponent!=="Done"}>
            <View style={{width:300, height:"100%"}}>
            {currentComponent==="subjectsSelection"?<Button title="חזור" onPress={()=>{
                    setcurrentComponent("courseSelection")}}/>:null}
            {currentComponent==="courseSelection"?<FilterSelection
            multi={false}
            placeHolder="איזה קורס נלמד היום?"
            dataToFilter={courses}
            intialData={intialCourses}
            selectedItem={myCourse}
            setSelectedItem={setMyCourse}
            onFinish={
                ()=>{
                    setcurrentComponent("subjectsSelection")
                    }}/>:null
                }
                {currentComponent==="subjectsSelection"?<FilterSelection
                multi={true}
                placeHolder="אילו נושאים נלמד היום??"
                intialData={subjects}
                dataToFilter={subjects}
                selectedItem={mySubjects}
                setSelectedItem={setMySubjects}
                onFinish={
                    ()=>{setcurrentComponent("Done")}
                }/>:null}
                </View>
        </Overlay>
        <Button title="revise course and subject selection" onPress={()=>{setcurrentComponent("courseSelection")}}/>
        <Text>course: {myCourse}</Text>
        <Text>subjects: {mySubjects}</Text>
        <Textarea rowSpan={5} bordered placeholder="reqeust notes (optional)"/>

        <Calendar
        markedDates={myAvailability}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={Date()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2021-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          if (myAvailability[day.dateString]){
            console.log("delete")
            let newAvailability = {...myAvailability}
            delete newAvailability[day.dateString]
            setMyAvailability(newAvailability)
          }
          else{
            if (Object.keys(myAvailability).length < MAXIMUM_DAYS)
            {
            console.log("added")
            setMyAvailability({...myAvailability, [day.dateString]:{selected:true, slots:[], timesstamp:[day.timestamp]}})
            }
            else{
              console.log("too many")
              //message
            }
          }
        }}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />

        <FlatList
        data={getAvailabilty()}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
            return <Text>{item.date}</Text>
            // <View>
            //           <TouchableOpacity>
                        
            //           </TouchableOpacity>
            //        </View>
        }}
        />
          {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[] */}
    </>
    )
    

}

const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
      },
        inputStyle: {
            flex: 1,
            fontSize: 18
        },
        iconStyle: {
          fontSize: 35,
          alignSelf: 'center',
          marginHorizontal: 15
        }
});


export default CreateRequestScreen;
