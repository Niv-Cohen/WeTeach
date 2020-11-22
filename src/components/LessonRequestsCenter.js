/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useState, useEffect, useContext} from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Accordion} from 'native-base';
import Spinner from './Spinner';
import {Text, Button, ListItem, Overlay} from 'react-native-elements';
import LessonRequestRowCard from './LessonRequestRowCard';
import {Context as ActionCenterContext} from '../context/ActionCenterContext';
import {Context as UserContext} from '../context/UserContext';


const LessonRequestsCenter = () => {
  const {getReq, state: {actionCenter}}=useContext(ActionCenterContext);
  const {state: {user}}=useContext(UserContext);

  useEffect(()=>{
    async function fetchRequests() {
      console.log(user._id);
      await getReq({userId: user._id});
      console.log(actionCenter);
    }
    fetchRequests();
  }, []);
  console.log(actionCenter);

  const [offerToDisplay, setOfferToDisplay] = useState(null);

  const toTimeString = (time) => {
    const timeString = time.toLocaleTimeString();
    return timeString.substr(0, timeString.length - 3);
  };
  const dataArray = [];
  if (actionCenter) {
    const {requests}=actionCenter;
    for (const request of requests) {
      const {offers}=request;
      dataArray.push({
        title: <Text>Course: {request.course.hebName}.
         Lesson length: {request.lessonLength}</Text>,
        content:
        <View>
          <LessonRequestRowCard request={request} />

          <Text>Available offers:</Text>
          {offerToDisplay ? <Overlay
            isVisible={offerToDisplay !== null}
            onBackdropPress={() => {
              setOfferToDisplay(null);
            }}>
            <View style={{width: '90%', height: '70%'}}>
              <Text>
                {tutorInfos[offerToDisplay.tutorID].name} is offering to teach you!
              </Text>
              {tutorInfos[offerToDisplay.tutorID].institution ?
              <Text>
               Institution: {tutorInfos[offerToDisplay.tutorID].institution}
              </Text> : null}
              {tutorInfos[offerToDisplay.tutorID].Degree ?
              <Text>
                Degree: {tutorInfos[offerToDisplay.tutorID].Degree}
              </Text> : null}
              <Text>
                A little about {tutorInfos[offerToDisplay.tutorID].name}:
              </Text>
              <Text>{tutorInfos[offerToDisplay.tutorID].about}</Text>
              <Button title="accept offer" style={{bottom: 0}} onPress={() => { }} />
            </View>
          </Overlay> : null}
          {offers.map((offer, i) => (
            <TouchableOpacity onPress={() => {
              setOfferToDisplay(offer);
            }}>
              <ListItem key={i} bottomDivider
                containerStyle={{}}>
                <ListItem.Content>
                  <View flexDirection='row' style={{justifyContent: 'space-around'}} >
                    <View style={{width: '50%'}}>
                      {/* style={{ justifyContent: 'space-evenly' }} */}
                      <Text>{tutorInfos[offer.tutorID].name}</Text>
                      <Text>Price: {offer.price}</Text>
                    </View>
                    <View style={{width: '50%'}} >
                      <Text>Date: {offer.date.toDateString()}</Text>
                      <Text>Time: {toTimeString(offer.date)}</Text>
                    </View>
                  </View>
                </ListItem.Content>
              </ListItem>
            </TouchableOpacity>
          ))}
        </View>,
      });
    }
  }

  return <>
    {actionCenter?<Accordion dataArray={dataArray} expanded={0} />:<Spinner/>}
  </>;
};

const styles = StyleSheet.create({});

export default LessonRequestsCenter;
