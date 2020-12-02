import React, {useState} from 'react';
import Styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {baeminColor} from '~/Components/Styles/Colors';
import axios from 'axios';
import {Button} from '~/Components/Component/Button';
import {Alert, Text} from 'react-native';
import {color} from 'react-native-reanimated';
import {NavigationHelpersContext, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
const Container = Styled.View`
background-color:white;
flex:1
align-items:center;

`;
const InputContainer = Styled.View`
padding: 10px;
width: 90%;
`;
const InnerInputContainer = Styled.View`
padding: 20px;
width: 100%;
flex-direction:row
align-items:center

align-content:space-between
`;
const Title = Styled.Text`
font-size: 20px;

`;

const DataInput = Styled.TextInput`
border-bottom-width :1px;
border-bottom-color :black;
width: 100%;

`;

const ButtonContainer = Styled.TouchableOpacity`
width:60%;
border: solid 1px gray;
align-items:center;
height: 60px;
padding: 20px;
justify-content:center;
align-self: center

`;

const DoubleBtn = Styled.TouchableOpacity`
width:25%;
border: solid 1px gray;
padding: 10px;
justify-content:center;
align-self: center
position:absolute;
right: 10%;
`;

interface IconProps {
  checkedValue: boolean;
}
interface Props {
  route: RouteProp<NavigationParamList, 'JoinDataInput'>;
  navigation: StackNavigationProp<NavigationParamList>;
}

const JoinDataInput = ({navigation, route}: Props) => {
  console.log('route>>>>', route.params.phoneNum);
  const [checked, setChecked] = useState({
    emailCheck: false,
    nickNameCheck: false,
    pwCheck: false,
    birthCheck: false,
  });
  const [data, setData] = useState({
    email: '',
    nickName: '',
    pw: '',
    birth: '',
    memberPhone: route.params.phoneNum ? route.params.phoneNum : 'error',
  });
  const emailValidation = (text: string) => {
    let regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    return regExp.test(text) ? true : false;
  };

  const onEmailCheck = (text: string) => {
    setChecked({...checked, emailCheck: false});
    setData({...data, email: text});
  };

  const emailDoubleCheck = async () => {
    if (!emailValidation(data.email)) {
      Alert.alert('이메일 형식이 유효하지 않습니다.');
    } else {
      const Inputemail = data.email;
      const url = `http://192.168.0.37:8080/api/member/${Inputemail}`;
      await axios
        .get(url)
        .then((json) => json.data)
        .then((data) => {
          if (data) {
            Alert.alert('이미 존재하는 아이디 입니다.');
            setData({...data, email: ''});
            setChecked({...checked, emailCheck: false});
          } else {
            Alert.alert('사용가능한 아이디입니다.');
            setChecked({...checked, emailCheck: true});
          }
        })
        .catch((error) => console.log(error));
    }
  };
  const onPwCheck = (text: string) => {
    setData({...data, pw: text});
    const flag = text.length > 4 ? true : false;
    setChecked({...checked, pwCheck: flag});
  };
  const onBirthCheck = (text: string) => {
    const flag = text.length > 7 ? true : false;
    setChecked({...checked, birthCheck: flag});
  };
  const onNicknameCheck = (text: string) => {
    setData({...data, nickName: text});
    const flag = text.length > 2 && text.length < 4 ? true : false;
    setChecked({...checked, nickNameCheck: flag});
  };
  const onJoinFinish = async () => {
    console.log(data.email, data.nickName, data.pw, data.memberPhone);
    const url = 'http://192.168.0.37:8080/api/member/join';
    await axios
      .post(url, {
        email: data.email,
        memberName: data.nickName,
        password: data.pw,
        memberPhone: data.memberPhone,
      })
      .then((json) => json.data)
      .then((data) => {
        if (data.id) Alert.alert('회원가입이 완료되었습니다.');
        navigation.navigate('Login');
      })
      .catch((error) =>
        Alert.alert(`회원가입에 실패하였습니다. ${'\n'}입력값을 확인하세요`),
      );
  };
  let totalCheck =
    checked.emailCheck &&
    checked.nickNameCheck &&
    checked.birthCheck &&
    checked.pwCheck;
  return (
    <Container>
      <InputContainer>
        <Title>이메일</Title>
        <InnerInputContainer>
          <DataInput
            value={data.email}
            onChangeText={onEmailCheck}
            placeholder="이메일을 입력하세요"
          />
          <CheckIcon checkedValue={checked.emailCheck} />
          <DoubleBtn onPress={emailDoubleCheck}>
            <Text>중복확인</Text>
          </DoubleBtn>
        </InnerInputContainer>
      </InputContainer>
      <InputContainer>
        <Title>닉네임</Title>
        <InnerInputContainer>
          <DataInput
            value={data.nickName}
            onChangeText={onNicknameCheck}
            placeholder="닉네임을 입력하세요"
          />
          <CheckIcon checkedValue={checked.nickNameCheck} />
        </InnerInputContainer>
      </InputContainer>
      <InputContainer>
        <Title>비밀번호</Title>
        <InnerInputContainer>
          <DataInput
            secureTextEntry={true}
            value={data.pw}
            onChangeText={onPwCheck}
            placeholder="비밀번호를 입력하세요"
          />
          <CheckIcon checkedValue={checked.pwCheck} />
        </InnerInputContainer>
      </InputContainer>
      <InputContainer>
        <Title>생년월일</Title>
        <InnerInputContainer>
          <DataInput onChangeText={onBirthCheck} placeholder="예) 2000.01.01" />
          <CheckIcon checkedValue={checked.birthCheck} />
        </InnerInputContainer>
      </InputContainer>
      <ButtonContainer disabled={!totalCheck} onPress={onJoinFinish}>
        <Title style={{color: totalCheck ? 'black' : 'gray'}}>입력 완료</Title>
      </ButtonContainer>
    </Container>
  );
};

const CheckIcon = ({checkedValue}: IconProps) => {
  return (
    <Icon
      name="md-checkmark-circle-sharp"
      color={checkedValue ? baeminColor : 'gray'}
      size={20}
    />
  );
};
export default JoinDataInput;
