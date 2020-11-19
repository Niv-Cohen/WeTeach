import React from 'react'
import {View,ScrollView } from 'react-native'
import { Chip } from 'react-native-paper';


const ChipList = ({array,pressFunc,doublePressFunc,isEditMode,currentList,toBeAdded})=>{

    <View style={{flex:1,  flexWrap:'wrap', flexDirection: 'row', alignItems:'center',alignSelf:'stretch',bottom:0}}>
    <ScrollView showsVerticalScrollIndicator={false}>
    {array.map((object)=>{return(
    // <DoubleClick   onDoubleClick={isEditMode&&doublePressFunc(object)}>
        <Chip style={{marginVertical:10,marginHorizontal:0.5}}
            // backgroundColor:inEditMode
            // &&currentList.some(course=>course.hebName===object.hebName)
            // ||toBeAdded.some(course=>course.hebName===object.hebName)&&'blue'}
        
             onPress={()=>pressFunc(object)} >
        {object.hebName!==''?object.hebName:object.engName}
    </Chip>
    // </DoubleClick>
    )})}
    </ScrollView>
    </View>
}


export default ChipList