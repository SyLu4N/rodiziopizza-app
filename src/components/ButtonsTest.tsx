import { Pressable, Text, View } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageRoomGetAll } from '@storage/storageRoom';

async function clearAsyncRoomStorage() {
  await AsyncStorage.clear();
  console.log('STORAGE DELETADO');
}

async function getAsyncRoomStorage() {
  const room = await storageRoomGetAll();
  console.log(JSON.stringify(room));
}

export function ButtonsTest() {
  return (
    <View className="flex-row gap-4 justify-around mt-8">
      <View className="items-center">
        <Text>Room</Text>

        <View className="flex-row gap-4">
          <Pressable onPress={clearAsyncRoomStorage}>
            <Text>Excluir</Text>
          </Pressable>

          <Pressable onPress={getAsyncRoomStorage}>
            <Text>Mostrar</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
