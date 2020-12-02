import React from 'react';
import Styled from 'styled-components/native';
import JoinConfirm from './JoinConfirm';
import JoinDataInput from './JoinDataInput';
import JoinTerm from './JoinTerm';

const Container = Styled.View`
border : solid 1px black;
`;

const InputText = Styled.Text`
border : solid 1px black;
`;
const Join = () => {
  return (
    <Container>
      <InputText>회원가입</InputText>
    </Container>
  );
};
export {JoinConfirm, JoinDataInput, JoinTerm};
