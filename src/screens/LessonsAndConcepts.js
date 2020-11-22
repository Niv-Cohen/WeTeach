import React from 'react';
import {Container, Header, Tab, Tabs} from 'native-base';
import LessonRequestsCenter from '../components/LessonRequestsCenter';
import ConceptRequestsCenter from '../components/ConceptRequestsCenter';
import {Entypo} from '@expo/vector-icons';

const LessonsAndConcepts = () => {
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
  </Container>;
};

LessonsAndConcepts.navigationOptions =
{tabBarIcon: <Entypo name="book" size={22} />};


export default LessonsAndConcepts;
