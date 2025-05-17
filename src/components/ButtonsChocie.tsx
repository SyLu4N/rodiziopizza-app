import { TouchableOpacity, View } from 'react-native';
import Animated, { BounceIn, BounceOut } from 'react-native-reanimated';

import Icons from '@expo/vector-icons/AntDesign';
import { cn } from '@sglara/cn';

interface Props {
  checkFn: () => void;
  cancelFn: () => void;

  className?: string;
  variant?: 'long' | 'short';
}

const ANIMATION_BUTTON_ENTERING = BounceIn.delay(200).damping(100);
const ANIMATION_BUTTON_EXITING = BounceOut.duration(400);

export function ButtonsChoice({
  checkFn,
  cancelFn,
  className,
  variant,
}: Props) {
  return (
    <View
      className={cn(
        'flex flex-row items-center justify-center gap-4 z-50',
        className,
      )}
    >
      <Animated.View
        entering={ANIMATION_BUTTON_ENTERING}
        exiting={ANIMATION_BUTTON_EXITING}
        className={`${variant === 'long' && 'flex-1'}`}
      >
        <TouchableOpacity
          className={`flex items-center bg-green-500 rounded-sm p-1`}
          onPress={checkFn}
        >
          <Icons name="check" size={16} color="white" />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        entering={ANIMATION_BUTTON_ENTERING}
        exiting={ANIMATION_BUTTON_EXITING}
        className={`${variant === 'long' && 'flex-1'}`}
      >
        <TouchableOpacity
          className={`flex items-center bg-red-500 rounded-sm p-1`}
          onPress={cancelFn}
        >
          <Icons name="close" size={16} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}
