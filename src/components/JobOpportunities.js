import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Accordion } from 'native-base';
import { Text, Button, ListItem, Overlay } from 'react-native-elements';
import { Chip, TextInput } from 'react-native-paper'
import LessonRequestRowCard from './LessonRequestRowCard'
import DateTimePicker from '@react-native-community/datetimepicker';



const JobOpportunities = () => {

    // const offers = [
    //     { tutorID: "100", price: 100, date: new Date(), studentId: "101" },
    //     { tutorID: "102", price: 90, date: new Date(), studentId: "101" },
    //     { tutorID: "103", price: 70, date: new Date(), studentId: "101" }];

    const [requestToRespond, setRequestToRespond] = useState(null)
    const [timeToOffer, setTimeToOffer] = useState({ edit: false, time: null })
    const [offerPrice, setOfferPrice] = useState()

    const devGetRequests = () => {
        const start = new Date()
        let end = new Date(start)
        let start1 = new Date(start)
        let end1 = new Date(start)
        end.setHours(start.getHours() + 1)
        start1.setHours(start.getHours() + 2)
        end1.setHours(start.getHours() + 3)
        const request1 = {
            courseName: "DAST", subjects: ["AVL", "Heaps"], additionalInfo: "Be interesting",
            timeSlots:
                ['2020-12-10 10:00', '2020-12-10 11:00', '2020-12-10 12:00', '2020-12-10 13:00',
                    '2020-12-11 10:00', '2020-12-11 11:00', '2020-12-11 12:00', '2020-12-11 13:00'], lessonLength: 90,
        }
        const request2 = {
            courseName: "DAST", subjects: ["AVL", "Heaps"], additionalInfo: "Be interesting",
            timeSlots:
                ['2020-12-10 10:00', '2020-12-10 11:00', '2020-12-10 12:00', '2020-12-10 13:00',
                    '2020-12-11 10:00', '2020-12-11 11:00', '2020-12-11 12:00', '2020-12-11 13:00'], lessonLength: 90,
        }
        return [request1]
    }

    const minuteOfDay = (dateObject) => {
        return (dateObject.getHours() * 60) + dateObject.getMinutes();
    }

    const requests = devGetRequests()//repalce with server function

    const parseDate = (dateString) => {
        const dateArray = dateString.split(" ")
        let date = new Date(dateArray[0])
        const timeArray = dateArray[1
        ].split(":")
        date.setHours(parseInt(timeArray[0]))
        date.setMinutes(parseInt(timeArray[1]))
        return [dateArray[0], date]
    }

    const toTimeString = (time) => {
        console.log(time)
        let timeString = time.toLocaleTimeString();
        return timeString.substr(0, timeString.length - 3)
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

    // timeSlots:
    //   [{
    //     dateString: '2020-12-10', slots:
    //       [{ dateString: '2020-12-10', start: start, end: end },
    //        { dateString: '2020-12-10', start: start1, end: end1 }]
    //   }]


    const dataArray = []
    for (const request of requests) {
        dataArray.push({
            title: <Text>Course: {request.courseName}. Lesson length: {request.lessonLength}</Text>,
            content:
                <View>
                    <LessonRequestRowCard request={request} />
                    <Button title="Offer a lesson" onPress={() => { setRequestToRespond(fixReqeust(request)) }} />
                </View>
        })
    }

    return <>
        {requestToRespond ?
            <Overlay isVisible={true} onBackdropPress={() => { setRequestToRespond(null) }} overlayStyle={{ width: '80%', height: '70%' }}>
                <View>
                    <Text>When can you teach?</Text>
                    <FlatList
                        style={{ flexGrow: 0 }}
                        data={requestToRespond.timeSlots}
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
                                            <TouchableOpacity onPress={() => {
                                                let start = new Date(item.dateString)
                                                start.setHours(slot.item.start.getHours())
                                                start.setMinutes(slot.item.start.getMinutes())
                                                setTimeToOffer({ edit: true, time: start })
                                            }}>
                                                <View>
                                                    <Chip style={{ margin: 2, padding: 2, alignSelf: 'center' }}>{toTimeString(slot.item.start)}-{toTimeString(slot.item.end)}</Chip>
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }}
                                />
                            </View>
                        }}
                    />
                    {timeToOffer.time ? <View>
                        <Text>Lesson Date: {timeToOffer.time.toLocaleDateString()}</Text>
                        <Text>Lesson time: {toTimeString(timeToOffer.time)}</Text>
                        <Text>Lesson duartion: {requestToRespond.lessonLength}</Text>
                        <Text>Set price offer:</Text>
                        <TextInput
                            value={offerPrice}
                            placeholder="price"
                            onChangeText={newValue => setOfferPrice(parseInt(newValue))}
                            keyboardType={Platform.OS === 'ios' ? "number-pad" : "numeric"}
                        />
                        {offerPrice ? <Button title="submit" onPress={() => { }} /> : null}
                    </View> : null}


                </View>
            </Overlay>
            : null}
        {
            timeToOffer.edit ? <DateTimePicker
                value={timeToOffer.time}
                mode={"time"}
                minuteInterval={5}
                is24Hour={true}
                display="default"
                onChange={(event, dateObject) => {
                    if (dateObject) {
                        let minuteTime = minuteOfDay(dateObject)
                        if (minuteTime >= minuteOfDay(slot.start) && (minuteTime + requestToRespond.lessonLength <= minuteOfDay(slot.end))) {
                            setTimeToOffer({ time: dateObject, edit: false })
                        }
                        else {
                            console.log("out of range")
                            setTimeToOffer({ ...timeToOffer, edit: false })
                            // Message User
                        }
                    }
                    else {
                        setTimeToOffer({ ...timeToOffer, edit: false })
                    }
                }
                }
            /> : null
        }
        <Accordion dataArray={dataArray} expanded={0} />
    </>
    {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */ }

};



const styles = StyleSheet.create({});


export default JobOpportunities