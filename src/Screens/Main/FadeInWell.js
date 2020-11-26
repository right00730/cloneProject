import React, {useEffect, useContext, useRef} from 'react';
import {Animated, View, Text} from 'react-native';
const FadeInView = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      // 성능향상
      // opcity와 같은 스타일 설정시 필요, non-layout property(transform, opacity 등)에만 적용 가능.
      // layout property(width, top, flex 등)에는 적용 불가
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View
      style={{
        width: 100,
        height: 100,
        backgroundColor: 'red',
        opacity: fadeAnim,
      }}>
      <Text>테스트</Text>
    </Animated.View>
  );
};
export default FadeInView;
