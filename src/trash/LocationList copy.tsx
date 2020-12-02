import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import ListItem from '~/Screens/Location/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
const Container = Styled.SafeAreaView`
padding: 40px 10px;
flex:1;
background-color: white;
`;
const InputContainer = Styled.SafeAreaView`
width: 100%;
justify-content : space-between;
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
        bdNm: string;
        jibunAddr: string;
      },
    ];
  };
}
const LocationList = ({route, navigation}: Props) => {
  const [data, setData] = useState<Array<{}>>();

  useEffect(findAddr, []);

  const pushAddr = (json: JSON) => {
    const temp: Array<{}> = [];
    json.results.juso.map((data) => {
      temp.push({
        bdNm: data.bdNm,
        jibunAddr: data.jibunAddr,
      });
    });
    setData(temp);
  };

  return (
    <Container>
      <InputContainer></InputContainer>
      <View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => `index_${index}`}
          renderItem={({item}) => (
            <ListItem addr={item} navigation={navigation} />
          )}
        />
      </View>
    </Container>
  );
};
const findAddr = () => {
  const url = `https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=서울시 도봉구 방학동 672-1&coordinate=127.1054328,37.3595963`;
  axios
    .get(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-NCP-APIGW-API-KEY-ID': '2rn6pel7yp',
        'X-NCP-APIGW-API-KEY': '9AGlf0BmOwn9aG5LlCxLmRNICb8gxpUt843tjE93',
      },
    })
    .then((response) => response.data)
    .then((data) => console.log(data))

    .catch((error) => console.log('errror>', error));
};

export default LocationList;
