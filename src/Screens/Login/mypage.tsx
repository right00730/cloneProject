import React, {useContext, useEffect, useState} from 'react';
import {Alert, ColorPropType, Image, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '~/Components/Component/Button';
import Styled from 'styled-components/native';
import {baeminColor} from '~/Components/Styles/Colors';

import {UserContext} from '~/Context';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {HeightSize, WidthSize} from '~/Components/Component/SearchButton';
const Container = Styled.View`
flex:1;
flex-direction :row
flex-wrap : wrap
padding: 10px;
align-items:center;
background-color:white;

`;
const TextBox = Styled.Text`
font-size: 25px;
padding: 10px
font-weight:bold;
`;

const ModifyBtn = Styled.TouchableOpacity`
background-color: gray;
width: 22%;
justify-content:center;
height: ${HeightSize(70)}px
margin-left: 5px

`;
const ModifyInput = Styled.TextInput`
background-color: lightgray;
width: 45%;
align-items :center;
text-align:center;
justify-content:center;
height: ${HeightSize(70)}px
margin-left: 10px


`;
const ModifyTxt = Styled.Text`
font-size: 17px;
text-align:center;
color: white;
opacity: 0.7
`;
type myNavigation = StackNavigationProp<NavigationParamList>;
interface Props {
  navigation: myNavigation;
}

const Mypage = ({navigation}: Props) => {
  const {logout, userInfo} = useContext(UserContext);
  const loginInfo = userInfo?.email;
  const nickName = userInfo?.nickName;
  useEffect(() => {
    tokenCheck(userInfo.token);
  }, [userInfo.token]);
  const onLogout = async () => {
    await logout();
  };

  const tokenCheck = async (token: string) => {
    const url = 'http://192.168.0.250:8080/api/jwt/expiredcheck';
    await axios
      .get(url, {
        headers: {AUTHORIZATION: `Bearer ${token}`},
      })
      .then((json) => json.data)
      .then((data) => {
        if (JSON.stringify(data) == 'false') {
          console.log('token aceess');
        } else {
          logout();
          Alert.alert('로그인이 만료되었습니다.');
        }
      })
      .catch(function (error) {
        logout();
        Alert.alert('로그인이 만료되었습니다.');
      });
  };

  return (
    <>
      <Container>
        <View
          style={{
            width: '100%',
            alignItems: 'center',
          }}>
          <Image
            style={{borderRadius: 100}}
            source={require('~/Assets/Images/food/korean.png')}></Image>
          <TextBox> {nickName} </TextBox>
        </View>

        <TextBox style={{width: 100}}>이메일</TextBox>
        <Text style={{width: 160, fontSize: 16}}>{loginInfo}</Text>
        <TextBox>비밀번호 </TextBox>
        <ModifyInput />
        <ModifyBtn>
          <ModifyTxt>변경하기</ModifyTxt>
        </ModifyBtn>

        <TextBox>휴대폰 </TextBox>
        <TextBox style={{fontSize: 15, alignSelf: 'center', color: 'gray'}}>
          주문정보의 연락처로 사용됩니다.
        </TextBox>

        <ModifyInput style={{width: WidthSize(220)}} />

        <ModifyBtn>
          <ModifyTxt>변경하기</ModifyTxt>
        </ModifyBtn>
      </Container>
      <Button
        wsize={300}
        title={'로그아웃'}
        onPressed={onLogout}
        checked={true}></Button>
    </>
  );
};

export default Mypage;
