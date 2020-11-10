import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import { Container, Header, Tab, Tabs} from 'native-base';
import GeneralRequestsCenter from './GeneralRequestsCenter';

const ConceptRequestsCenter = () => {
// const institutes = ['AVL','Binary Tree', 'Linear-Search','Big O', 'Object Oriented','Recursion']
const dataArray = [
    { title: "First Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
    { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
  ];
return <>
<GeneralRequestsCenter/>
</>
};


const Styles = StyleSheet.create({})

export default ConceptRequestsCenter