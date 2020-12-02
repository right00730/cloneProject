import {StackNavigationProp} from '@react-navigation/stack';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Login from './login';
import {JoinTerm, JoinConfirm, JoinDataInput} from '~/Screens/Join';
import Mypage from '~/Screens/Login/mypage';
import {color} from 'react-native-reanimated';
import {StoreList} from '~/Screens/Main/StoreList';

const Stack = createStackNavigator();
const LoginNavi = () => {
  return (
    <Stack.Navigator screenOptions={{headerTitleStyle: {alignSelf: 'center'}}}>
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
          headerTitle: '회원가입',
        }}
      />
      <Stack.Screen
        name="JoinConfirm"
        component={JoinConfirm}
        options={{headerTitle: '회원가입'}}
      />
      <Stack.Screen
        name="JoinDataInput"
        component={JoinDataInput}
        options={{headerTitle: '회원가입'}}
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
const Store = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="StoreList"
        component={StoreList}
        options={{
          headerTitle: '마이페이지',
          headerTitleStyle: {alignSelf: 'center'},
        }}
      />
    </Stack.Navigator>
  );
};

export {LoginNavi, MYPAGE, Store};
