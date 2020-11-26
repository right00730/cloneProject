import React, {useEffect, useRef} from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import Interactable from 'react-native-interactable';

const FadeInView = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dy: pan.y,
        },
      ],
      {useNativeDriver: false},
    ),
    onPanResponderRelease: () => {
      Animated.spring(
        pan, // Auto-multiplexed
        {
          toValue: {x: 0, y: 0},
          friction: 10,
          tension: 50,
          delay: 100,
          useNativeDriver: false,
        }, // Back to zero
      ).start();
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[pan.getLayout(), styles.box]}
      />
      <Button title="클릭" onPress={() => console.log('>>>', pan)}></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    backgroundColor: '#61dafb',
    width: 80,
    height: 80,
    borderRadius: 4,
  },
});

export default FadeInView;
