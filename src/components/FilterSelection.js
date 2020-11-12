import React, { useState, useEffect } from 'react';
import { View, FlatList, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import { Text, Button } from 'react-native-elements';
import { Chip, overlay, TextInput } from 'react-native-paper';
import {Feather} from '@expo/vector-icons'
import Spacer from './Spacer';
import SearchBar from './SearchBar';



const FilterSelection = ({multi, placeHolder, dataToFilter, intialData, selectedItem, setSelectedItem, onFinish}) => {

    const [filteredData, setfilteredData] = useState(intialData);

    const filterData = (filter) => {
        setfilteredData(dataToFilter.filter((other) => {return (other.includes(filter) || isSelected(other) )}))
    }

    const textStyle = (item) => {
        return {
            marginVertical: 10,
            fontSize: 16,
            borderColor: 'black',
            fontWeight: isSelected(item)?'bold':'normal',
            borderWidth: isSelected(item)? 2:1,
            padding: 5
        }
    }

    const isSelected = (item) =>
    {
        if (multi){
            for (const elected of selectedItem){
                if (elected == item){
                    return true
                }
            }
            return false
        }
        return item == selectedItem
    }

    return <>
    <View style={{height:'95%'}}>
    <View style={styles.backgroundStyle}>
      <Feather name="search" style={styles.iconStyle} />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeHolder}
        onChangeText={newValue => filterData(newValue)}
      />
    </View>
    <FlatList
        keyExtractor={(item) => item}
        data={filteredData}
        renderItem={({ item }) => {
            return (
                <TouchableOpacity onPress={()=>{
                    if (multi){
                        if (isSelected(item))
                        {
                            setSelectedItem(selectedItem.filter((other) => other!==item))
                        
                        }
                        else
                        {
                            setSelectedItem([...selectedItem, item])
                        }
                        return
                    }
                    setSelectedItem(item);
                }}>
                <Text style={textStyle(item)}>
                    {item}
                </Text>
                </TouchableOpacity>
            );
        }}
    />
    </View>
    {
    multi?
        selectedItem.length!=0?<Button title="בחרתי"onPress={onFinish}/>:null
        :
        selectedItem?<Button title="בחרתי"onPress={onFinish}/>:null
    }
    
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