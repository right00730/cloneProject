import axios from 'axios';
import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {LocationContext} from '~/Context';
import Styled from 'styled-components/native';
import {HeightSize, WidthSize} from '~/Components/Component/SearchButton';
import {RouteProp} from '@react-navigation/native';

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
font-size: 22px
font-weight: bold;
; `;
const StoreAddr = Styled(StoreName)`
font-size: 17px; `;

const Picture = Styled.Image`
height: ${HeightSize(100)}px
width: ${WidthSize(60)}px
border-radius : 9px;
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
  };
}
interface routeProps {
  route: storeRoute;
}

type storeRoute = RouteProp<NavigationParamList, 'StoreList'>;
const StoreList = ({route}: routeProps) => {
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
      });
  };
  const pushStore = (data: Array<any>) => {
    const temp: Array<{
      name: undefined;
      address: undefined;
      rating: undefined;
      picture: undefined;
    }> = [];
    if (data.length) {
      data.map((item) => {
        temp.push({
          name: item.name,
          address: item.address,
          rating: item.rating,
          picture: item.picture,
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
        </StoreAddr>
      </InfoContainer>
    </StoreContainer>
  );
};
export {StoreList};
