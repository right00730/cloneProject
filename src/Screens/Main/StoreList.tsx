import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {LocationContext} from '~/Context';
import Styled from 'styled-components/native';
import {HeightSize, WidthSize} from '~/Components/Component/SearchButton';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Cotainer = Styled.View`
flex: 1;
background-color: white;
`;

const StoreContainer = Styled.View`
width: 100% ; 
height: ${HeightSize(150)}px
border: solid 0.2px lightgray;
flex-direction : row
align-items:center;
padding: 5px;
;

`;
const StoreName = Styled.Text`
font-size: 20px
font-weight: bold;
; `;
const StoreAddr = Styled(StoreName)`
font-size: 17px; `;

const Picture = Styled.Image`
height: ${HeightSize(90)}px
width: ${WidthSize(50)}px
border-radius : 22px;
`;
const InfoContainer = Styled.View`
padding: 10px;
`;
interface Props {
  item: {
    name: string;
    address: string;
    rating: string;
    picture: string;
    time: undefined;
    amount: undefined;
  };
}
interface routeProps {
  route: storeRoute;
  navigation: storeNavigation;
}

type storeRoute = RouteProp<NavigationParamList, 'StoreList'>;
type storeNavigation = StackNavigationProp<NavigationParamList>;

const StoreList = ({route, navigation}: routeProps) => {
  let kind = route.params.kind;
  const {coords} = useContext(LocationContext);
  const [data, setData] = useState<Array<{}>>();
  const getStoreInfo = async () => {
    const url = `http://192.168.0.37:8080/api/mango/foodlist?rangearray=rating&kind=${kind}&password=123&lat=37.511367&lot=127.0211838&myfield=200`;
    axios
      .get(url, {})
      .then((json) => json.data)
      .then((data) => {
        pushStore(data);
      })
      .catch(() => {
        Alert.alert('등록된 가게가 없습니다.');
        navigation.popToTop();
      });
  };
  const pushStore = (data: Array<any>) => {
    const temp: Array<{
      name: undefined;
      address: undefined;
      rating: undefined;
      picture: undefined;
      time: undefined;
      amount: undefined;
    }> = [];
    if (data.length) {
      console.log(data);
      data.map((item) => {
        temp.push({
          name: item.name,
          address: item.address,
          rating: item.rating,
          picture: item.picture,
          time: item.time,
          amount: item.amount,
        });
      });
      setData(temp);
    } else {
      setData(undefined);
    }
  };
  useEffect(() => {
    getStoreInfo();
  }, []);
  return (
    <Cotainer>
      <FlatList
        data={data}
        keyExtractor={(item, index) => `index_${index}`}
        renderItem={StoreComponent}
      />
    </Cotainer>
  );
};
const StoreComponent = ({item}: Props) => {
  return (
    <StoreContainer>
      <Picture source={{uri: item.picture}} />
      <InfoContainer>
        <StoreName>{item.name}</StoreName>
        <StoreAddr>
          ⭐{item.rating} /{item.address}
          {'\n'}⏲ {item.time} / {item.amount}
        </StoreAddr>
      </InfoContainer>
    </StoreContainer>
  );
};
export {StoreList};
