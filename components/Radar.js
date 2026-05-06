import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';

const CIRCLES = [
  { id: 1, size: 160, delay: 500 },
  { id: 2, size: 180, delay: 1000 },
  { id: 3, size: 100, delay: 1500 },
  { id: 4, size: 220, delay: 2000 },
  { id: 5, size: 140, delay: 2500 },
];

export default function Radar() {
  // Using an array of refs for the animated values
  const anims = useRef(CIRCLES.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    CIRCLES.forEach((circle, index) => {
      Animated.loop(
        Animated.timing(anims[index], {
          toValue: 1,
          duration: 20000,
          delay: circle.delay,
          useNativeDriver: true,
        })
      ).start();
    });
  }, [anims]);

  return (
    <View style={styles.container}>
      {CIRCLES.map((circle, index) => {
        const spinY = anims[index].interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: ['0deg', '180deg', '540deg', '720deg', '900deg'],
        });
        const spinX = anims[index].interpolate({
          inputRange: [0, 0.25, 0.5, 0.75, 1],
          outputRange: ['0deg', '360deg', '540deg', '900deg', '1080deg'],
        });

        return (
          <Animated.View
            key={circle.id}
            style={[
              styles.circle,
              { width: circle.size, height: circle.size },
              { transform: [{ rotateY: spinY }, { rotateX: spinX }] }
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    // Fake perspective
    transform: [{ perspective: 1000 }]
  },
  circle: {
    position: 'absolute',
    borderWidth: 3,
    borderColor: 'green',
    borderRadius: 200,
  }
});
