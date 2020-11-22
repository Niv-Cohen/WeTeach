/* eslint-disable max-len */
import React from 'react';
import {View, FlatList} from 'react-native';
import {Text} from 'react-native-elements';
import {Chip} from 'react-native-paper';


const LessonRequestRowCard = ({request}) => {
  const toTimeString = (time) => {
    const timeString = time.toLocaleTimeString();
    return timeString.substr(0, timeString.length - 3);
  };
  return <>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <View style={{alignItems: 'flex-start', marginRight: 10, flex: 1}}>
        <Text>Subjects:</Text>
        <FlatList
          style={{flexGrow: 0}}
          horizontal={true}
          data={request.subjects}
          keyExtractor={(item) => item}
          renderItem={({item}) => {
            return (
              <Chip style={{alignSelf: 'flex-start'}}>
                {item.hebName!==''?item.hebName:item.engName}
              </Chip>);
          }}
        />
        {request.additionalInfo ? <View>
          <Text>Additional notes:</Text>
          <Text>{request.additionalInfo}</Text>
        </View> : null}
      </View>
      <View>
        <Text>Availability:</Text>
        <FlatList
          data={request.timeSlots}
          keyExtractor={(item) => item.dateString}
          renderItem={({item}) => {
            return <View>
              <Chip style={{alignSelf: 'center'}}>{item.dateString}</Chip>
              <FlatList
                horizontal={true}
                data={item.slots}
                listKey={item.dateString}
                key={item.dateString}
                keyExtractor={(slot) => slot.start.toString()}
                renderItem={(slot) => {
                  return (
                    <View>
                      <Chip style={{margin: 2, padding: 2, alignSelf: 'center'}}>
                        {toTimeString(slot.item.start)}-{toTimeString(slot.item.end)}</Chip>
                    </View>
                  );
                }}
              />
            </View>;
          }}
        />
      </View>
    </View>
  </>;
};


export default LessonRequestRowCard;
