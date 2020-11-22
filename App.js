/* eslint-disable max-len */
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {setNavigator} from './src/NavigationRef';

import Account from './src/screens/Account';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TryLocalSignin from './src/screens/TryLocalSignin';
import LessonsAndConcepts from './src/screens/LessonsAndConcepts';
import CreateRequestScreen from './src/screens/CreateRequestScreen';
import SignInMiddleware from './src/screens/SignInMiddleware';
import SignUpMiddleware from './src/screens/SignUpMiddleware';
import Setup from './src/screens/Setup';
import {LogBox} from 'react-native';

import {Provider as AuthProvider} from './src/context/AuthContext';
import {Provider as UserProvider} from './src/context/UserContext';
import {Provider as ActionCenterProvider} from './src/context/ActionCenterContext';
LogBox.ignoreAllLogs(true);
const switchNavigator = createSwitchNavigator({
  TryLocalSignin: TryLocalSignin,
  loginFlow: createStackNavigator({
    Signin: SignInScreen,
    Signup: SignUpScreen,
    SignInMiddleware: SignInMiddleware,
    SignUpMiddleware: SignUpMiddleware,
    Setup: Setup,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
    },
  }),
  mainFlow: createBottomTabNavigator({
    Lessons: {screen: LessonsAndConcepts},
    CreateRequestScreen: {screen: CreateRequestScreen},
    Account: {screen: Account},
  },
  {
    initialRouteName: 'Account',
    navigationOptions: {header: {visible: false},
    },
  }),
});
const App = createAppContainer(switchNavigator);
export default () =>{
  return (
      <ActionCenterProvider>
        <UserProvider>
          <AuthProvider>
            <App ref={(navigator)=>setNavigator(navigator)} />
          </AuthProvider>
        </UserProvider>
      </ActionCenterProvider>
  );
};
