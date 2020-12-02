import React, {useContext, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Button} from '~/Components/Component/Button';
import Styled from 'styled-components/native';
import {baeminColor} from '~/Components/Styles/Colors';

import {UserContext} from '~/Context';
import {StackNavigationProp} from '@react-navigation/stack';
const Container = Styled.View`
flex:1;
`;
const TextBox = Styled.Text`
font-size: 25px;
padding: 10px
`;
const LogoutBtn = Styled.TouchableOpacity`
margin-top: 50px;
align-self:center;
background-color:${baeminColor}
text-align:center;
width : 50%;
align-items:center`;
type MainLocation = StackNavigationProp<NavigationParamList>;
interface Props {
  navigation: MainLocation;
}
const Mypage = ({navigation}: Props) => {
  const {logout, userInfo} = useContext(UserContext);
  const loginInfo = userInfo?.email;
  const nickName = userInfo?.nickName;
  const onLogout = async () => {
    await logout();
  };
  return (
    <Container>
      <TextBox style={{padding: 100, paddingLeft: 10}}>로그인 정보 </TextBox>

      <TextBox>이메일 : {loginInfo}</TextBox>
      <TextBox>별명 : {nickName}</TextBox>

      <LogoutBtn onPress={onLogout}>
        <TextBox>로그아웃</TextBox>
      </LogoutBtn>
    </Container>
  );
};

export default Mypage;
