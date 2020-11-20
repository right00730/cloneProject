import React from 'react';
import Styled from 'styled-components/native';

const MessageInput = Styled.TextInput`
font-size : 18px;
border : solid 1px lightgray;
width: 90%;
background-color : rgba(243,244,240,0.5);
padding: 10px;

`;
const Button = Styled.TouchableOpacity`
width : 15%;
padding: 10px 0px;
border : solid 1px lightgray;
 justify-content: center ;
align-items: center;
`;
const Icon = Styled.Image`
 width: 60%;
`;

interface Props {
  onPress: () => void;
}
interface Propse {
  value?: string;
  onchange?: () => void;
  placeholderMsg?: string;
}
const TextInput = ({value, onchange, placeholderMsg}: Propse) => {
  return (
    <MessageInput
      value={value}
      onChange={() => onchange}
      placeholder={placeholderMsg}></MessageInput>
  );
};
const SearchButton = ({onPress}: Props) => {
  return (
    <Button onPress={onPress}>
      <Icon source={require('~/Assets/Images/search.png')} />
    </Button>
  );
};
import {Dimensions, PixelRatio, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const baseWidth = 320;
const baseHeight = 568;

const WidthSize = (size: number) => {
  const scaleRatio = width / baseWidth;

  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleRatio));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleRatio)) - 2;
  }
};

const HeightSize = (size: number) => {
  const scaleRatio = width / baseHeight;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleRatio));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(size * scaleRatio)) - 2;
  }
};
const RoadText = Styled.Text`
color : gray;
font-size : 14px;
margin-right: 5px;
border : solid 1px lightgray;
`;
const RoadName = () => {
  return <RoadText> 도로명 </RoadText>;
};
export {TextInput, SearchButton, WidthSize, HeightSize, RoadName};
