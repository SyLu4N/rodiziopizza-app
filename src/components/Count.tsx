import { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import Tomato from '@assets/svg/tomato.svg';
import { cn } from '@sglara/cn';

import { TextBorder } from './TextBorder';

interface Props {
  size: number;
  score: number;
  className?: string;
}

export function Count({ size, score, className }: Props) {
  const [displayCount, setDisplayCount] = useState(score);
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(1);

  useEffect(() => {
    if (score === displayCount) return;

    const direction = score > displayCount ? -1 : 1;

    translateY.value = withTiming(-40 * direction, { duration: 200 });
    opacity.value = withTiming(0, { duration: 200 }, () => {
      runOnJS(setDisplayCount)(score);

      translateY.value = 40 * direction;
      opacity.value = 0;

      translateY.value = withTiming(0, { duration: 200 });
      opacity.value = withTiming(1, { duration: 200 });
    });
  }, [score]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
  }));

  return (
    <View
      className={cn('flex items-center justify-center relative', className)}
    >
      <Tomato width={size} height={size} />

      <View className="absolute items-center justify-center max-h-[50px] overflow-hidden">
        <Animated.View style={animatedStyle} className="flex">
          <TextBorder size="50" fontSize="40" text={String(displayCount)} />
        </Animated.View>
      </View>
    </View>
  );
}
