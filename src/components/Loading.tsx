import { View, Text } from 'react-native';

import { Image } from 'expo-image';

import SpinnerPizza from '@assets/gif/spinnerPizza.gif';

interface Props {
  isText?: boolean;
  size?: number;
}

export function Loading({ isText = true, size = 100 }: Props) {
  return (
    <View className="flex-1 items-center justify-center relative bg-transparent">
      <Image source={SpinnerPizza} style={{ width: size, height: size }} />

      {isText && (
        <Text className="color-white text-2xl font-[Alegreya]">
          Carregando...
        </Text>
      )}
    </View>
  );
}
