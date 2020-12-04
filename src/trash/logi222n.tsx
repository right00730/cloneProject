import {StackNavigationProp} from '@react-navigation/stack';
import React, {useContext, useEffect, useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Styled from 'styled-components/native';
import {Button} from '~/Components/Component/Button';
import Modal from 'react-native-modal';
import {
  HeightSize,
  WidthSize,
  width,
  height,
} from '~/Components/Component/SearchButton';
import {UserContext} from '~/Context';
import IsLoading from '../isLoading';
import {baeminColor} from '~/Components/Styles/Colors';
const Container = Styled.View`
flex:1 
background-color : white;
`;
const SubText = Styled.View`
flex-direction : row;
justify-content :space-between;
padding : 10px;
`;
const TextInputContainer = Styled.View`
height :350px;
width: 90%;
justify-content : center;
align-content:center;
text-align:center;
padding : 40px;
`;
const ButtontContainer = Styled.View`
margin:30px;
`;

const IdInput = Styled.TextInput`
border-bottom-color: gray;
border-bottom-width: 0.5px;
height: ${WidthSize(50)}px
font-size: ${WidthSize(20)}px;
width : ${width / 1.3}px
margin-top : 10px
padding-left: 10px;
`;
const PWInput = Styled(IdInput)`

`;
const IDPW = Styled.Text`
font-size: ${WidthSize(18)}px;

`;

const ModalContainer = Styled.View`
align-self:center;
align-items: center;

height : ${HeightSize(250)}px
width : ${WidthSize(260)}px
background-color:white
padding : 20px 0px;  
border-radius : 10px;
`;

type MainLocation = StackNavigationProp<NavigationParamList, 'Login'>;

interface Props {
  navigation: MainLocation;
}
interface InfoProps {
  email: string;
  password: string;
}
const LoginBtn = Styled.TouchableOpacity`
width: 50%;
`;
const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isModalState, setModalState] = useState(false);

  const {login, userInfo, isLoading, setIsLoading} = useContext(UserContext);
  const onPressBtn = async () => {
    setIsLoading(true);
    const result = await login(email, pw);
    userInfo.email ? setModalState(false) : setModalState(true);
    setEmail('');
    setPw('');
  };
  const toggleModal = () => {
    const flag = !isModalState;
    setModalState(flag);
  };
  return (
    <Container>
      <TextInputContainer>
        <IdInput
          onChangeText={(text: string) => {
            setEmail(text);
          }}
          value={email}
          placeholder="아이디를 입력하세요"
        />
        <PWInput
          secureTextEntry={true}
          value={pw}
          placeholder="비밀번호를 입력하세요"
          onChangeText={(text: string) => {
            setPw(text);
          }}
        />

        <SubText>
          <TouchableOpacity>
            <IDPW>아이디/비밀번호 찾기</IDPW>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('JoinTerm');
            }}>
            <IDPW style={{color: baeminColor, fontWeight: 'bold'}}>
              회원가입
            </IDPW>
          </TouchableOpacity>
        </SubText>
      </TextInputContainer>
      <ButtontContainer>
        <Button
          title="로그인"
          checked={true}
          wsize={300}
          onPressed={onPressBtn}
        />
      </ButtontContainer>
      <Modal
        animationInTiming={10}
        animationOutTiming={10}
        useNativeDriver={true}
        isVisible={isModalState}>
        <ModalContainer>
          <Text style={{fontSize: 20, padding: 10}}>
            아이디 또는 비밀번호가 일치하지 않습니다.
            {'\n'}다시 시도해 주세요.
          </Text>
          <Button
            hsize={60}
            wsize={WidthSize(100)}
            checked={true}
            title="확인"
            onPressed={toggleModal}></Button>
        </ModalContainer>
      </Modal>
    </Container>
  );
};
export default Login;
