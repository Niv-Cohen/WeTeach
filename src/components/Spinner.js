import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { Overlay,Text,Divider,SearchBar } from 'react-native-elements';

import Spacer from '../components/Spacer'


const Spinner = () =>{
    return(
<View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator />
    <ActivityIndicator  size={200} color="#00ff00" />
  </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf:'center',
    padding: 10,
    marginBottom:40,
    marginRight:30
    
  }
});
 
export default Spinner;