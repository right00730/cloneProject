import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {baeminColor} from '~/Components/Styles/Colors';

const Container = Styled.View`
flex-direction:row;
padding :10px;
height: 50px;
`;

const Label = Styled.Text`
font-size : 18px;
padding-top :4px;

`;
const Icons = Styled.Image`
width: 31px;
height:31px;
align-items:center;
`;

interface Props {
  value: boolean;
  label: string;
}

const Checkbox = ({value, label}: Props) => {
  return (
    <Container>
      <Icon
        name="md-checkbox-sharp"
        size={30}
        color={value ? baeminColor : 'gray'}></Icon>
      <CheckBox value={value} style={{width: 5, height: 5, opacity: 0}} />
      <Label>{label}</Label>
    </Container>
  );
};
export default Checkbox;
