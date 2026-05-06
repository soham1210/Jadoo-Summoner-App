import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const NUM_WAVES = 40;
const WAVES_ARRAY = Array.from({ length: NUM_WAVES }, (_, i) => i);

export default function Waves({ reverse }) {
  const anims = useRef(WAVES_ARRAY.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    WAVES_ARRAY.forEach((index) => {
      // Calculate delay similarly to the original CSS logic
      // e.g., 0.014s difference per wave
      const delay = index * 50; 
      
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anims[index], {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(anims[index], {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          })
        ])
      ).start();
    });
  }, [anims]);

  return (
    <View style={[styles.sea, reverse && styles.seaReverse]}>
      {WAVES_ARRAY.map((index) => {
        const scaleY = anims[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.2, 1], // Equivalent to height 8px to 40px when base height is 40
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.wave,
              { transform: [{ scaleY }] }
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  sea: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 150,
    height: 150,
    transform: [
      { perspective: 400 },
      { rotateX: '70deg' },
      { rotateZ: '35deg' }
    ]
  },
  seaReverse: {
    transform: [
      { perspective: 400 },
      { rotateX: '70deg' },
      { rotateZ: '-57deg' }
    ]
  },
  wave: {
    width: 10,
    height: 40,
    backgroundColor: 'green',
    margin: 2,
    opacity: 0.7,
    borderRadius: 2,
  }
});
