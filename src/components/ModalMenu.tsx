import { Fragment, useEffect, useState } from 'react';
import {
  Image,
  Modal,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';

import { Link } from 'expo-router';

import bgGreen from '@assets/imgs/backgroundGreen.png';
import { RoomDTO } from '@dtos/Room';
import Icon from '@expo/vector-icons/Entypo';
import { storageRoomGetSaved } from '@storage/storageRoom';

import { Loading } from './Loading';

export function ModalMenu() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<RoomDTO[]>([]);

  async function handleLoadHistory() {
    setIsLoading(true);

    try {
      const history = await storageRoomGetSaved();
      if (!history) return setHistory([]);

      setHistory(history);
    } catch {
      const message = 'Tivemos um problema ao carregar o histórico. 😳🤒';

      Toast.show({
        type: 'error',
        text1: message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  function formatDate(date: string) {
    const dateObj = new Date(date);

    return dateObj.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  useEffect(() => {
    if (isVisible && (!history || !history.length)) handleLoadHistory();
  }, [isVisible]);

  return (
    <View className="absolute top-8 right-4">
      <TouchableOpacity
        className="z-[200]"
        onPress={() => setIsVisible(!isVisible)}
      >
        <Icon name="menu" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent
        visible={isVisible}
        onRequestClose={() => setIsVisible(!isVisible)}
      >
        <View className="relative w-[135px] bg-letter-500 z-10 overflow-hidden p-2 h-fit rounded-md top-[2%] elevation-2xl left-[55%] items-center">
          <Text className="font-[Carlson] color-white text-[1.4rem]">
            Histórico
          </Text>

          {isLoading ? (
            <View className="h-[50px]">
              <Loading size={40} isText={false} />
            </View>
          ) : (
            <Fragment>
              {history.length ? (
                <Fragment>
                  {history.map((room, index) => (
                    <Fragment key={room.id}>
                      <Link
                        href={`/result?id=${room.id}`}
                        className="p-1 color-white font-[Alegreya]"
                      >
                        <Text>
                          Dia - {formatDate(room.createdAt.toString())}
                        </Text>
                      </Link>

                      {index < history.length - 1 && (
                        <View className="w-full h-[1px] bg-white rounded-full mx-2" />
                      )}
                    </Fragment>
                  ))}
                </Fragment>
              ) : (
                <View>
                  <Text className="text-center text-[1.5rem] mt-1">😴</Text>
                  <Text className="color-white font-[Alegreya] text-center">
                    Sem registros
                  </Text>
                </View>
              )}
            </Fragment>
          )}
        </View>

        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
          <View className="absolute top-0 left-0 bottom-0 right-0 flex-1"></View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}
