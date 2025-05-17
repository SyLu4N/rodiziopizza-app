import { Text, View } from 'react-native';

import { cn } from '@sglara/cn';
import { COLORS } from '@styles/colors';

interface Props {
  text: string;
  className?: string;
  classNameShadow?: string;
  variant?: 'single' | 'double';
}

export function TextShadow({
  text,
  className,
  classNameShadow,
  variant = 'double',
}: Props) {
  return (
    <View className="relative">
      <Text
        style={
          variant === 'double' && {
            textShadowColor: COLORS['letter'][500],
            textShadowOffset: { width: 2, height: 2 },
            textShadowRadius: 2,
          }
        }
        className={cn(
          'font-[Alegreya] text-[2.2rem] z-10 color-white',
          className,
        )}
      >
        {text}
      </Text>

      <Text
        className={cn(
          'absolute font-[Alegreya] text-[2.2rem] top-[-7] left-[3] color-red-500 pt-3',
          className,
          classNameShadow,
        )}
      >
        {text}
      </Text>
    </View>
  );
}
