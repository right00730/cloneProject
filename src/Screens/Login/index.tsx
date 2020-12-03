import {StackNavigationProp} from '@react-navigation/stack';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React from 'react';
import Login from './login';
import {JoinTerm, JoinConfirm, JoinDataInput} from '~/Screens/Join';
import Mypage from '~/Screens/Login/mypage';

const Stack = createStackNavigator();
const LoginNavi = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {position: 'absolute', right: '50%', marginTop: -15},
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerTitle: '로그인',
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />

      <Stack.Screen
        name="JoinTerm"
        component={JoinTerm}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name="JoinConfirm"
        component={JoinConfirm}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name="JoinDataInput"
        component={JoinDataInput}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          headerTitle: '회원가입',
        }}
      />
    </Stack.Navigator>
  );
};
const MYPAGE = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Mypage"
        component={Mypage}
        options={{
          headerTitle: '마이페이지',
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
    </Stack.Navigator>
  );
};

export {LoginNavi, MYPAGE};
