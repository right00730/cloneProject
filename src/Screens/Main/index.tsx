import React, {useEffect, useContext} from 'react';
import {Dimensions} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Styled from 'styled-components/native';
import {Carousel} from './Carousel';
import {MenuIcons} from './MenuIcons';
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
//github.com/GeekyAnts/NativeBase/issues/2947 >>스크롤뷰 에러 해결하기
const AddrButton = Styled.ScrollView`
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
    <AddrButton>
      <Carousel height={windowHeight / 4} width={windowWidth} />
      <ListContainer>
        <BackgroundImg source={require('~/Assets/Images/mainBackground.png')}>
          <FlatLists
            numColumns={4}
            data={list}
            keyExtractor={(item, index) => `index_${index}`}
            renderItem={({item}) => <MenuIcons data={item} />}
          />
        </BackgroundImg>
      </ListContainer>
    </AddrButton>
  );
};

export default Main;
