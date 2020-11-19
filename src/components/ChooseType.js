import React,{useState} from 'react'
import { StyleSheet,TouchableOpacity } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { FontAwesome,FontAwesome5 } from '@expo/vector-icons';

const ChooseType = () =>{
    const [userType, setUserType] = useState(0);
    const Types =[{name:'Student',icon:'graduation-cap',src:FontAwesome},{name:'Tutor',icon:'chalkboard-teacher',src:FontAwesome5},{name:'Both',icon:'user-graduate', src:FontAwesome5}];

    return <>
            <FlatList style={style.list} horizontal={true} keyExtractor={type=>type.name} data={Types} 
            renderItem={(type)=>{return <TouchableOpacity onPress={()=>setUserType(type.index)}>
                <type.item.src style={style.icon} color={type.index===userType?'blue':'gray'} name={type.item.icon} size={50} />
                </TouchableOpacity>}}/>
            </>
}

const style = StyleSheet.create({
        icon:{
            marginTop:50,
            marginHorizontal:30    
        },
        list:{
            alignSelf:"center"
        }

})


export default ChooseType