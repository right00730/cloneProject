import React, {useState} from 'react';
import Styled from 'styled-components/native';
import Geolocation from 'react-native-geolocation-service';
import {Alert, PermissionsAndroid} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {SearchButton} from '~/Components/Component/SearchButton';
const Container = Styled.View`
padding: 25px 10px;
flex:1;
background-color: white;
`;
const InputContainer = Styled.View`
flex-direction :row;
width: 100%;
justify-content : space-between;
height: 47px;
`;

const MessageInput = Styled.TextInput`
font-size : 20px;
border : solid 1px lightgray;
width: 80%;
background-color : rgba(243,244,240,0.5);
`;

const SearchAddr = Styled.TouchableOpacity`
align-items: center;
border : solid 1px lightgray;
flex-direction :row;
 justify-content: center ;
padding: 10px 15px;

 `;

const MainMessage = Styled.Text`
font-size : 33px;
font-weight: 600;
margin-bottom : 20px;
`;
const Icon = Styled.Image`
`;

const AddrMessage = Styled.Text`
font-size : 20px;

`;

interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}

const LocationInput = ({navigation}: Props) => {
  const [locations, setLocations] = useState<Array<number>>([
    127.4444,
    36.5555,
  ]);
  async function requestLocationPermission() {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (position) => {
            Alert.alert('위치정보 제공에  동의하셨습니다');
            const {longitude, latitude} = position.coords;
            setLocations([longitude, latitude]);
          },
          (error) => {
            console.log(error.code, error.message);
          },
        );
      } else {
        Alert.alert('위치정보 제공에  거부하셨습니다.');
      }
    } catch (error) {
      console.log('location get fail>>>', error);
    }
  }

  const location = () => {
    requestLocationPermission();
  };

  const [message, setMessage] = useState('');
  return (
    <Container>
      <MainMessage>배달 받으실{'\n'}주소를 입력하세요 </MainMessage>
      <InputContainer>
        <MessageInput onChangeText={(text) => setMessage(text)}></MessageInput>
        <SearchButton
          onPress={() => {
            message === ''
              ? navigation.navigate('LocationList', {message})
              : navigation.navigate('LocationList', {message});
            //  : Alert.alert('주소를 입력하세요');
          }}
        />
      </InputContainer>
      <MainMessage
        style={{
          marginTop: 20,
        }}>
        {' '}
        또는{' '}
      </MainMessage>
      <SearchAddr onPress={location}>
        <Icon
          source={require('~/Assets/Images/location_pin.png')}
          style={{width: '8%'}}
        />
        <AddrMessage> 현 위치로 주소 설정</AddrMessage>
      </SearchAddr>
    </Container>
  );
};

export default LocationInput;
