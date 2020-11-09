import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements';
import { Chip, overlay, TextInput } from 'react-native-paper';
import {Feather} from '@expo/vector-icons'
import Spacer from './Spacer';
import SearchBar from './SearchBar';



const FilterSelection = ({dataToFilter, selectedItem, setSelectedItem, onFinish}) => {

    const [filteredData, setfilteredData] = useState(dataToFilter);

    const filterData = (filter) => {
        setfilteredData(dataToFilter.filter((other) => other.includes(filter)))
    }

    const textStyle = (item) => {
        return {
            marginVertical: 10,
            fontSize: 16,
            borderColor: 'black',
            fontWeight: item===selectedItem?'bold':'normal',
            borderWidth: item===selectedItem? 2:1,
            padding: 5
        }
    }

    return <>
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder="איפה את/ה לומד/ת?"
        onChangeText={newValue => filterData(newValue)}
      />
    </View>
    <FlatList
        keyExtractor={(item) => item}
        data={filteredData}
        renderItem={({ item }) => {
            return (
                <TouchableOpacity onPress={()=>{
                    setSelectedItem(item);
                }}>
                <Text style={textStyle(item)}>
                    {item}
                </Text>
                </TouchableOpacity>
            );
        }}
    />
    {selectedItem?<Button title="בחרתי"onPress={onFinish()}/>:null}
    </>

};



const styles = StyleSheet.create({
    backgroundStyle: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        marginBottom: 10
      },
        inputStyle: {
            flex: 1,
            fontSize: 18
        },
        iconStyle: {
          fontSize: 35,
          alignSelf: 'center',
          marginHorizontal: 15
        }
});


export default FilterSelection