/* eslint-disable max-len */
import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import {Chip} from 'react-native-paper';

const LessonRequestRowCard = ({ request }) => {


  const toTimeString = (time) => {
    let timeString = time.toLocaleTimeString();
    return timeString.substr(0, timeString.length - 3)
  }


  const parseDate = (dateString) => {
    const dateArray = dateString.split(" ")
    let date = new Date(dateArray[0])
    const timeArray = dateArray[1
    ].split(":")
    date.setHours(parseInt(timeArray[0]))
    date.setMinutes(parseInt(timeArray[1]))
    return [dateArray[0], date]
  }

  const fixReqeust = (requestToFix) => {
    let allslots = []
    const slotsToFix = requestToFix.timeSlots
    for (i = 0; i < slotsToFix.length; i += 2) {
      let startArr = parseDate(slotsToFix[i])
      let dateString = startArr[0]
      let start = startArr[1]
      let end = parseDate(slotsToFix[i + 1])[1]
      allslots.push({ dateString: dateString, start: start, end: end })
    }
    const fixedslots = []
    for (let slot of allslots) {
      let findObj = fixedslots.filter((other) => other.dateString === slot.dateString)
      if (findObj.length === 0) {
        fixedslots.push({ dateString: slot.dateString, slots: [slot] })
      }
      else {
        findObj[0].slots.push(slot)
      }
    }
    return { ...requestToFix, timeSlots: fixedslots }
  }

  let fixedRequest = fixReqeust(request)
  return <>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <View style={{ alignItems: 'flex-start', marginRight: 10, flex: 1 }}>
        <Text>Subjects:</Text>
        <FlatList
          style={{ flexGrow: 0 }}
          horizontal={true}
          data={fixedRequest.subjects}
          keyExtractor={(item) => item}
          renderItem={({ item }) => {
            return (
              <Chip style={{ alignSelf: 'flex-start' }}>{item.hebName!==''?item.hebName:item.engName}</Chip>)
          }}
        />
        {fixedRequest.additionalInfo ?<View>
          <Text>Additional notes:</Text>
          <Text>{fixedRequest.additionalInfo}</Text>
        </View> : null}
      </View>
      <View>
        <Text>Availability:</Text>
        <FlatList
          data={fixedRequest.timeSlots}
          keyExtractor={(item) => item.dateString}
          renderItem={({ item }) => {
            return <View>
              <Chip style={{ alignSelf: 'center' }}>{item.dateString}</Chip>
              <FlatList
                horizontal={true}
                data={item.slots}
                listKey={item.dateString}
                key={item.dateString}
                keyExtractor={(slot) => slot.start.toString()}
                renderItem={(slot) => {
                  return (
                    <View>
                      <Chip style={{ margin: 2, padding: 2, alignSelf: 'center' }}>{toTimeString(slot.item.start)}-{toTimeString(slot.item.end)}</Chip>
                    </View>
                  )
                }}
              />
            </View>
          }}
        />
      </View>
    </View>
    {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */}
  </>

};


export default LessonRequestRowCard