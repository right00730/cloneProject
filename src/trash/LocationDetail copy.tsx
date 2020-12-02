import React, {useContext, useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import ListItem from './ListItem';
import {TextInput} from 'react-native';
import {LocationContext} from '~/Context';
import NaverMapView, {
  Circle,
  Marker,
  Path,
  Polyline,
  Polygon,
} from 'react-native-nmap';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';

import Geolocation from 'react-native-geolocation-service';

const Container = Styled.View`

height: 70%;
flex:1;

`;
const TextContainer = Styled.View`
background-color: white;
height: 220px;
width: 100%;
flex-direction : column;


`;

const ButtonContainer = Styled.TouchableOpacity`
position:absolute;
justify-content :center;
background-color: rgb(41, 194, 189);
align-items : center;
height: 50px;
border-radius : 5px;
width: 98%;
`;

const MainAddr = Styled.View`
font-size: 25px;
height: 40%;

`;
const TextInputContainer = Styled.View`
height: 25%;
margin:5px ;
align-self : center;
width: 100%;
align-items:center;

`;
const Label = Styled.Text`
font-size: 20px
color : white;
text-align:center;
font-weight:bold;

`;

const TextInputContainer2 = Styled(TextInputContainer)`
margin:0px ;

`;
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

type LocationRoute = RouteProp<NavigationParamList, 'LocationDetail'>;
type LocationNavigation = NavigationProp<NavigationParamList, 'LocationDetail'>;
interface Props {
  route: LocationRoute;
  navigation: LocationNavigation;
}
interface addrProps {
  mainaddr: string;
  building: string;
  subaddr: string;
}
const markerSize = 35;

const LocationDetail = (addr: any, setAddrs: any) => {
  //좌표  state
  const [location, setLocation] = useState({latitude: null, longitude: null});

  const {setAddr, addrInfo} = useContext(LocationContext);

  const changed = (e: any) => {
    setLocation({longitude: e.longitude, latitude: e.latitude});
    LocationWithXY(e.longitude, e.latitude, addr, setAddrs);
  };
  const [move, setMove] = useState({
    MoveTop: windowHeight / 2 - 30,
    MoveOpacity: 1,
  });
  const onAddrInput = (text: any) => {
    setAddrs({...addr, subaddr: text});
  };
  return (
    <Container>
      <View style={{flex: 1}}>
        <NaverMapView
          style={{height: windowHeight}}
          center={{longitude: 127.036204916255, latitude: 37.6619215478977}}
          onTouch={() => {
            setMove({MoveTop: windowHeight / 2 - 35, MoveOpacity: 0.7});
          }}
          onCameraChange={(e) => {
            changed(e);
            setMove({MoveTop: windowHeight / 2 - 35, MoveOpacity: 1});
          }}></NaverMapView>
        <Icon
          name="pizza-outline"
          size={markerSize}
          color={`rgba(237,28,36,${move.MoveOpacity})`}
          style={[
            style.centermarker,
            {top: move.MoveTop, opacity: move.MoveOpacity},
          ]}></Icon>
      </View>
      <TextContainer>
        <MainAddr>
          <ListItem
            borderN="none"
            addr={{
              building: addr.building,
              roadAddr: addr.roadAddr,
            }}
          />
        </MainAddr>

        <TextInputContainer>
          <TextInput
            onChangeText={(text) => {
              onAddrInput(text);
            }}
            placeholder={'상세주소를 입력하세요( 동/호수 등)'}
          />
        </TextInputContainer>
        <TextInputContainer2>
          <ButtonContainer
            style={{backgroundColor: 'rgb(41, 194, 189)'}}
            onPress={() => {
              setAddr(addr.building + addr.subaddr);
            }}>
            <Label>완료</Label>
          </ButtonContainer>
        </TextInputContainer2>
      </TextContainer>
    </Container>
  );
};
export default LocationDetail;

const style = StyleSheet.create({
  centermarker: {
    position: 'absolute',
    right: windowWidth / 2 - markerSize / 2,
  },
});

const LocationWithXY = (x: number, y: number, state: any, set: any) => {
  console.log('LocationWithXY run');
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${x},${y}&sourcecrs=epsg:4326&orders=roadaddr,addr&output=json`;
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': '2rn6pel7yp',
        'X-NCP-APIGW-API-KEY': '9AGlf0BmOwn9aG5LlCxLmRNICb8gxpUt843tjE93',
      },
    })
    .then((response) => response.data)
    .then((data) => {
      set(
        data.results[0].land.name
          ? {
              mainaddr: `${data.results[0].land.name} ${data.results[0].land.number1}`,
              building: data.results[0].land.addition0.value
                ? `${data.results[0].land.addition0.value} `
                : `${data.results[0].region.area3.name} ${data.results[1].land.number1}`,
            }
          : {mainaddr: '주소를 찾을 수 없습니다.', building: '다시 검색하세요'},
      );
    })

    .catch((error) =>
      set({mainaddr: '주소를 찾을 수 없습니다.', building: '다시 검색하세요'}),
    );
  return state;
};
