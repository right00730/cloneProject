import React from 'react';
import {Text} from 'react-native';
import Styled from 'styled-components/native';

const Container = Styled.View`
border : solid 1px white;
`;
const None = () => {
  return (
    <Container
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{fontSize: 30}}>준비중입니다.</Text>
    </Container>
  );
};
export default None;
