import React from 'react';
import { Text, TouchableOpacity,View, StyleSheet } from 'react-native';
import Spacer from './Spacer';
import { withNavigation } from 'react-navigation';

const NavLink = ({ navigation, text,linkText, routeName }) => {
  return (
      <>
      <View style={{flex:1,flexDirection:'row',left:'10%'}}>
      <Spacer />
      <Text >{text}</Text> 
      <TouchableOpacity onPress={() => navigation.navigate(routeName)}>
      <Text style={styles.link}> {linkText}</Text>
    </TouchableOpacity>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  link: {
    fontWeight:'bold'
  }
});

export default withNavigation(NavLink);
