import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Accordion } from 'native-base';
import { Text, Button, ListItem, Overlay } from 'react-native-elements';
import { Calendar } from 'react-native-calendars';
import LessonRequestRowCard from './LessonRequestRowCard'



const JobOpportunities = () => {
    const start = new Date()
    let end = new Date(start)
    let start1 = new Date(start)
    let end1 = new Date(start)
    end.setHours(start.getHours() + 1)
    start1.setHours(start.getHours() + 2)
    end1.setHours(start.getHours() + 3)
    const request1 = {
        courseName: "DAST", subjects: ["AVL", "Heaps"], additionalInfo: "Be interesting", timeSlots:
            ['2020-12-10 10:00', '2020-12-10 11:00', '2020-12-10 12:00', '2020-12-10 13:00',
                '2020-12-11 10:00', '2020-12-11 11:00', '2020-12-11 12:00', '2020-12-11 13:00'], lessonLength: 90,
    }
    const requests = [request1, request1]
    const offers = [
        { tutorID: "100", price: 100, date: new Date(), studentId: "101" },
        { tutorID: "102", price: 90, date: new Date(), studentId: "101" },
        { tutorID: "103", price: 70, date: new Date(), studentId: "101" }];
    const tutorInfos = {
        "100": {
            name: "Michael Avraham",
            coursesITeach: ["אינפי 1", "אינפי 2"],
            institution: "אוניברסיטת בן גוריון שבנגב",
            Degree: "מדעי במחשב",
            about: "מכל מלמדי השכלתי"
        },
        "102": {
            name: "Yossi Bitton",
            coursesITeach: ["כימיה אורגנית", "ביולוגיה של התא"],
            institution: "אוניברסיטת תל אביב",
            Degree: "מדעי החי",
            about: "מכל המורים שלי השכלתי"
        },
        "103": {
            name: "Yair Sivan",
            coursesITeach: ["סוגיות של צדק ביחסים בין לאומיים", "מבוא לפילוסופיה"],
            institution: "טכניון",
            Degree: "מדעי המדינה",
            about: "אין חכם כבעל ניסיון"
        }
    }

    const [requestToRespond, setRequestToRespond] = useState(null)

    useEffect(() => {
        //get requests
    }, [])

    const getUniqueDateStringsFromRequests = (request) => {
        let uniqueDateStrings = new Set()
        for (let dateString of request.timeSlots) {
            uniqueDateStrings.add(dateString.split(" ")[0])
        }
        console.log(uniqueDateStrings)
        // return Array.from(uniqueDateStrings)
        return ["fsd", "fdsaf", "fdsad"]
    }

    const dataArray = []
    for (request of requests) {
        dataArray.push({
            title: <Text>Course: {request.courseName}. Lesson length: {request.lessonLength}</Text>,
            content:
                <View>
                    <LessonRequestRowCard request={request} />
                    <Button title="Offer a lesson" onPress={() => { setRequestToRespond(request) }} />
                </View>
        })
    }
    return <>
        {requestToRespond ?
            <Overlay>
                <View>
                    <Text>When can you teach?</Text>
                    <FlatList
                        data={getUniqueDateStringsFromRequests(requestToRespond)}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                            return <View>
                                <Chip>{item}</Chip>
                            </View>
                        }}
                    />
                </View>
            </Overlay>
            : null}
        <Accordion dataArray={dataArray} expanded={0} />
    </>
    {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */ }

};



const styles = StyleSheet.create({});


export default JobOpportunities