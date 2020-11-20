import React, {useContext, useState} from 'react';
import Styled from 'styled-components/native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import {TextInput} from '~/Components/Component/SearchButton';

import ListItem from './ListItem';
import {LocationContext} from '~/Context';

const Container = Styled.View`

height: 70%;
flex:1;
justify-content : flex-end;
align-items:center;

`;
const TextContainer = Styled.View`
background-color: white;
height: 220px;
width: 100%;
flex-direction : column;


`;

const ButtonContainer = Styled.TouchableOpacity`
bottom:1px;
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

const RoadAddr = Styled(MainAddr)`
font-size: 20px;
`;
type LocationRoute = RouteProp<NavigationParamList, 'LocationDetail'>;
type LocationNavigation = NavigationProp<NavigationParamList, 'LocationDetail'>;
interface Props {
  route: LocationRoute;
  navigation: LocationNavigation;
}

const LocationDetail = ({route, navigation}: Props) => {
  const road = route.params.roadAddr;
  const {setAddr, addrInfo} = useContext(LocationContext);

  return (
    <Container>
      <TextContainer>
        <MainAddr>
          <ListItem
            borderN="none"
            addr={{
              bdNm: route.params.mainAddr,
              jibunAddr: route.params.roadAddr,
            }}
          />
        </MainAddr>
        <TextInputContainer>
          <TextInput placeholderMsg={'상세주소를 입력하세요( 동/호수 등)'} />
        </TextInputContainer>
        <TextInputContainer2>
          <ButtonContainer
            style={{backgroundColor: 'rgb(41, 194, 189)'}}
            onPress={() => {
              setAddr(road);
              navigation.navigate('Main');
            }}>
            <Label>완료</Label>
          </ButtonContainer>
        </TextInputContainer2>
      </TextContainer>
    </Container>
  );
};
export default LocationDetail;
