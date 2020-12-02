import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {baeminColor} from '~/Components/Styles/Colors';
import Styled from 'styled-components/native';
import SplashScreen from 'react-native-splash-screen';

const Container = Styled.View`
flex: 1;
  background-color: #FEFFFF;
  align-items: center;
  justify-content: center;
`;
const IsLoading = () => {
  SplashScreen.hide();
  return (
    <Container>
      <Icon name="loading1" color={baeminColor} size={50}></Icon>
    </Container>
  );
};
export default IsLoading;
