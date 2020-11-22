import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Container, Header, Tab, Tabs } from 'native-base';
import LessonRequestsCenter from '../components/LessonRequestsCenter'
import ConceptRequestsCenter from '../components/ConceptRequestsCenter'
import JobOpportunities from '../components/JobOpportunities';

const OpportunitiesScreen = () => {
    // const institutes = ['AVL','Binary Tree', 'Linear-Search','Big O', 'Object Oriented','Recursion']
    return <Container>
        <Header hasTabs />
        <Tabs>
            <Tab heading="Tutoring">
                <JobOpportunities />
            </Tab>
            <Tab heading="Helping">
                <JobOpportunities />
            </Tab>
        </Tabs>
    </Container>
};


const Styles = StyleSheet.create({})

export default OpportunitiesScreen
