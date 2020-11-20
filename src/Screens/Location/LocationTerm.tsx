import React, {useEffect, useState} from 'react';
import {Button} from '~/Components/Component/Button';
import Checkbox from '~/Components/Component/Checkbox';
import SplashScreen from 'react-native-splash-screen';
import Styled from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

const Container = Styled.View`
padding: 25px 10px;
flex:1;
background-color: white;
`;
const CheckBoxTouchAble = Styled.TouchableOpacity`
padding : 1px 0px;  
`;
const TextContainer = Styled.View`
padding-bottom : 20px; 

`;
const MainMessage = Styled.Text`
font-size : 31px;
font-weight: 600;
`;

interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}
const LocationTerm = ({navigation}: Props) => {
  const [checked, setCheck] = useState<boolean>(false);
  const [checked2, setCheck2] = useState<boolean>(false);
  const [checkedT, setCheckT] = useState<boolean>(false);

  const onAllchanged = () => {
    const temp = !checkedT;
    setCheck(temp);
    setCheck2(temp);
    setCheckT(temp);
  };
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <Container>
        <TextContainer>
          <MainMessage>
            환영합니다!{'\n'}
            아래 약관에 동의하시면 {'\n'}
            맛있는 여행이 시작됩니다.
          </MainMessage>
        </TextContainer>

        <CheckBoxTouchAble onPressIn={onAllchanged} activeOpacity={1}>
          <Checkbox value={checked && checked2} label={'전체동의'} />
        </CheckBoxTouchAble>

        <CheckBoxTouchAble
          activeOpacity={1}
          style={{borderTopColor: 'gray', borderTopWidth: 1}}
          onPressIn={() => {
            const temp = checked;
            setCheck(!temp);
          }}>
          <Checkbox
            value={checked}
            label={'위치 기반 서비스 약관 동의 (필수)'}
          />
        </CheckBoxTouchAble>
        <CheckBoxTouchAble
          activeOpacity={1}
          onPress={() => {
            const temp = checked2;
            setCheck2(!temp);
          }}>
          <Checkbox
            value={checked2}
            label={'마케팅 정보 앱 푸시 알림 수신 동의 (선택)'}
          />
        </CheckBoxTouchAble>
        <Button
          onPressed={() => navigation.navigate('LocationInput')}
          checked={checked && checked2}
          title={'동의합니다.'}
        />
      </Container>
    </>
  );
};
export default LocationTerm;
