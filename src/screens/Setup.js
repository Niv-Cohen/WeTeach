import React, {useContext,useEffect} from 'react'
import {Context as UserContext} from '../context/UserContext'
import { LogBox,Text } from 'react-native';

const Setup = ({route,navigation}) =>{
    const {state,getUser} = useContext(UserContext)
    useEffect(()=>{
        console.log(user);
        LogBox.ignoreAllLogs(true)
    },[])
    return(<>
    <Text>Set up page</Text>
    </>)
}


export default Setup