import React, { useEffect,useContext } from 'react'
import {View,Text,StyleSheet,ScrollView,ImageBackground,Dimensions,SafeAreaView} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import ChooseType from '../components/ChooseType';
import UserCard from '../components/UserCard';
import { LogBox } from 'react-native';

const Account = ({route,navigation}) => {
  useEffect(()=>{
    LogBox.ignoreAllLogs(true)
  },[])
  
return (    
  
  <ImageBackground source={require('../../assets/SetupBackground.png')} imageStyle={{resizeMode:'cover'}} style={{ width: Dimensions.get('window').width,
    height: Dimensions.get('window').height}}>
      <ScrollView showsVerticalScrollIndicator={false} >
  <View style={styles.container} >
    
            <UserCard/>
            
       </View>
       </ScrollView>
       </ImageBackground>
       )
};

Account.navigationOptions = {
    tabBarIcon: <FontAwesome name="user" size={22} />
  };

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 24
}
})

export default Account