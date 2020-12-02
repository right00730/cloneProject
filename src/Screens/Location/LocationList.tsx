import React, {useState, useEffect, useContext} from 'react';
import Styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {FlatList, Text, View} from 'react-native';
import ListItem from '~/Screens/Location/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import {LocationContext} from '~/Context';
import IsLoading from '../isLoading';
const Container = Styled.SafeAreaView`
padding: 10px 10px;
flex:1;
background-color:white;
`;
const FailContainer = Styled.View`
padding: 10px 10px;
flex:1;
align-items : center
`;
const InputContainer = Styled.SafeAreaView`
width: 100%;
justify-content : space-between;
`;
const FailText = Styled.Text`
font-size: 17px
`;
type LocationRoute = RouteProp<NavigationParamList, 'LocationList'>;
type LocationNavigation = StackNavigationProp<
  NavigationParamList,
  'LocationList'
>;

interface Props {
  route: LocationRoute;
  navigation: LocationNavigation;
}

interface JSON {
  results: {
    juso: [
      {
        jibunAddr?: string;
        building?: string;
        roadAddr: string;
      },
    ];
  };
}
const LocationList = ({route, navigation}: Props) => {
  const [data, setData] = useState<Array<{}>>();
  const [loading, setLoading] = useState(false);

  const findAddr = () => {
    let text = route.params.message || '안암역';
    setLoading(true);
    const key = 'devU01TX0FVVEgyMDIwMTExOTA5MDQzOTExMDQzNzE';
    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=100&keyword=${text}&confmKey=${key}=&resultType=json`,
    )
      .then((response) => response.json())
      .then((json) => {
        pushAddr(json);
        setLoading(false);
      })
      .catch((e) => {
        console.log('roadAPI errorMessage>>', e);
        setLoading(false);
      });
  };
  useEffect(findAddr, []);

  const pushAddr = (json: JSON) => {
    const temp: Array<{}> = [];
    if (json.results.juso.length) {
      json.results.juso.map((data) => {
        temp.push({
          building: data.jibunAddr,
          roadAddr: data.roadAddr,
        });
      });
      setData(temp);
    } else {
      setData(undefined);
    }
  };
  return (
    <Container>
      <InputContainer></InputContainer>

      {data ? (
        <View>
          <FlatList
            data={data}
            keyExtractor={(item, index) => `index_${index}`}
            renderItem={({item}) => (
              <ListItem addr={item} navigation={navigation} />
            )}
          />
        </View>
      ) : (
        <FailContainer>
          <FailText style={{fontSize: 23, color: 'gray'}}>
            {loading ? '검색중...' : `검색결과가 없습니다. 다시 입력해주세요.`}
          </FailText>
          <FailText>{' \n'}예) 배민동 12-3, 배민로123 또는 배민아파트</FailText>
        </FailContainer>
      )}
    </Container>
  );
};

export default LocationList;
