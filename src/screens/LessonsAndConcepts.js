import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Tab, Tabs } from 'native-base';
import LessonRequestsCenter from '../components/LessonRequestsCenter'
import ConceptRequestsCenter from '../components/ConceptRequestsCenter'

const LessonsAndConcepts = () => {
  // const institutes = ['AVL','Binary Tree', 'Linear-Search','Big O', 'Object Oriented','Recursion']
  return <Container>
    <Header hasTabs />
    <Tabs>
      <Tab heading="Lessons">
        <LessonRequestsCenter />
      </Tab>
      <Tab heading="Concept">
        <ConceptRequestsCenter />
      </Tab>
    </Tabs>
  </Container>
};


const Styles = StyleSheet.create({})

export default LessonsAndConcepts