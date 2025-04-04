import { ActivityIndicator, ImageBackground, Text } from 'react-native';

import bgPink from '@assets/backgroundPink.png';
import { useFonts } from 'expo-font';

export function Home() {
  const [fontsLoaded] = useFonts({
    Carlson: require('@assets/fonts/carlson.ttf'),
    Alegreya: require('@assets/fonts/alegreya-sans-sc-black.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  return (
    <ImageBackground source={bgPink} resizeMode="cover" className="flex-1">
      <Text className="color-black mt-12 text-3xl text-center font-[Alegreya]">
        Hoje vou dar prejuízo!
      </Text>
    </ImageBackground>
  );
}
