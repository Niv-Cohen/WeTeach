import React , { useContext,useState } from 'react';
import {View,Text,StyleSheet, Button, TouchableOpacity} from 'react-native'
import FilterSelection from '../components/FilterSelection';
import { Overlay } from 'react-native-elements';
import { Container, Header, Content, Textarea, Form, DatePicker } from "native-base";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomMultiPicker from "react-native-multiple-select-list";
import { ScrollView, FlatList } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons'

const CreateRequestScreen = () =>{
    const [myCourse, setMyCourse] = useState("");
    const [mySubjects, setMySubjects] = useState([]);
    const [myTimeSlots, setMyTimeSlots] = useState([]);
    const [myNotes, setMyNotes] = useState("");
    const [currentComponent, setcurrentComponent] = useState("courseSelection");
    const courses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב','מערכות ספרתיות','תכנות מערכות','אלגברה לינארית','אינפי 1','אינפי 2','אינפי 3'];
    const intialCourses = ['Data Structures','אלגברה 1','אלגברה 2','מבוא למדעי המחשב'];
    const subjects = ['AVL','Binary Tree', 'Linear-Search','Big O', 'Object Oriented','Recursion']
    const MAXIMUM_DAYS=3

    const addDate=(newDate)=>{
      if (myTimeSlots.length<MAXIMUM_DAYS-1)
      {
        setMyTimeSlots([...myTimeSlots,{date:newDate, timeWindows:[]}, {date:Date(), timeWindows:[]}])
      }
      else
      {
        setMyTimeSlots([...myTimeSlots,{date:newDate, timeWindows:[]}])
      }
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
                placeHolder="איזה נושאים נלמד היום??"
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
        // Initially visible month. Default = Date()
        // current={'2012-03-01'}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={Date()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={'2021-05-30'}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {console.log('selected day', day)}}
        // Handler which gets executed on day long press. Default = undefined
        // onDayLongPress={(day) => {console.log('selected day', day)}}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={'yyyy MM'}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        // onMonthChange={(month) => {console.log('month changed', month)}}
        // Hide month navigation arrows. Default = false
        // hideArrows={true}
        // Replace default arrows with custom ones (direction can be 'left' or 'right')
        // renderArrow={(direction) => (<Arrow/>)}
        // Do not show days of other months in month page. Default = false
        // hideExtraDays={true}
        // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
        // day from another month that is visible in calendar page. Default = false
        // disableMonthChange={true}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
        firstDay={0}
        // Hide day names. Default = false
        // hideDayNames={true}
        // Show week numbers to the left. Default = false
        // showWeekNumbers={true}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={subtractMonth => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={addMonth => addMonth()}
        // Disable left arrow. Default = false
        // disableArrowLeft={true}
        // Disable right arrow. Default = false
        // disableArrowRight={true}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Replace default month and year title with custom one. the function receive a date as parameter.
        // renderHeader={(date) => {/*Return JSX*/}}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
        {/* {myTimeSlots.length<3?:null} */}

        <FlatList
        data={myTimeSlots}
        keyExtractor={(item) => item.date}
        renderItem={({ item }) => {
            return (<View style={{borderWidth:1}}>
                      
                      <TouchableOpacity onPress={()=>{

                      }}>
                        <Feather name="edit" style={styles.iconStyle} />
                      </TouchableOpacity>

                      {/* <TouchableOpacity onPress={()=>{}}>
                        <Feather name="remove" style={styles.iconStyle} />
                      </TouchableOpacity> */}
                      {/* <TouchableOpacity onPress={()=>{}}>
                        <Feather name="x-circle" style={styles.iconStyle} />
                      </TouchableOpacity> */}
                      <Text>
                          {/* {item.date.toDateString()} */}
                          hi
                      </Text>
                    </View>
            );
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
