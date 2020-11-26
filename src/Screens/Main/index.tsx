import React, {useEffect, useContext, useRef} from 'react';
import {Dimensions, Animated, PanResponder, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Styled from 'styled-components/native';
import {Carousel} from './Carousel';
import {MenuIcons} from './MenuIcons';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
//github.com/GeekyAnts/NativeBase/issues/2947 >>스크롤뷰 에러 해결하기
const AddrButton = Styled.View`
  width: 100%;
  height: 100%;
  `;
const ListContainer = Styled.View`
height: 1000px;
 width: 100%;
`;
const BackgroundImg = Styled.ImageBackground`
 width: 100%;
`;
const FlatLists = Styled.FlatList`
flex-direction :row
flex-wrap : wrap
padding : 20px ;
`;
const Main = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dy: pan.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {
          toValue: {x: 0, y: 0},

          useNativeDriver: false,
        }, // Back to zero
      ).start();
    },
  });
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const list = [];
  for (let i = 0; i < 10; i++) {
    list.push(
      {
        name: '한식',
        uri: require('~/Assets/Images/food/korean.png'),
      },
      {
        name: '일식',
        uri: require('~/Assets/Images/food/japanese.png'),
      },
      {
        name: '피자',
        uri: require('~/Assets/Images/food/pizza.png'),
      },
      {
        name: '중식',
        uri: require('~/Assets/Images/food/chinese.png'),
      },
      {
        name: '도시락',
        uri: require('~/Assets/Images/food/lunchBox.png'),
      },
    );
  }

  return (
    <Animated.View {...panResponder.panHandlers} style={[pan.getLayout()]}>
      <Carousel height={100} width={400} />
      <ListContainer>
        <BackgroundImg
          source={require('~/Assets/Images/mainBackground.png')}></BackgroundImg>
      </ListContainer>
    </Animated.View>
  );
};

export default Main;
