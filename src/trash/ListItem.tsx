import React from 'react';
import Styled from 'styled-components/native';
import {SafeAreaView, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RoadName, WidthSize} from '~/Components/Component/SearchButton';
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
const ListItem = ({addr, navigation, borderN}: addrPorps) => {
  return (
    <AddrContainer
      style={borderN === 'none' ? {borderBottomColor: 'white'} : undefined}
      onTouchEnd={() => {
        navigation
          ? navigation.navigate('LocationDetail', {
              building: addr.building,
              roadAddr: addr.roadAddr,
            })
          : {};
      }}>
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
