import React, {useContext, useState} from 'react';
import Styled from 'styled-components/native';
import {SafeAreaView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoadName, WidthSize} from '~/Components/Component/SearchButton';
import axios from 'axios';
import {LocationContext} from '~/Context';
type LocationNavigation = StackNavigationProp<
  NavigationParamList,
  'LocationList'
>;
interface addrPorps {
  addr: {building?: any; roadAddr?: any};
  navigation?: LocationNavigation;
  borderN?: string;
}
const AddrContainer = Styled.SafeAreaView`
padding: 15px;
margin:0px 10px 0px 0px;
border : solid 0.5px lightgray;
border-left-width:0px;
border-top-color:white;
border-right-width:0px;
`;

const MainAddr = Styled.Text`
`;

const Detail = Styled.Text`
color : gray;
width : 100%;
`;
const RoadView = Styled.SafeAreaView`
width : 90%;
`;
interface Props {
  latitude: number;
  longitude: number;
  jibunAddress: string;
  roadAddress: string;
}
const ListItem = ({addr, navigation, borderN}: addrPorps) => {
  let adrs = {longitude: 0, latitude: 0, jibunAddress: '', roadAddress: ''};
  let {coords, addrInfo} = useContext(LocationContext);
  const [address, setAddress] = useState<Props>({
    longitude: 0,
    latitude: 0,
    jibunAddress: '',
    roadAddress: '',
  });

  function getAddr() {
    //비동기 처리 다시
    getXYbyLoadAddr()
      .then((data) => {
        coords = [adrs.latitude, adrs.longitude];

        navigation?.navigate('LocationDetail', {
          lat: adrs.latitude,
          lon: adrs.longitude,
        });
      })
      .catch((err) => console.log('getAddr', err));
  }
  const getXYbyLoadAddr = async () => {
    const tempAddr = addr.building;
    const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=${tempAddr}&coordinate=127.1054328,37.3595963`;
    await axios
      .get(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-NCP-APIGW-API-KEY-ID': '2rn6pel7yp',
          'X-NCP-APIGW-API-KEY': '9AGlf0BmOwn9aG5LlCxLmRNICb8gxpUt843tjE93',
        },
      })
      .then((response) => response.data)
      .then((data) => {
        insertData({
          jibunAddress: data.addresses[0].jibunAddress,
          roadAddress: data.addresses[0].roadAddress,
          longitude: data.addresses[0].x,
          latitude: data.addresses[0].y,
        });
      })
      .catch((error) => console.log('getXYbyLoadAddr errror>', error));

    return;
  };
  const insertData = (obj: any) => {
    setAddress(obj);
    adrs = obj;
  };
  return (
    <AddrContainer
      style={borderN === 'none' ? {borderBottomColor: 'white'} : undefined}
      onTouchEnd={getAddr}>
      <MainAddr
        style={{
          fontSize: WidthSize(20),
        }}>
        {addr.building}
      </MainAddr>

      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 7,
        }}>
        <View>
          <RoadName></RoadName>
        </View>
        <RoadView>
          <Detail style={{fontSize: WidthSize(15)}}>{addr.roadAddr}</Detail>
        </RoadView>
      </SafeAreaView>
    </AddrContainer>
  );
};
export default ListItem;
