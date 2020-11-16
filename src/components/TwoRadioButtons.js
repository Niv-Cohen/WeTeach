import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native'
import Spacer from './Spacer';
import { Header, Container, ListItem, Left, Right, Content, Radio } from "native-base";



const TwoRadioButtons = ({ header, firstString, secondString, selected, setSelected }) => {
    return <Container
    style={{height:80}}>
        <Content>
            <Text>{header}</Text>
            <ListItem>
                <Left>
                    <Text>{firstString}</Text>
                </Left>
                <Right>
                    <Radio
                        selected={selected.radio1}
                        onPress={() => {
                            console.log("press")
                            setSelected({ radio1: true, radio2: false })
                        }} />
                </Right>
            </ListItem>
            <ListItem>
                <Left>
                    <Text>{secondString}</Text>
                </Left>
                <Right>
                    <Radio
                    selected={selected.radio2}
                    onPress={() => {
                    setSelected({ radio1: false, radio2: true })
            }}/>
                </Right>
            </ListItem>
        </Content>
    </Container>

};



const styles = StyleSheet.create({});


export default TwoRadioButtons