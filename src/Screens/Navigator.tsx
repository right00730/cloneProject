import React, {useContext, useEffect} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {UserContext, LocationContext} from '~/Context/';
import Main from '~/Screens/Main';
import FadeInView from '~/Screens/Main/FadeInView';
import {StoreList} from '~/Screens/Main/StoreList';

import {
  LocationDetail,
  LocationInput,
  LocationList,
  LocationTerm,
} from '~/Screens/Location';
import None from '~/Screens/None';
import {baeminColor} from '~/Components/Styles/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {Text} from 'react-native';
import {LoginNavi, MYPAGE} from './Login';
import Mypage from './Login/mypage';
import IsLoading from './isLoading';
const Stack = createStackNavigator();
const BottomT = createBottomTabNavigator();
const Top = createMaterialTopTabNavigator();

const Location = () => {
  return (
    <Stack.Navigator initialRouteName="LocationTerm" headerMode="none">
      <Stack.Screen name="LocationTerm" component={LocationTerm} />
      <Stack.Screen name="LocationInput" component={LocationInput} />
      <Stack.Screen name="LocationList" component={LocationList} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
    </Stack.Navigator>
  );
};
const TopTab = () => {
  return (
    <Top.Navigator
      initialRouteName="baedal"
      tabBarOptions={{
        pressColor: 'white',
        activeTintColor: baeminColor,
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 17,

          fontWeight: '700',
        },
        indicatorStyle: {
          borderBottomColor: baeminColor,
          borderBottomWidth: 5,
        },
        allowFontScaling: false,
      }}>
      <Top.Screen
        name="baedal"
        component={Main}
        options={{tabBarLabel: '배달'}}
      />
      <Top.Screen
        name="takeOut"
        component={Main}
        options={{tabBarLabel: '포장/방문'}}
      />
    </Top.Navigator>
  );
};

const Bottom = () => {
  const {userInfo} = useContext(UserContext);

  return (
    <BottomT.Navigator
      initialRouteName="home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: baeminColor,
        inactiveTintColor: 'gray',
        labelStyle: {fontSize: 14, fontWeight: '700'},
        style: {
          paddingTop: 10,
          height: 55,
          paddingBottom: 5,
          borderTopColor: 'lightgray',
          borderTopWidth: 1,
        },
      }}
      screenOptions={{title: '미지정'}}>
      <BottomT.Screen
        name="home"
        component={MainStack}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({size, color}) => (
            <Icon name="md-home-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomT.Screen
        name="Eating"
        component={None}
        options={{
          tabBarLabel: '뭐먹지',
          tabBarIcon: ({size, color}) => (
            <Icon name="md-chatbubbles-outline" size={size} color={color} />
          ),
        }}
      />
      <BottomT.Screen
        name="Store"
        component={None}
        options={{
          tabBarLabel: '찜한가게',
          tabBarIcon: ({size, color}) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />

      <BottomT.Screen
        name="History"
        component={None}
        options={{
          tabBarLabel: '주문내역',
          tabBarIcon: ({size, color}) => (
            <Icon name="md-document-text-outline" size={size} color={color} />
          ),
        }}
      />
      {userInfo.email ? (
        <BottomT.Screen
          name="Mypage"
          component={MYPAGE}
          options={{
            tabBarLabel: '마이페이지',
            tabBarIcon: ({size, color}) => (
              <Icon name="md-happy-outline" size={size} color={color} />
            ),
          }}
        />
      ) : (
        <BottomT.Screen
          name="Login"
          component={LoginNavi}
          options={{
            tabBarLabel: '로그인',
            tabBarIcon: ({size, color}) => (
              <Icon name="md-happy-outline" size={size} color={color} />
            ),
          }}
        />
      )}
    </BottomT.Navigator>
  );
};
const TitleAddr = () => {
  const navi = useNavigation();
  const {addrInfo, setAddrInfo} = useContext(LocationContext);

  return (
    <Text
      onPress={() => navi.navigate('LocationInput')}
      style={{fontSize: 20, textAlign: 'center'}}>
      {addrInfo}
    </Text>
  );
};
const MainStack = () => {
  const {addrInfo} = useContext(LocationContext);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LinkTopandStack"
        component={TopTab}
        options={{
          headerLeft: () => (
            <Icon
              name="md-alert-circle-outline"
              size={30}
              style={{
                padding: 10,
              }}
            />
          ),
          headerRight: () => (
            <Icon
              name="md-qr-code-outline"
              size={30}
              style={{
                padding: 10,
              }}
            />
          ),
          headerTitle: () => <TitleAddr />,
        }}
      />
      <Stack.Screen name="LocationInput" component={LocationInput} />
      <Stack.Screen name="LocationList" component={LocationList} />
      <Stack.Screen name="LocationDetail" component={LocationDetail} />
      <Stack.Screen
        name="StoreList"
        component={StoreList}
        options={{
          headerTitle: '가게 리스트',
        }}
      />
    </Stack.Navigator>
  );
};

export default () => {
  const {addrInfo, isLoading, getAddr} = useContext(LocationContext);
  console.log('>>>>>>>', addrInfo);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {addrInfo === undefined ? (
          <Stack.Screen name="Loading" component={IsLoading} />
        ) : addrInfo === '' ? (
          <Stack.Screen name="LocationTerm" component={Location} />
        ) : (
          <Stack.Screen name="Main" component={Bottom} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
