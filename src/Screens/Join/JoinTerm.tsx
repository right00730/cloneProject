import React, {useEffect, useState} from 'react';
import { Button } from '~/Components/Component/Button';

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
  const [checked3, setCheck3] = useState<boolean>(false);
  const [checked4, setCheck4] = useState<boolean>(false);

  const [checkedT, setCheckT] = useState<boolean>(false);

  const onAllchanged = () => {
    const temp = !checkedT;
    setCheck(temp);
    setCheck2(temp);
    setCheck3(temp);
    setCheck4(temp);

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
            약관 동의가{'\n'}
            필요해요
          </MainMessage>
        </TextContainer>

        <CheckBoxTouchAble onPressIn={onAllchanged} activeOpacity={1}>
          <Checkbox
            value={checked && checked2 && checked3 && checked4}
            label={'전체동의'}
          />
        </CheckBoxTouchAble>

        <CheckBoxTouchAble
          activeOpacity={1}
          style={{borderTopColor: 'gray', borderTopWidth: 1}}
          onPressIn={() => {
            const temp = checked;
            setCheck(!temp);
          }}>
          <Checkbox value={checked} label={'배달의민족 이용약관 동의'} />
        </CheckBoxTouchAble>
        <CheckBoxTouchAble
          activeOpacity={1}
          onPress={() => {
            const temp = checked2;
            setCheck2(!temp);
          }}>
          <Checkbox value={checked2} label={'전자금융거래 이용약관 동의'} />
        </CheckBoxTouchAble>
        <CheckBoxTouchAble
          activeOpacity={1}
          onPress={() => {
            const temp = checked3;
            setCheck3(!temp);
          }}>
          <Checkbox value={checked3} label={'개인정보 수집이용 동의 (선택)'} />
        </CheckBoxTouchAble>
        <CheckBoxTouchAble
          activeOpacity={1}
          onPress={() => {
            const temp = checked4;
            setCheck4(!temp);
          }}>
          <Checkbox
            value={checked4}
            label={'개인정보 제 3자 제공 동의 (선택)'}
          />
        </CheckBoxTouchAble>

        <Button
          onPressed={() => navigation.navigate('JoinConfirm')}
          checked={checked && checked2 && checked3 && checked4}
          title={'동의합니다.'}
        />
      </Container>
    </>
  );
};
export default LocationTerm;
