import React from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import { FontAwesome } from '@expo/vector-icons';
import ChooseType from '../components/ChooseType';
import UserCard from '../components/UserCard';

const Account = () => {
return (<SafeAreaView forceInset={{top:"always"}} style={styles.container}>

           {/* <Text style={{fontWeight:"bold",fontSize:48,justifyContent:"center",textAlign:'center'}}>Account</Text> */}
            <UserCard />
            {/* <ChooseType/> */}
                  
       </SafeAreaView>)
};

Account.navigationOptions = {
    tabBarIcon: <FontAwesome name="user" size={22} />
  };

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24,
    backgroundColor: '#ccffff',
} 
})

export default Account