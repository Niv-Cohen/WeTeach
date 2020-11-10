import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Accordion} from 'native-base';
import { Text, Button } from 'react-native-elements';
import {Feather} from '@expo/vector-icons'
import Spacer from './Spacer';
import SearchBar from './SearchBar';



const GeneralRequestsCenter = () => {
    const dataArray = [
        { title: "First Element", content: <Feather name="search" style={styles.iconStyle} /> },
        { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
        { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
      ];
    return <>
      <Accordion dataArray={dataArray} expanded={0}/>
    </>
    /// שם,

};



const styles = StyleSheet.create({});


export default GeneralRequestsCenter