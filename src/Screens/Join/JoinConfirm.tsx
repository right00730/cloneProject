import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Text, View} from 'react-native';
import Styled from 'styled-components/native';
import {Button} from '~/Components/Component/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {baeminColor} from '~/Components/Styles/Colors';
import {ScaleFromCenterAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';
import {CheckIcon} from '~/Components/Component/Icons';

const Container = Styled.View`
background-color:white
flex:1
align-items:center;
`;

const InputContainer = Styled.View`
padding: 20px;
width: 90%;
`;
const InnerInputContainer = Styled.View`
padding: 20px;
width: 90%;
flex-direction:row
align-content:space-between
`;

const NumberInput = Styled.TextInput`
border-bottom-width :1px
border-bottom-color :black
width: 100%;
`;

const Phone = Styled.Text`
font-size: 25px;
`;

const ButtonContainer = Styled.TouchableOpacity`
width:50%;
border: solid 1px gray;
align-items:center;
height: 50px;
justify-content:center;
align-self: center
`;

interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}
const JoinConfirm = ({navigation}: Props) => {
  const [checked, setChecked] = useState({
    numcheck: false,
    buttonCheck: false,
    confirmcheck: false,
  });
  const [phoneNum, setNumber] = useState('');
  const [confirmNum, setConfirmNum] = useState('');

  const onNumberCheck = (text: string) => {
    text = text
      .replace(/[^0-9]/g, '')
      .replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3')
      .replace('--', '-');
    if (text.length >= 13) {
      setChecked({...checked, numcheck: true});
      setNumber(text);
    } else {
      setNumber(text);

      setChecked({...checked, numcheck: false});
    }
  };
  const onButtonCheck = () => {
    setChecked({...checked, buttonCheck: true});
  };
  const onCofirmCheck = (text: string) => {
    text = text.replace(/[^0-9]/g, '');
    if (text.length >= 4) {
      setChecked({...checked, confirmcheck: true});
      setConfirmNum(text);
    } else {
      setChecked({...checked, confirmcheck: false});
      setConfirmNum(text);
    }
  };

  return (
    <Container>
      <InputContainer>
        <Phone>휴대 전화</Phone>
        <InnerInputContainer>
          <NumberInput
            value={phoneNum}
            onChangeText={onNumberCheck}
            placeholder="010-0000-0000"
          />
          <CheckIcon checkedValue={checked.numcheck} />
        </InnerInputContainer>
      </InputContainer>
      <ButtonContainer
        onPress={onButtonCheck}
        disabled={!checked.numcheck}
        style={{
          display: checked.buttonCheck ? 'none' : 'flex',
        }}>
        <Text style={{fontSize: 20}}>인증번호 받기</Text>
      </ButtonContainer>
      <View
        style={{
          display: checked.buttonCheck ? 'flex' : 'none',
        }}>
        <InputContainer>
          <Phone>인증 번호</Phone>

          <InnerInputContainer>
            <NumberInput
              value={confirmNum}
              onChangeText={onCofirmCheck}
              placeholder="0000"
            />
            <CheckIcon checkedValue={checked.confirmcheck} />
          </InnerInputContainer>
        </InputContainer>
        <ButtonContainer
          style={{width: 200}}
          onPress={() => navigation.navigate('JoinDataInput', {phoneNum})}
          disabled={!checked.confirmcheck}>
          <Text style={{fontSize: 20}}>인증 완료</Text>
        </ButtonContainer>
      </View>
    </Container>
  );
};
export default JoinConfirm;
