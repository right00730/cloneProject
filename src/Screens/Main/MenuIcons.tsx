import React from 'react';
import {Dimensions, View} from 'react-native';
import Styled from 'styled-components/native';

const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

const MenuContainer = Styled.TouchableOpacity`
width: ${windowWidth / 4 - 10}px;
height: ${windowWidth / 4}px;
`;
const MenuIcon = Styled.TouchableOpacity`
align-items: center;
`;
const FoodIcon = Styled.Image`
  height: ${windowHeight / 16}px
  resize-mode: contain;
`;
const IconText = Styled.Text`
font-size: 20px;
font-family : BMHANNAPro
color: black
`;
const MenuIcons = ({data}: any) => {
  return (
    <MenuContainer>
      <MenuIcon>
        <FoodIcon source={data.uri} />
        <IconText>{data.name}</IconText>
      </MenuIcon>
    </MenuContainer>
  );
};
export {MenuIcons};
