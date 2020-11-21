import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Accordion } from 'native-base';
import { Text, Button, ListItem, Overlay } from 'react-native-elements';
import { Chip } from 'react-native-paper';
import { Feather } from '@expo/vector-icons'
import Spacer from './Spacer';
import SearchBar from './SearchBar';
import LessonRequestRowCard from '../components/LessonRequestRowCard'



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
            [{
                dateString: '2020-12-10', slots:
                    [{ dateString: '2020-12-10', start: start, end: end }, { dateString: '2020-12-10', start: start1, end: end1 }]
            },
            {
                dateString: '2020-12-11', slots:
                    [{ dateString: '2020-12-11', start: start, end: end }, { dateString: '2020-12-11', start: start1, end: end1 }]
            }], lessonLength: 90,
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

    // tutorInfo name, img, coursesITeach,  institution, Degree, about

    useEffect(() => {
        //get requests
        let tutorIDs = new Set()
        for (req of requests) {
            // get offers
            for (offer of offers) {
                tutorIDs.add(offer.tutorID)
            }
        }
        // get tutorInfos
    }, [])
    const [offerToDisplay, setOfferToDisplay] = useState(null)

    const toTimeString = (time) => {
        let timeString = time.toLocaleTimeString();
        return timeString.substr(0, timeString.length - 3)
    }
    const dataArray = []
    for (request of requests) {
        dataArray.push({
            title: <Text>Course: {request.courseName}. Lesson length: {request.lessonLength}</Text>,
            content:
                <View>
                    <LessonRequestRowCard request={request} tutorInfos={tutorInfos} offers={offers} />

                    <Text>Available offers:</Text>
                    {offerToDisplay ? <Overlay
                        isVisible={offerToDisplay !== null}
                        onBackdropPress={() => { setOfferToDisplay(null) }}>
                        <View style={{ width: '90%', height: '70%' }}>
                            <Text>{tutorInfos[offerToDisplay.tutorID].name} is offering to teach you!</Text>
                            {tutorInfos[offerToDisplay.tutorID].institution ?
                                <Text>Institution: {tutorInfos[offerToDisplay.tutorID].institution}</Text> : null}
                            {tutorInfos[offerToDisplay.tutorID].Degree ?
                                <Text>Degree: {tutorInfos[offerToDisplay.tutorID].Degree}</Text> : null}
                            <Text>A little about {tutorInfos[offerToDisplay.tutorID].name}:</Text>
                            <Text>{tutorInfos[offerToDisplay.tutorID].about}</Text>
                            <Button title="accept offer" style={{ bottom: 0 }} onPress={() => { }} />
                        </View>
                    </Overlay> : null}
                    {offers.map((offer, i) => (
                        <TouchableOpacity onPress={() => {
                            setOfferToDisplay(offer)
                        }}>
                            <ListItem key={i} bottomDivider
                                containerStyle={{}}>
                                <ListItem.Content>
                                    <View flexDirection='row' style={{ justifyContent: 'space-around' }} >
                                        <View style={{ width: '50%' }}>
                                            {/* style={{ justifyContent: 'space-evenly' }} */}
                                            <Text>{tutorInfos[offer.tutorID].name}</Text>
                                            <Text>Price: {offer.price}</Text>
                                        </View>
                                        <View style={{ width: '50%' }} >
                                            <Text>Date: {offer.date.toDateString()}</Text>
                                            <Text>Time: {toTimeString(offer.date)}</Text>
                                        </View>
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        </TouchableOpacity>
                    ))}
                </View>
        })
    }
    return <>
        <Accordion dataArray={dataArray} expanded={0} />
    </>
    {/* courseName:string, subjects:[string], additionalInfo:String, timeSlots:[], lessonLength */ }

};



const styles = StyleSheet.create({});


export default JobOpportunities