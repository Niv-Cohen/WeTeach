import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList, ScrollView } from 'react-native'
import FilterSelection from '../components/FilterSelection';
import { Overlay } from 'react-native-elements';
import TwoRadioButtons from '../components/TwoRadioButtons'
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons'
// import TimePicker from 'react-native-simple-time-picker';


import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
var moment = require('moment')



const CreateRequestScreen = () => {
  const [myCourse, setMyCourse] = useState("");
  const [mySubjects, setMySubjects] = useState([]);
  const [myAvailability, setMyAvailability] = useState({});
  const [myNotes, setMyNotes] = useState("");
  const [mylengthRadio, setMyLengthRadio] = useState({ radio1: true, radio2: false })
  const [myDoubleLessonRadio, setMyDoubleLessonRadio] = useState({ radio1: true, radio2: false })
  const [currentComponent, setcurrentComponent] = useState("courseSelection");
  const courses = ['Data Structures', 'אלגברה 1', 'אלגברה 2', 'מבוא למדעי המחשב',
    'מערכות ספרתיות', 'תכנות מערכות', 'אלגברה לינארית', 'אינפי 1', 'אינפי 2', 'אינפי 3'];
  const intialCourses = ['Data Structures', 'אלגברה 1', 'אלגברה 2', 'מבוא למדעי המחשב'];
  const subjects = ['AVL', 'Binary Tree', 'Linear-Search', 'Big O', 'Object Oriented', 'Recursion']
  const MAXIMUM_DAYS = 3
  const MAXIMUM_TIME_SLOTS = 2
  const MILLISECONDS_IN_MINUTE = 60 * 1000

  const getAvailabilty = () => {
    let arr = []
    for (const property in myAvailability) {
      if (property !== 'slotToEdit') {
        arr.push({
          dateString: property,
          slots: myAvailability[property].slots,
          timesstamp: myAvailability[property].timesstamp
        })
      }
    }
    arr.sort(function (a, b) { return a.timesstamp - b.timesstamp });
    return arr
  }
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <>
      <Overlay isVisible={currentComponent !== "Done" && currentComponent !== "calendar"}>
        <View style={{ width: 300, height: "100%" }}>
          {currentComponent === "subjectsSelection" ? <Button title="back" onPress={() => {
            setcurrentComponent("courseSelection")
          }} /> : null}
          {currentComponent === "courseSelection" ? <FilterSelection
            multi={false}
            placeHolder="What course shall we study today?"
            dataToFilter={courses}
            intialData={intialCourses}
            selectedItem={myCourse}
            setSelectedItem={setMyCourse}
            onFinish={
              () => {
                setcurrentComponent("subjectsSelection")
              }} /> : null
          }
          {currentComponent === "subjectsSelection" ? <FilterSelection
            multi={true}
            placeHolder="which subjects shall we study today?"
            intialData={subjects}
            dataToFilter={subjects}
            selectedItem={mySubjects}
            setSelectedItem={setMySubjects}
            onFinish={
              () => { setcurrentComponent("Done") }
            } /> : null}
        </View>
      </Overlay>
      <ScrollView>
        <Button title="Revise course and subject selection" onPress={() => {
          setcurrentComponent("courseSelection")
        }} />
        <Text>course: {myCourse}</Text>
        <Text>subjects: {mySubjects}</Text>
        <TwoRadioButtons
          header="Lesson duration"
          firstString="45 minutes"
          secondString="60 minutes"
          selected={mylengthRadio}
          setSelected={setMyLengthRadio} />
          {/* disappears for some reason */}

        <TwoRadioButtons
          header="Regular or double lesson?"
          firstString="Regular lesson"
          secondString="double lesson"
          selected={myDoubleLessonRadio}
          setSelected={setMyDoubleLessonRadio} />

        <TextInput
          multiline={true}
          placeholder="Lesson notes (optional)"
          numberOfLines={4}
          value={myNotes}
          onChangeText={(newNote) => { setMyNotes(newNote) }}
        />
        <Button title="Show calendar" onPress={() => { setcurrentComponent("calendar") }} />
        <Overlay visible={currentComponent == "calendar"}>
          <View>
            <Calendar
              markedDates={myAvailability}
              // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
              minDate={Date()}
              // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
              // maxDate={new Date((new Date).getTime() + MILLISECONDS_IN_MINUTE)}
              // Handler which gets executed on day press. Default = undefined
              onDayPress={(day) => {
                if (myAvailability[day.dateString]) {
                  let newAvailability = { ...myAvailability }
                  delete newAvailability[day.dateString]
                  setMyAvailability(newAvailability)
                }
                else {
                  if (Object.keys(myAvailability).length < MAXIMUM_DAYS) {
                    const mil_since_1970 = (new Date()).getTime()
                    const mil_in_5_min = 5 * MILLISECONDS_IN_MINUTE
                    const close_5_mil = Math.ceil(mil_since_1970 / mil_in_5_min) * mil_in_5_min
                    setMyAvailability({
                      ...myAvailability,
                      [day.dateString]: {
                        selected: true,
                        slots: [{
                          start: new Date(close_5_mil),
                          end: new Date(close_5_mil + (60 * MILLISECONDS_IN_MINUTE)),
                          dateString: day.dateString
                        }],
                        timesstamp: [day.timestamp]
                      }
                    })
                  }
                  else {
                    console.log("too many")
                    //message toast
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
            <Button title="Hide Calendar" onPress={() => { setcurrentComponent("Done") }} />
          </View>
        </Overlay>
        {myAvailability.slotToEdit ? <DateTimePicker
          value={
            myAvailability.slotToEdit.edit === 'start' ?
              myAvailability.slotToEdit.start :
              myAvailability.slotToEdit.end
          }
          mode={"time"}
          minuteInterval={5}
          is24Hour={true}
          display="default"
          onChange={(event, dateObject) => {
            if (dateObject) {
              const slot = myAvailability.slotToEdit
              const editStart = slot.edit === 'start'
              let newSlots = myAvailability[slot.dateString].slots.filter((other) => other.start !== slot.start)
              newSlots.push({
                start: editStart ? dateObject : slot.start,
                end: editStart ? slot.end : dateObject,
                dateString: slot.dateString
              })
              setMyAvailability({
                ...myAvailability, slotToEdit: null,
                [slot.dateString]: { ...myAvailability[slot.dateString], slots: newSlots }
              })
            }
            else {
              setMyAvailability({
                ...myAvailability, slotToEdit: null
              })

            }
          }
          }
        /> : null}
        <FlatList
          data={getAvailabilty()}
          keyExtractor={(item) => item.dateString}
          renderItem={({ item }) => {
            return <View>
              <Text>{item.dateString}</Text>

              <FlatList
                data={item.slots}
                listKey={item.dateString}
                keyExtractor={(slot) => slot.start.toString()}
                renderItem={(slot) => {
                  return <View style={{ borderBottomColor: 'black', borderWidth: 1 }}>
                    <TouchableOpacity onPress={() => {
                      setMyAvailability({
                        ...myAvailability, slotToEdit: {
                          dateString: slot.item.dateString,
                          start: slot.item.start,
                          end: slot.item.end,
                          edit: 'start'
                        }
                      })
                    }}>
                      <Text>Start: {slot.item.start.toLocaleTimeString()}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                      setMyAvailability({
                        ...myAvailability, slotToEdit: {
                          dateString: slot.item.dateString,
                          start: slot.item.start,
                          end: slot.item.end,
                          edit: 'end'
                        }
                      })
                    }}>
                      <Text>end: {slot.item.end.toLocaleTimeString()}</Text>
                    </TouchableOpacity>
                    <Button title="remove time slot" onPress={() => {
                      let newSlots = item.slots.filter((other) => other.start !== slot.item.start)
                      if (newSlots.length === 0) {
                        let newAvailability = { ...myAvailability }
                        delete newAvailability[slot.item.dateString]
                        setMyAvailability(newAvailability)
                      }
                      else {
                        let newAvailability = {
                          ...myAvailability,
                          [slot.item.dateString]: { ...myAvailability[slot.item.dateString], slots: newSlots }
                        }
                        setMyAvailability(newAvailability)
                      }
                    }} />
                    {/* <TouchableOpacity>
                      <Feather name="x-circle" style={styles.iconStyle} />
                    </TouchableOpacity> */}
                  </View>
                }}
              />
              {item.slots.length < MAXIMUM_TIME_SLOTS ?
                <Button title="add time slot" onPress={() => {
                  newStart = new Date(item.slots[0].end.getTime() + (60 * MILLISECONDS_IN_MINUTE))
                  newEnd = new Date(item.slots[0].end.getTime() + (120 * MILLISECONDS_IN_MINUTE))
                  let newSlots = [...item.slots, { start: newStart, end: newEnd, dateString: item.dateString }]
                  setMyAvailability({
                    ...myAvailability,
                    [item.dateString]: { ...myAvailability[item.dateString], slots: newSlots }
                  })
                }} />
                // <TouchableOpacity>
                //   <Feather name="plus" style={styles.iconStyle} />
                // </TouchableOpacity>
                : null}
            </View>
          }}
        />
        {Object.keys(myAvailability).length > 0 ? <Button title="create request" onPress={() => {/*show summary overlay and then some server magic happens*/ }} /> : null}
      </ScrollView>
      {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */}
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
