
import React from 'react';
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack';
import { BottomTabBar, createBottomTabNavigator} from 'react-navigation-tabs'
import { setNavigator } from './src/NavigationRef';

import Account from './src/screens/Account';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TryLocalSignin from './src/screens/TryLocalSignin';
import ConceptTeaching from './src/screens/ConceptTeaching';
import LessonsAndConcepts from './src/screens/LessonsAndConcepts'
import CreateRequestScreen from './src/screens/CreateRequestScreen'
import example from './src/components/Examples';
import setup from './src/screens/Setup';
import { LogBox } from 'react-native';

import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as UserProvider} from './src/context/UserContext'
import {Provider as ActionCenterProvider} from './src/context/ActionCenterContext';
import {Provider as InstProvider} from './src/context/institutensContext';
LogBox.ignoreAllLogs(true)
const switchNavigator = createSwitchNavigator({
  // setup:{screen:setup},
  
  // LessonsAndConcepts:{screen:LessonsAndConcepts},
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
       CreateRequestScreen:{screen:CreateRequestScreen},
     // Lessons:{screen:LessonsPannel},
      Account:{screen: Account,title:'משתמש'},
   },
   {
    initialRouteName:'Account',
    navigationOptions:{ header: { visible: false }
    }
   })
});
 const App = createAppContainer(switchNavigator)
 export default () =>{
   return(
     <InstProvider>
        <ActionCenterProvider>
          <UserProvider>
            <AuthProvider>
              <App ref={(navigator)=>setNavigator(navigator)} />
            </AuthProvider>
          </UserProvider>
         </ActionCenterProvider>
     </InstProvider>
   )
 }