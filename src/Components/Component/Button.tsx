import React, {useState} from 'react';
import {ScaledSize} from 'react-native';
import Styled from 'styled-components/native';
import {WidthSize, HeightSize} from './SearchButton';

const Container = Styled.View`
flex:1;
align-items:center;
`;

const ButtonContainer = Styled.TouchableOpacity`
bottom:1px;
position:absolute;
justify-content :center;
background-color: rgb(41, 194, 189);
align-items : center;
height: 50px;
border-radius : 5px;
width: 98%;
`;

interface Props {
  title: string;
  checked: boolean;
  onPressed?: () => void;
  wsize?: number;
  hsize?: number;
}
const Label = Styled.Text`
font-size: 20px
color : white;
text-align:center;
font-weight:bold;

`;
const Button = ({title, checked, onPressed, wsize, hsize}: Props) => {
  return (
    <Container>
      <ButtonContainer
        style={{
          backgroundColor: checked ? 'rgb(41, 194, 189)' : 'gray',
          width: wsize ? wsize : '98%',
          height: hsize ? HeightSize(hsize) : HeightSize(75),
        }}
        disabled={checked ? false : true}
        onPress={onPressed}>
        <Label>{title}</Label>
      </ButtonContainer>
    </Container>
  );
};
export {Button};
