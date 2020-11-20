import React, {useState, useEffect} from 'react';
import Styled from 'styled-components/native';
import {RouteProp} from '@react-navigation/native';
import {FlatList, View} from 'react-native';
import ListItem from '~/Screens/Location/ListItem';
import {StackNavigationProp} from '@react-navigation/stack';
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

  const findAddr = () => {
    let text = route.params.message || '안암역';

    console.log('>>', text);
    const key = 'devU01TX0FVVEgyMDIwMTExOTA5MDQzOTExMDQzNzE';
    fetch(
      `http://www.juso.go.kr/addrlink/addrLinkApi.do?currentPage=1&countPerPage=100&keyword=${text}&confmKey=${key}=&resultType=json`,
    )
      .then((response) => response.json())
      .then((json) => {
        pushAddr(json);
      })
      .catch((e) => console.log('APIerrorMessage>>', e));
  };
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

export default LocationList;
