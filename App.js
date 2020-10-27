
import React ,{useEffect}from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack';
import { BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs'
import { setNavigator } from './src/NavigationRef';

import Account from './src/screens/Account';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TryLocalSignin from './src/screens/TryLocalSignin';
import LessonsPannel from './src/screens/LessonsPannel';
import ConceptTeaching from './src/screens/ConceptTeaching';
import example from './src/components/Examples';


import {Provider as AuthProvider} from './src/context/AuthContext'


const switchNavigator = createSwitchNavigator({
    TryLocalSignin:TryLocalSignin,
    loginFlow:createStackNavigator({
     Signin:SignInScreen,
     Signup:SignUpScreen,
   },
   {
        defaultNavigationOptions:{
          //  headerLeft:()=><headerStyle />,
            headerShown:false
          //   headerStyle: { backgroundColor: ' lightgreen'  },
          // headerTitleStyle: {fontSize:25 ,alignSelf:"center"},
          // title:'WeTeach'
        }
   }),
   mainFlow:createBottomTabNavigator({
    
      
      Concept:{screen:ConceptTeaching},
      Lessons:{screen:LessonsPannel},
      Account:{screen: Account,title:'משתמש'},
      //example:{screen:example}
   },
   {
    //  tabBarOptions:{activeTintColor: "#00af9d",
    //  inactiveTintColor: "grey",
    //  style: {
    //    backgroundColor: "white",
    //    paddingTop: 10
    //  }
    // },
    initialRouteName:'Account',
    navigationOptions:{ header: { visible: false }
    }
   })
});
 const App = createAppContainer(switchNavigator)

 export default () =>{
   return(
     <AuthProvider>
       <App ref={(navigator)=>setNavigator(navigator)} />
     </AuthProvider>
   )
 }