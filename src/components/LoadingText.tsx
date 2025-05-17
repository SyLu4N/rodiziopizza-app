import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

const Dot = ({ delay = 0 }: { delay?: number }) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(-3, { duration: 400 }),
          withTiming(0, { duration: 400 }),
        ),
        -1,
        true,
      ),
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.Text
      className="font-[Alegreya] text-2xl color-white"
      style={animatedStyle}
    >
      .
    </Animated.Text>
  );
};

export function LoadingText() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800 }),
        withTiming(1, { duration: 800 }),
      ),
      -1,
      true,
    );
  }, []);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      className="color-white text-2xl font-[Alegreya]"
      style={style}
    >
      <View className="flex-row items-center justify-center bg-transparent space-x-1">
        <Text className="font-[Alegreya] text-2xl color-white">Carregando</Text>
        <Dot delay={0} />
        <Dot delay={150} />
        <Dot delay={300} />
      </View>
    </Animated.View>
  );
}
