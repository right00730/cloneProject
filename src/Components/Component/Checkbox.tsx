import React, {useState} from 'react';
import CheckBox from '@react-native-community/checkbox';
import Styled from 'styled-components/native';
const Container = Styled.View`
flex-direction:row;
padding :10px;
height: 50px;
`;

const Label = Styled.Text`
font-size : 18px;
padding-top :4px;

`;
const Icon = Styled.Image`
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
        source={
          value === true
            ? require('~/Assets/Images/checked.png')
            : require('~/Assets/Images/unchecked.png')
        }></Icon>
      <CheckBox value={value} style={{width: 5, height: 5, opacity: 0}} />
      <Label>{label}</Label>
    </Container>
  );
};
export default Checkbox;
