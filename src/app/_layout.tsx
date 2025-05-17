import { Image, StatusBar, View } from 'react-native';

import '../styles/global.css';

import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';

import bgPink from '@assets/imgs/backgroundPink.png';
import { Loading } from '@components/Loading';

import { RoomContextProvider } from '../context/RoomContext';
import { Toast } from '../toast/Toast';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Carlson: require('@assets/fonts/carlson.ttf'),
    Alegreya: require('@assets/fonts/alegreya.ttf'),
    ChauPhilomeneOne: require('@assets/fonts/chauPhilomeneOne.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View className="flex-1 bg-background-500">
        <View className="absolute">
          <Image
            source={bgPink}
            alt="Fundo com elementos de pizza"
            defaultSource={bgPink}
          />
        </View>

        <Loading />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background-500">
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <RoomContextProvider>
        <Stack
          screenOptions={{ headerShown: false, navigationBarHidden: true }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="result" />
        </Stack>

        <Toast />
      </RoomContextProvider>
    </View>
  );
}
