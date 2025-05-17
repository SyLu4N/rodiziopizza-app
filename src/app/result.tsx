import React, { Fragment, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Image } from 'react-native';
import { Confetti } from 'react-native-fast-confetti';
import Animated, { FadeIn } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { useLocalSearchParams, useRouter } from 'expo-router';

import bgGreen from '@assets/imgs/backgroundGreen.png';
import FatiaDerretida from '@assets/imgs/fatiaDerretida.png';
import FatiaMordida from '@assets/imgs/fatiaMordida.png';
import PizzaCortada from '@assets/imgs/pizzaCortada.png';
import PizzaInteira from '@assets/imgs/pizzaInteira.png';
import Placar from '@assets/imgs/placar.png';
import { Loading } from '@components/Loading';
import { LoadingText } from '@components/LoadingText';
import { PlayerRaking } from '@components/PlayerRaking';
import { ResumeFinally } from '@components/ResumeFinally';
import { PlayerDTO } from '@dtos/Player';
import { RoomDTO } from '@dtos/Room';
import Icon from '@expo/vector-icons/AntDesign';
import {
  storageRoomCreate,
  storageRoomGet,
  storageRoomRemove,
} from '@storage/storageRoom';
import { AppError } from '@utils/appError';
import { generateRandomId } from '@utils/generateRandomId';

export default function Result() {
  const { id } = useLocalSearchParams();

  const route = useRouter();

  const [isAlreadySaved, setIsAlreadySaved] = useState(false);
  const [room, setRoom] = useState<RoomDTO>({} as RoomDTO);
  const [isLoadingSave, setIsLoadingSave] = useState(false);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);

  useEffect(() => {
    getRoomStorage();
  }, []);

  async function getRoomStorage() {
    setIsLoadingRoom(true);

    try {
      const room = await storageRoomGet(id as string);
      if (!room) {
        setIsLoadingRoom(false);

        Toast.show({
          type: 'error',
          text1: 'Não achamos esse rodízio. 🤥👀',
        });

        return setTimeout(() => {
          route.replace('/');
        }, 2000);
      }

      setRoom({ ...room, players: formattedList(room.players) });
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar carregar o rodízio. 😭🤬',
      });
    } finally {
      setIsLoadingRoom(false);
    }
  }

  function formattedList(players: PlayerDTO[]) {
    if (!players) return [];

    const playerSorted = players.sort(
      (x, y) => (y.score ?? 0) - (x.score ?? 0),
    );
    return playerSorted;
  }

  async function finallyAndbackRoom() {
    setIsLoadingRoom(true);

    try {
      await storageRoomRemove(id as string);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar deletar o rodízio. 😵🥴',
      });
    } finally {
      setIsLoadingRoom(false);
      route.replace('/');
    }
  }

  function goBack() {
    route.replace('/');
  }

  async function saveRoom() {
    setIsLoadingSave(true);

    const newRoomSaved = {
      ...room,
      id: generateRandomId(),
      status: 'saved' as const,
    };

    try {
      await storageRoomCreate(newRoomSaved);

      setIsAlreadySaved(true);
      Toast.show({
        type: 'success',
        text1: 'Rodízio salvo com sucesso! 🍕🤤',
      });
    } catch (error) {
      let message =
        'Tivemos um problema ao tentar salvar o rodízio. 😭 Tente novamente mais tarde.';

      if (error instanceof AppError) {
        message = error.message;

        if (message === 'Rodízio já salvo. 🤔😒') setIsAlreadySaved(true);
      }

      Toast.show({
        type: 'error',
        text1: message,
      });
    } finally {
      setIsLoadingSave(false);
    }
  }

  async function deleteHistory() {
    setIsLoadingRoom(true);

    try {
      await storageRoomRemove(id as string);

      Toast.show({
        type: 'success',
        text1: 'Rodízio deletado com sucesso! 🙈🗑',
      });

      setTimeout(() => {
        route.replace('/');
      }, 200);
    } catch (error) {
      let message =
        'Tivemos um problema ao tentar deletar o rodízio. 😬 Tente novamente mais tarde.';

      if (error instanceof AppError) message = error.message;

      Toast.show({
        type: 'error',
        text1: message,
      });

      setIsLoadingRoom(false);
    }
  }

  const devouredSlices =
    room?.players?.reduce((total, player) => total + (player.score ?? 0), 0) ||
    0;

  const devouredAverage =
    (devouredSlices / room?.players?.length).toFixed(0) || 0;

  const devouredWhole = Math.floor(devouredSlices / 8).toFixed(0) || 0;
  const devouredPlayers = room?.players?.length || 0;

  if (isLoadingRoom) {
    return (
      <View className="flex-1 bg-background-500">
        <View className="absolute">
          <Image
            source={bgGreen}
            alt="Fundo com elementos de pizza"
            defaultSource={bgGreen}
          />
        </View>

        <Loading />
      </View>
    );
  }

  return (
    <View className="flex-1">
      <View className="absolute">
        <Image source={bgGreen} alt="Fundo com elementos de pizza verde" />
      </View>

      <Confetti
        count={200}
        fallDuration={14000}
        fadeOutOnEnd={false}
        autoplay={room ? true : false}
        blastDuration={9000}
        isInfinite={false}
      />

      <ScrollView>
        <Image source={Placar} className="m-auto mt-12 w-32 h-32" />

        <Animated.View entering={FadeIn.duration(600).delay(5000)}>
          {room?.players?.map((player: PlayerDTO, index: number) => (
            <PlayerRaking key={player.id} player={player} index={index} />
          ))}

          <View className="mt-6">
            <ResumeFinally
              image={FatiaMordida}
              title="Total de fatias DEVORADAS:"
              value={devouredSlices}
            />

            <ResumeFinally
              image={FatiaDerretida}
              title="Media de fatias DEVORADAS:"
              value={devouredAverage}
            />

            <ResumeFinally
              image={PizzaInteira}
              title="Pizzas inteiras DEVORADAS:"
              value={devouredWhole}
            />

            <ResumeFinally
              image={PizzaCortada}
              title="Número de DEVORADORES:"
              value={devouredPlayers}
            />
          </View>

          <View className="flex-row justify-around items-center mb-8 mt-4">
            {room.status === 'saved' ? (
              <Fragment>
                <TouchableOpacity
                  onPress={goBack}
                  disabled={isLoadingSave}
                  className="disabled:opacity-50"
                >
                  <View className="items-center justify-center">
                    <Icon name="arrowleft" size={24} color="white" />

                    <Text className="text-center font-[Alegreya] color-white text-[1.5rem]">
                      Voltar ao inicio
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={deleteHistory}
                  disabled={isLoadingSave}
                  className="disabled:opacity-50"
                >
                  <View className="items-center justify-center">
                    <Icon name="delete" size={24} color="white" />

                    <Text className="text-center font-[Alegreya] color-white text-[1.5rem]">
                      Excluir Rodízio
                    </Text>
                  </View>
                </TouchableOpacity>
              </Fragment>
            ) : (
              <>
                <TouchableOpacity
                  onPress={finallyAndbackRoom}
                  disabled={isLoadingSave}
                  className="disabled:opacity-50"
                >
                  <View className="items-center justify-center">
                    <Icon name="arrowleft" size={24} color="white" />

                    <Text className="text-center font-[Alegreya] color-white text-[1.5rem]">
                      Novo Rodízio
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={saveRoom}
                  disabled={isAlreadySaved || isLoadingSave}
                  className="disabled:opacity-50"
                >
                  <View className="items-center justify-center">
                    <Icon name="save" size={24} color="white" />

                    {isLoadingSave ? (
                      <LoadingText />
                    ) : (
                      <Text className="text-center font-[Alegreya] color-white text-[1.5rem]">
                        Salvar Rodízio
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              </>
            )}
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
