import React, {useEffect, useContext} from 'react';
import {Dimensions, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Styled from 'styled-components/native';
import Carousel from './Carousel';
import {MenuIcons} from './MenuIcons';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
//github.com/GeekyAnts/NativeBase/issues/2947 >>스크롤뷰 에러 해결하기
const ListContainer = Styled.ScrollView`
height: 1000px;
 width: 100%;
flex:1;

 `;
const BackgroundImg = Styled.ImageBackground`
 width: 100%;
 flex:1
 height: 100%;

 `;
const FlatLists = Styled.View`
flex-direction :row
flex-wrap : wrap
margin: 20px 18px;
`;
const Main = () => {
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
        name: '양식',
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
    <ListContainer>
      <BackgroundImg source={require('~/Assets/Images/mainBackground.png')}>
        <Carousel height={windowHeight / 4} width={windowWidth} />
        <FlatLists>
          {list.map((item, i) => {
            return <MenuIcons key={i} data={item} />;
          })}
        </FlatLists>
      </BackgroundImg>
    </ListContainer>
  );
};

export default Main;
