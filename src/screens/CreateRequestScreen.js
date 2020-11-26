import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, FlatList, ScrollView, SafeAreaView, ImageBackground, Dimensions } from 'react-native'
import { Text } from 'react-native-elements'
import { Chip } from 'react-native-paper';
import { Overlay } from 'react-native-elements';
import { Button } from 'native-base';
import { Calendar } from 'react-native-calendars';
import { Context as UserContext } from '../context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import Spacer from '../components/Spacer';
import LessonLengthButtons from '../components/LessonLengthButtons'
import { Feather, Octicons } from '@expo/vector-icons'
import NewRequestMiddleware from './NewRequestMiddleware';

class CreateRequestScreen extends Component {

  static contextType = UserContext;
  constructor(props) {
    super(props);
    this.state = {
      iscoursesListVisible: false,
      iscalendarVisible: false,
      myAvailability: {},
      courseSelected: null,
      subjectsSelected: [],
      reqNotes: '',
      lessonLengthIndex: 0,
      lessonLength: 45,
      coursesITake: null,
      isSubmited: false,
      submitErr: '',
      userId: null
    }
  }

  async componentDidMount() {
    const UserContext = this.context;
    this.setState({ coursesITake: UserContext.state.user.coursesITake, userId: UserContext.state.user._id })
  }

  checkSubmit = () => {
    const { myAvailability, courseSelected, subjectsSelected } = this.state;
    if (courseSelected === null || subjectsSelected === [])
      this.setState({ submitErr: 'Pick A Course And Subjects Related' })
    else if (myAvailability === {})
      this.setState({ submitErr: 'Pick Data and Time' })
    else
      this.setState({ isSubmited: true })

  }

  resetAll = () =>{
    this.setState({isSubmited:false, subjectsSelected:[], courseSelected:null, 
      reqNotes:'', lessonLength:45,lessonLengthIndex:0, myAvailability:{}})
  }

  getAvailabilty = () => {
    let arr = []
    for (const property in this.state.myAvailability) {
      if (property !== 'slotToEdit') {
        arr.push({
          dateString: property,
          slots: this.state.myAvailability[property].slots,
          timesstamp: this.state.myAvailability[property].timesstamp
        })
      }
    }
    arr.sort(function (a, b) { return a.timesstamp - b.timesstamp });
    return arr
  }
  //const [selectedDate, setSelectedDate] = useState(null);
  setSelectedCourse(course) {
    const { hebName, engName, _id } = course
    if (this.state.courseSelected === null)
      this.setState({ courseSelected: { hebName, engName, _id } })
    else if (this.state.courseSelected.hebName !== course.hebName)
      this.setState({ courseSelected: { hebName, engName, _id }, subjectsSelected: [] })
  }
  subjectsToggle = (subject) => {
    this.state.subjectsSelected.some(selectedSubject => selectedSubject.engName === subject.engName) ?
      this.setState({ subjectsSelected: this.state.subjectsSelected.filter(selectedSubject => selectedSubject.engName !== subject.engName) }) :
      this.setState({ subjectsSelected: [...this.state.subjectsSelected, subject] })
  }

  setLessonLength = (index, val) => {
    this.setState({ lessonLengthIndex: index, lessonLength: val })
  }

  render() {
    const { submitErr, isSubmited, iscoursesListVisible, coursesITake, myAvailability, iscalendarVisible, courseSelected, subjectsSelected, reqNotes, lessonLengthIndex, lessonLength, userId } = this.state;
    const MAXIMUM_DAYS = 3
    const MAXIMUM_TIME_SLOTS = 2
    const MILLISECONDS_IN_MINUTE = 60 * 1000
    return (
      <>
        <ImageBackground source={require('../../assets/signInBackground.png')} imageStyle={{ resizeMode: 'cover' }} style={{
          width: Dimensions.get('window').width,
          height: Dimensions.get('window').height
        }}>
          <Overlay overlayStyle={{ width: 300, height: 600 }} onBackdropPress={() => this.setState({ iscoursesListVisible: !iscoursesListVisible })}
            visible={iscoursesListVisible}>
            <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', justifyContent: 'flex-start', bottom: 0 }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {coursesITake && coursesITake.map((course => {
                  return (
                    <Chip style={courseSelected ? course.hebName === courseSelected.hebName && styles.selectedChip : styles.chip}
                      onPress={() => this.setSelectedCourse(course)}>
                      {course.hebName}
                    </Chip>
                  )
                }))}
              </ScrollView>
            </View>
            <Spacer />
            <View style={{ flex: 1.5, flexWrap: 'wrap', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                {coursesITake && courseSelected && coursesITake.map((course) => course.hebName === courseSelected.hebName && course.subjects.
                  map(subject => {
                    return (
                      <Chip
                        style={subjectsSelected&&subjectsSelected.some(selectedSubject => selectedSubject.engName === subject.engName)
                          ? styles.selectedChip : styles.chip}
                        onPress={() => this.subjectsToggle(subject)} >
                        {subject.hebName !== '' ? subject.hebName : subject.engName}
                      </Chip>)
                  }))}
              </ScrollView>
            </View>
          </Overlay>
          <View style={{ flex: 1 }}>
            <SafeAreaView>
              <ScrollView>
                <Spacer />
                <Button bordered rounded style={{ alignSelf: 'center' }} onPress={() => this.setState({ iscoursesListVisible: !iscoursesListVisible })}>
                  <Text style={{ paddingHorizontal: 3 }}>Choose Course And Subjects</Text>
                </Button>
                <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'row' }}>
                  <Text h4>Course:</Text>
                  {courseSelected && <Chip style={{ justifyContent: 'flex-start' }}>{courseSelected.hebName}</Chip>}
                </View>
                <Spacer />
                <View style={{ alignSelf: 'flex-start', flex: 1, flexWrap: 'wrap', flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-start' }}>
                  <Text h4 style={{ alignSelf: 'center' }}>Subjects: </Text>
                  {subjectsSelected&&subjectsSelected.map(subject => {
                    return (<Chip style={{ marginHorizontal: 4, marginVertical: 5 }}>
                      {subject.hebName !== '' ? subject.hebName : subject.engName}
                    </Chip>)
                  })}
                </View>
                <LessonLengthButtons selected={lessonLengthIndex} setSelected={this.setLessonLength} />
                <Spacer />
                <TextInput
                  multiline={true}
                  placeholder="Lesson notes (optional)"
                  numberOfLines={4}
                  value={reqNotes}
                  onChangeText={(newNote) => this.setState({ reqNotes: newNote })}
                />
                <Text style={{ fontWeight: 'bold', alignSelf: 'center' }}>Select availability windows:</Text>
                <Button style={{ alignSelf: 'center', marginTop: 10 }} rounded bordered onPress={() => { this.setState({ iscalendarVisible: !iscalendarVisible }) }} >
                  <Text style={{ paddingHorizontal: 3 }}>Open Calendar</Text>
                </Button>


                <Overlay visible={iscalendarVisible} onBackdropPress={() => this.setState({ iscalendarVisible: !iscalendarVisible })}>
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
                          this.setState({ myAvailability: { newAvailability } })
                        }
                        else {
                          if (Object.keys(myAvailability).length < MAXIMUM_DAYS) {
                            const mil_since_1970 = (new Date()).getTime()
                            const mil_in_5_min = 5 * MILLISECONDS_IN_MINUTE
                            const close_5_mil = Math.ceil(mil_since_1970 / mil_in_5_min) * mil_in_5_min
                            this.setState({
                              myAvailability: {
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
                      this.setState({
                        myAvailability: {
                          ...myAvailability, slotToEdit: null,
                          [slot.dateString]: { ...myAvailability[slot.dateString], slots: newSlots }
                        }
                      })
                    }
                    else {
                      this.setState({
                        myAvailability: {
                          ...myAvailability, slotToEdit: null
                        }
                      })

                    }
                  }
                  }
                /> : null}
                <FlatList
                  data={this.getAvailabilty()}
                  keyExtractor={(item) => item.dateString}
                  renderItem={({ item }) => {
                    return <View>
                      <Text style={{ alignSelf: 'center' }}>{item.dateString}</Text>

                      <FlatList
                        data={item.slots}
                        listKey={item.dateString}
                        keyExtractor={(slot) => slot.start.toString()}
                        renderItem={(slot) => {
                          return <View style={{ borderColor: 'black', borderWidth: 1, margin: 2, padding: 2 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  this.setState({
                                    myAvailability: {
                                      ...myAvailability, slotToEdit: {
                                        dateString: slot.item.dateString,
                                        start: slot.item.start,
                                        end: slot.item.end,
                                        edit: 'start'
                                      }
                                    }
                                  })
                                }}>
                                  <Text>Start: {slot.item.start.toLocaleTimeString()}</Text>
                                  <Feather name='edit' style={styles.iconStyle} />
                                </TouchableOpacity>
                              </View>
                              <View>
                                <TouchableOpacity onPress={() => {
                                  this.setState({
                                    myAvailability: {
                                      ...myAvailability, slotToEdit: {
                                        dateString: slot.item.dateString,
                                        start: slot.item.start,
                                        end: slot.item.end,
                                        edit: 'end'
                                      }
                                    }
                                  })
                                }}>
                                  <Text>end: {slot.item.end.toLocaleTimeString()}</Text>
                                  <Feather name='edit' style={styles.iconStyle} />
                                </TouchableOpacity></View></View>
                            <TouchableOpacity onPress={() => {
                              let newSlots = item.slots.filter((other) => other.start !== slot.item.start)
                              if (newSlots.length === 0) {
                                let newAvailability = { ...myAvailability }
                                delete newAvailability[slot.item.dateString]
                                this.setState({ myAvailability: newAvailability })
                              }
                              else {
                                let newAvailability = {
                                  ...myAvailability,
                                  [slot.item.dateString]: { ...myAvailability[slot.item.dateString], slots: newSlots }
                                }
                                this.setState({ myAvailability: newAvailability })
                              }
                            }}>
                              <Feather name="x-circle" style={styles.iconStyle} />
                            </TouchableOpacity>
                          </View>
                        }}
                      />
                      {item.slots.length < MAXIMUM_TIME_SLOTS ?
                        <TouchableOpacity onPress={() => {
                          const newStart = new Date(item.slots[0].end.getTime() + (60 * MILLISECONDS_IN_MINUTE))
                          const newEnd = new Date(item.slots[0].end.getTime() + (120 * MILLISECONDS_IN_MINUTE))
                          let newSlots = [...item.slots, { start: newStart, end: newEnd, dateString: item.dateString }]
                          this.setState({
                            myAvailability: {
                              ...myAvailability,
                              [item.dateString]: { ...myAvailability[item.dateString], slots: newSlots }
                            }
                          })
                        }}>
                          <Feather name="plus" style={styles.iconStyle} />
                        </TouchableOpacity>
                        : null}
                    </View>
                  }}
                />

                {submitErr !== '' && <Text style={{ alignSelf: 'center', color: 'red', fontWeight: 'bold' }}>{submitErr}</Text>}
                <Button style={{ alignContent: 'center', alignSelf: 'center' }} rounded bordered
                  onPress={() => this.checkSubmit()}>
                  <Text style={{ fontWeight: 'bold', paddingHorizontal: 3 }}>Submit</Text>
                </Button>
                <View style={{ height: 50 }} />
                {isSubmited && <NewRequestMiddleware userId={userId} additionalInfo={reqNotes} course={courseSelected} lessonLength={lessonLength} subjects={subjectsSelected} timeSlots={myAvailability} resetFunc={this.resetAll} />}
              </ScrollView>
            </SafeAreaView>
          </View>
        </ImageBackground>
      </>
      /* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */
    )
  }
}


CreateRequestScreen.navigationOptions = {
  tabBarIcon: <Octicons name="diff-added" size={26} />
};


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
  },
  chip: {
    marginVertical: 10
  },
  selectedChip: {
    marginVertical: 10,
    backgroundColor: '#a7cfbc'
  }

});


export default CreateRequestScreen;
