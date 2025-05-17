import { useCallback } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Animated, {
  FadeInDown,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

import { useFocusEffect, useRouter } from 'expo-router';

import bgPink from '@assets/imgs/backgroundPink.png';
import { ButtonFinally } from '@components/ButtonFinally';
import { Loading } from '@components/Loading';
import { ModalMenu } from '@components/ModalMenu';
import { Player } from '@components/Player';
import { PlayerDTO } from '@dtos/Player';
import { useRoom } from '@hooks/useRoom';
import { generatePlayer } from '@utils/generatePlayer';

export default function Index() {
  const {
    room,
    setRoom,
    setIsLoadingRoom,
    refetchRoom,

    askDeletePlayer,
    setAskDeletePlayer,

    isLoadingRoom,

    saveNameTemp,
    setSaveNameTemp,
  } = useRoom();

  const router = useRouter();

  useFocusEffect(
    useCallback(() => {
      if (room.status === 'closed') {
        router.replace(`/result?id=${room.id}`);
        return;
      }

      if (!room || !room.players) {
        getNewState();
      }

      setIsLoadingRoom(false);
    }, []),
  );

  async function getNewState() {
    await refetchRoom();
  }

  function handleAddPlayer() {
    const storageRoom = room;
    const newPlayer = generatePlayer(room?.players);

    const newRoom = {
      ...storageRoom,
      players: [...storageRoom.players, newPlayer],
    };

    setRoom(newRoom);
  }

  function handleDeletePlayer(player: PlayerDTO) {
    setAskDeletePlayer(player);
    setSaveNameTemp(player.name);

    const storagePlayers = room.players;
    const newPlayers = storagePlayers.map((p) =>
      p.id === player.id ? { ...p, name: 'Excluir' } : p,
    );

    setRoom({ ...room, players: newPlayers });
  }

  function cancelDeletePlayer() {
    const storagePlayers = room.players;
    const newPlayers = storagePlayers.map((p) =>
      p.name === 'Excluir' ? { ...p, name: saveNameTemp } : p,
    );

    setRoom({ ...room, players: newPlayers });
    setAskDeletePlayer(undefined);
    setSaveNameTemp('');
  }

  function deletePlayer(player: PlayerDTO) {
    setAskDeletePlayer(undefined);
    setSaveNameTemp('');

    const storagePlayers = room.players;
    const newPlayers = storagePlayers.filter((p) => player.id !== p.id);

    setRoom({ ...room, players: newPlayers });
  }

  if (isLoadingRoom) {
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
    <View className="flex-1">
      <View className="absolute">
        <Image
          source={bgPink}
          alt="Fundo com elementos de pizza"
          defaultSource={bgPink}
        />
      </View>

      <Text className="color-black mt-12 text-3xl text-center font-[Alegreya] mb-6">
        Hoje vou dar prejuízo!
      </Text>

      <ModalMenu />

      {askDeletePlayer && (
        <TouchableWithoutFeedback
          onPress={() => cancelDeletePlayer()}
          touchSoundDisabled
          className="bg-slate-50"
        >
          <View className="absolute top-0 left-0 bottom-0 right-0" />
        </TouchableWithoutFeedback>
      )}

      <View className="max-h-[65%] px-2">
        <Animated.FlatList
          keyExtractor={({ id }) => String(id)}
          data={room.players || []}
          itemLayoutAnimation={LinearTransition}
          renderItem={({ item, index }) => (
            <Animated.View
              entering={FadeInDown}
              exiting={FadeOut}
              key={`player-${item.id}-${index}`}
            >
              <Player
                player={item}
                handleDeletePlayer={handleDeletePlayer}
                cancelDeletePlayer={cancelDeletePlayer}
                deletePlayer={deletePlayer}
              />
            </Animated.View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View className="flex items-center mt-6">
        <TouchableOpacity
          className="bg-letter-500 max-w-[160px] p-2 rounded-md ml-auto mr-2"
          onPress={handleAddPlayer}
        >
          <Text className="text-white text-center font-[Alegreya]">
            + Novo Participante
          </Text>
        </TouchableOpacity>
      </View>

      <ButtonFinally />
    </View>
  );
}
