import React, { useEffect,useContext } from 'react'
import {View,Text,StyleSheet,ScrollView} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons';
import ChooseType from '../components/ChooseType';
import UserCard from '../components/UserCard';
import { LogBox } from 'react-native';

const Account = ({route,navigation}) => {
  useEffect(()=>{
    LogBox.ignoreAllLogs(true)
  },[])
  
return (    

  <View style={styles.container} >
    <ScrollView showsVerticalScrollIndicator={false} >
            <UserCard/>
            </ScrollView>
       </View>
       )
};

Account.navigationOptions = {
    tabBarIcon: <FontAwesome name="user" size={22} />
  };

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: '#ccffff'
}
})

export default Account