import  React,{useState} from 'react';
import {View,FlatList,ScrollView,TouchableOpacity} from 'react-native'
import {Text,Button} from 'react-native-elements';
import { Chip, overlay } from 'react-native-paper';
import Spacer from './Spacer';



const MultiSelection =  ({items ,selectedItems, setSelectedItems, onFinish}) => {
    

    const isSelected = (courseTitle) => {
        for (let selectedCourse of selectedItems)
        {
            if (selectedCourse === courseTitle)
            {
                return true;
            }
        }
        return false;
    }

    console.log(items)

  return <>
    <View>
          <FlatList
          contentContainerStyle={{flex:1, flexWrap:'wrap', flexDirection: 'row', alignItems: 'center',alignSelf:'stretch', justifyContent: 'flex-start'}}
          data={items}
          renderItem={({item})=>{
              return <>
              <Chip
              ref={item}
              style={{marginVertical:10,marginHorizontal:0.5}}
              mode='outlined'

              onPress ={() => {
                  if (isSelected(item))
                  {
                      setSelectedItems(selectedItems.filter((other) => other!==item))
                  }
                  else
                  {
                      setSelectedItems([...selectedItems, item])
                  }
                }}
        
                //selectedColor='rgb(179, 230, 255)'
                selected={isSelected(item)}
                >{item}</Chip>
                </>
                }}
            keyExtractor={item=>item}/>
            <Button title="בחרתי" onPress={onFinish}/>
      </View>
  </>
  
};


export default MultiSelection