import React, {useContext, useEffect, useState} from 'react';
import Styled from 'styled-components/native';
import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import ListItem from './ListItem';
import {Alert, TextInput} from 'react-native';
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
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
height: 70%;
flex:1;

`;
const TextContainer = Styled.View`
background-color: rgba(255,255,255,0.9);
height: 200px;
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
width: 95%;
`;

const MainAddr = Styled.View`
font-size: 25px;
height: 40%;

`;
const TextInputContainer = Styled.View`
height: 25%;
margin:7px ;
align-self : center;
width: 100%;
align-items:center;

`;
const Label = Styled.Text`
font-size: 25px
color : white;
text-align:center;
font-weight:bold;

`;

const TextInputContainer2 = Styled(TextInputContainer)`
margin:0px ;

`;
const InputSubAddr = Styled.TextInput`
border : solid 1px lightgray
width:90%;
font-size: 20px;
margin-top:-10px
`;
const {width: windowWidth, height: windowHeight} = Dimensions.get('window');
type LocationRoute = RouteProp<NavigationParamList, 'LocationDetail'>;
type LocationNavigation = StackNavigationProp<NavigationParamList>;

interface Props {
  route: LocationRoute;
  navigation: LocationNavigation;
}

const markerSize = 35;
interface addrProps {
  jibunAddress: string;
  roadAddress: string;
  subAddress: string;
}
let temp_data = {jibunAddress: '', roadAddress: ''};
const LocationDetail = ({route, navigation}: Props) => {
  const {setAddr, addrInfo, coords, setCoords} = useContext(LocationContext);
  const [addrbyXY, setAddrbyXY] = useState<addrProps>({
    jibunAddress: '',
    roadAddress: '',
    subAddress: '',
  });
  const [coord, setCoord] = useState({
    longitude: parseFloat(route.params.lon),
    latitude: parseFloat(route.params.lat),
  });
  //카메라 변화있을때 실행
  async function changed(e: any) {
    console.log('incoming aaddr>', e.longitude);
    setCoord({latitude: e.latitude, longitude: e.longitude});
    await getAddrbyXY(e.longitude, e.latitude)
      .then(() => {
        setAddrbyXY({
          ...addrbyXY,
          jibunAddress: temp_data.jibunAddress,
          roadAddress: temp_data.roadAddress,
        });
      })
      .then(() => {
        setCoords({lon: e.longitude, lat: e.latitude});
      });
  }

  //마커 움직였을 때 실행
  const [move, setMove] = useState({
    MoveTop: windowHeight / 2 - 30,
    BottomTop: windowHeight / 2 - 20,
    MoveOpacity: 1,
  });
  //상세주소 입력할 때 실행
  const onAddrInput = (text: any) => {
    setAddrbyXY({...addrbyXY, subAddress: text});
  };
  return (
    <Container>
      <View style={{flex: 1}}>
        <NaverMapView
          style={{height: windowHeight}}
          center={{
            longitude: parseFloat(route.params.lon),
            latitude: parseFloat(route.params.lat),
          }}
          onTouch={() => {
            setMove({
              ...move,
              MoveTop: windowHeight / 2 - 50,
              MoveOpacity: 0.7,
            });
          }}
          onCameraChange={(e) => {
            changed(e);
            setMove({...move, MoveTop: windowHeight / 2 - 35, MoveOpacity: 1});
          }}></NaverMapView>
        <Icon
          name="pizza-outline"
          size={markerSize}
          color={`rgba(237,28,36,${move.MoveOpacity})`}
          style={[
            style.centermarker,
            {top: move.MoveTop, opacity: move.MoveOpacity},
          ]}
        />
        <Icon
          name="md-locate-outline"
          size={markerSize}
          color={'rgb(237,28,36)'}
          style={[style.bottommarker, {top: move.BottomTop}]}
        />
      </View>
      <TextContainer>
        <MainAddr>
          <ListItem
            borderN="none"
            addr={{
              building: addrbyXY.jibunAddress,
              roadAddr: addrbyXY.roadAddress,
            }}
          />
        </MainAddr>

        <TextInputContainer>
          <InputSubAddr
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
              !addrInfo
                ? addrbyXY.roadAddress
                  ? setAddr(
                      `${addrbyXY.roadAddress} ${addrbyXY.jibunAddress} ${addrbyXY.subAddress}`,
                    )
                  : setAddr(`${addrbyXY.jibunAddress} ${addrbyXY.subAddress}`)
                : (addrbyXY.roadAddress
                    ? setAddr(
                        `${addrbyXY.roadAddress} ${addrbyXY.jibunAddress} ${addrbyXY.subAddress}`,
                      )
                    : setAddr(
                        `${addrbyXY.jibunAddress} ${addrbyXY.subAddress}`,
                      ),
                  navigation.popToTop());
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
  bottommarker: {
    position: 'absolute',
    right: windowWidth / 2 - markerSize / 2,
  },
});
const getAddrbyXY = async (x: number, y: number) => {
  const url = `https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/gc?coords=${x},${y}&sourcecrs=epsg:4326&orders=roadaddr,addr&output=json`;
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
      let temp = {};
      if (data.results[0].land) {
        if (data.results[0].land.name && data.results[0].land.name !== 'addr') {
          temp = {
            roadAddress: `${data.results[0].land.name} ${data.results[0].land.number1}`,
            jibunAddress: data.results[0].land.addition0.value
              ? data.results[0].land.addition0.value
              : `${data.results[0].region.area2.name}${data.results[0].region.area3.name}`,
          };
        } else if (data.results[0].region.area1) {
          temp = {
            jibunAddress:
              ` ${data.results[0].region.area2.name} ${data.results[0].region.area3.name}` +
              `${data.results[0].land.number1} ${data.results[0].land.number2}`,
          };
        } else if (data.results[0].land.addition0.value) {
          temp = {jibunAddress: data.results[0].land.addition0.value};
        } else {
          temp = {roadAddress: '주소를 찾을 수 없습니다.', jibunAddress: ''};
        }
      } else {
        temp = {roadAddress: '주소를 찾을 수 없습니다.', jibunAddress: ''};
      }
      tempFunc(temp);
    });
};
const tempFunc = (data: any) => {
  temp_data = data;
  return data;
};
