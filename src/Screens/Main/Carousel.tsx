import React, {useState} from 'react';
import {Image} from 'react-native';
import Styled from 'styled-components/native';

const SliderContainer = Styled.View`
`;

const Flat = Styled.FlatList`
margin:0px 0px 20px 0px
`;
interface Props {
  data?: any;
  height: number;
  width: number;
}

const ImageSlider = ({data, height, width}: Props) => {
  return (
    <SliderContainer style={{width, height}}>
      <Image source={data.uri} style={{width, height}}></Image>
    </SliderContainer>
  );
};

const Carousel = ({height, width}: Props) => {
  return (
    <Flat
      data={sliderList}
      renderItem={({item}) => {
        return <ImageSlider data={item} height={height} width={width} />;
      }}
      keyExtractor={(item, index) => `index_${index}`}
      pagingEnabled
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    />
  );
};
const sliderList = [
  {
    uri: require('~/Assets/Images/slider0.png'),
  },
  {
    uri: require('~/Assets/Images/slider1.png'),
  },
  {
    uri: require('~/Assets/Images/slider2.png'),
  },
  {
    uri: require('~/Assets/Images/slider3.png'),
  },
];

export {Carousel};
