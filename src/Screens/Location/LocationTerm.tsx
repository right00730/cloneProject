import React, {useEffect, useState} from 'react';
import {Button} from '~/Components/Component/Button';
import Checkbox from '~/Components/Component/Checkbox';
import SplashScreen from 'react-native-splash-screen';
import Styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {StackNavigationProp} from '@react-navigation/stack';
import {Text} from 'react-native';
import {HeightSize, WidthSize} from '~/Components/Component/SearchButton';
const Container = Styled.View`
padding: 25px 10px;
flex:1;
background-color: white;
`;
const CheckBoxTouchAble = Styled.TouchableOpacity`
padding : 1px 0px;  
flex-direction: row;
align-items: center;
            
`;
const ModalContainer = Styled.ScrollView`
align-self:center;

height : ${HeightSize(500)}px
width : ${WidthSize(250)}px
background-color:white
padding : 1px 0px;  
`;

const TextContainer = Styled.View`
padding-bottom : 20px; 

`;
const MainMessage = Styled.Text`
font-size : 31px;
font-weight: 600;
`;
const ShowPinTxt = Styled.Text`
font-size : 20px;
font-weight: bold
width: 100px;
color: gray


`;
const Buttons = Styled.Button``;
interface Props {
  navigation: StackNavigationProp<NavigationParamList>;
}
const LocationTerm = ({navigation}: Props) => {
  const [checked, setCheck] = useState<boolean>(false);
  const [checked2, setCheck2] = useState<boolean>(false);
  const [checkedT, setCheckT] = useState<boolean>(false);
  const [isModalState, setModalState] = useState({
    fir: false,
    sec: false,
  });

  const toggleModal = (obj: string) => {
    if (obj === 'fir') {
      setModalState({...isModalState, fir: !isModalState.fir});
    } else {
      setModalState({...isModalState, sec: !isModalState.sec});
    }
  };
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
          <MainMessage>{tasteTravle}</MainMessage>
        </TextContainer>
        <CheckBoxTouchAble onPressIn={onAllchanged} activeOpacity={1}>
          <Checkbox value={checked && checked2} label={'전체동의'} />
        </CheckBoxTouchAble>

        <CheckBoxTouchAble
          activeOpacity={1}
          style={{
            borderTopColor: 'gray',
            borderTopWidth: 1,
          }}
          onPressIn={() => {
            const temp = checked;
            setCheck(!temp);
          }}>
          <Checkbox
            value={checked}
            label={'위치 기반 서비스 약관 동의 (필수)'}
          />
          <ShowPinTxt onPress={() => toggleModal('fir')}> 보기 </ShowPinTxt>
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
          <ShowPinTxt onPress={() => toggleModal('sec')}> 보기 </ShowPinTxt>
        </CheckBoxTouchAble>
        <Button
          onPressed={() => navigation.navigate('LocationInput')}
          checked={checked && checked2}
          title={'동의합니다.'}
        />
      </Container>

      <Modal useNativeDriver={true} isVisible={isModalState.fir}>
        <ModalContainer onTouchEnd={() => toggleModal('fir')}>
          <Text style={{fontSize: 20, padding: 10}}>{termMsg}</Text>
        </ModalContainer>
      </Modal>
      <Modal useNativeDriver={true} isVisible={isModalState.sec}>
        <ModalContainer onTouchEnd={() => toggleModal('sec')}>
          <Text style={{fontSize: 20, padding: 10}}>{marketingMsg}</Text>
        </ModalContainer>
      </Modal>
    </>
  );
};

const termMsg =
  '\n(주)우아한형제들(이하 ‘회사’라 한다)은 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 개인정보보호법 등 관련 법령(이하 “관련 법령” 이라 함)에 따라 이용자의 개인정보를 보호하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보처리방침을 수립합니다.\n\n 개인정보처리방침은 이용자가 언제나 쉽게 열람할 수 있도록 서비스 초기화면을 통해 공개하고 있으며, 개인정보 관련법령, 지침, 고시 또는 회사 정책의 변경에 따라 변경될 수 있습니다.';
const marketingMsg =
  '1. 개인정보의 수집·이용 \n \n 회사는 다음과 같이 이용자의 개인정보를 수집합니다. 회사가 처리하고 있는 개인정보는 다음의 수집·이용목적 이외의 용도로는 활용되지 않으며, 수집·이용목적이 변경되는 경우에는 “관련 법령”에 따라 별도의 동의를 받는 등 필요한 조치를 이행합니다. 이용자 정보의 수집·이용목적, 수집항목, 보유·이용기간은 아래와 같습니다. 또한 인재영입과 관련된 관계 법령에 따라 이용자의 정보를 수집 및 보관할 수 있습니다.' +
  '\n\n2. 개인정보의 제3자 제공회사는 이용자의 개인정보를 개인정보 수집·이용 목적에서 명시한 범위 내에서 사용하며, 원칙적으로 이용자의 사전 동의 없이 개인정보 수집·이용 목적 범위를 초과하여 이용하거나 이용자의 개인정보를 제공하지 않습니다.' +
  '\n\n 3. 개인정보의 처리위탁 \n\n (1) 회사는 인재영입 업무와 관련하여 개인정보 처리를 타인에게 위탁할 수 있습니다. 다음의 내용에 대하여 어느 하나의 사항이 변경되는 경우에도 같습니다. \n① 개인정보 처리위탁을 받는 자(이하 ‘수탁자’라 함) \n② 개인정보 처리위탁을 하는 업무의 내용';

const tasteTravle =
  '환영합니다!\n 아래 약관에 동의하시면 \n 맛있는 여행이 시작됩니다.';

export default LocationTerm;
