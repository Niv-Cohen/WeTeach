
import React from 'react';
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
import setup from './src/screens/Setup';
import { LogBox } from 'react-native';

import {Provider as AuthProvider} from './src/context/AuthContext'
import {Provider as UserProvider} from './src/context/UserContext'
import {Provider as ActionCenterProvider} from './src/context/ActionCenterContext';
import {Provider as InstProvider} from './src/context/institutensContext';
LogBox.ignoreAllLogs(true)
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
      Setup:setup,
      Concept:{screen:ConceptTeaching},
      Lessons:{screen:LessonsPannel},
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