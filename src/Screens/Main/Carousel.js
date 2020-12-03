import React, {PureComponent} from 'react';
import {Text, Dimensions, Image, StyleSheet, View} from 'react-native';

import SwiperFlatList from 'react-native-swiper-flatlist';
import styled from 'styled-components';
const SliderContainer = styled.View``;

const ImageSlider = ({data, height, width}) => {
  return (
    <SliderContainer style={{width, height}}>
      <Image source={data.uri} style={{width, height}}></Image>
    </SliderContainer>
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
const Carousel = ({height, width}) => {
  return (
    <View style={{flex: 1}}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        index={2}
        showPagination>
        {sliderList.map((item, index) => {
          return (
            <ImageSlider
              key={index}
              height={height}
              width={width}
              data={item}
            />
          );
        })}
      </SwiperFlatList>
    </View>
  );
};

export default Carousel;
