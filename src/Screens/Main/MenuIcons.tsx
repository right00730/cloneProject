import {useNavigation} from '@react-navigation/native';
import {HeaderTitle} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {Dimensions, View} from 'react-native';
import Styled from 'styled-components/native';
import {LocationContext} from '~/Context';

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
  height: ${windowWidth / 9}px

  resize-mode: contain;
`;
const IconText = Styled.Text`
font-size: 20px;
font-family : BMHANNAPro
color: black
`;

const MenuIcons = ({data}: any) => {
  const Navi = useNavigation();
  return (
    <MenuContainer>
      <MenuIcon onPress={() => Navi.navigate('StoreList', {kind: data.name})}>
        <FoodIcon source={data.uri} />
        <IconText>{data.name}</IconText>
      </MenuIcon>
    </MenuContainer>
  );
};
export {MenuIcons};
