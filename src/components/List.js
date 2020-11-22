/* eslint-disable react/jsx-key */
/* eslint-disable linebreak-style */
/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {ListItem} from 'react-native-elements';


const List = ({array, onPressFun, usableState, myCoursesStyleCond, search}) =>{
  return (
    <View>
      {array.filter((element)=>element.hebName.includes(search)).map((l, i) => (
        <TouchableOpacity onPress={()=>onPressFun(i, l.hebName)}>
          <ListItem key={i} bottomDivider
            containerStyle={myCoursesStyleCond?
                usableState.some((course)=>course.index===i)&&{backgroundColor: '#7690AC'}:
                usableState&&usableState.index===i&&{backgroundColor: '#7690AC'}}>
            <ListItem.Content style={{flex: 1, alignItems: 'stretch'}}>
              <ListItem.Title style={{fontWeight: 'bold', marginHorizontal: 10}} >
                {l.hebName}
              </ListItem.Title>
            </ListItem.Content>
          </ListItem>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default List;
