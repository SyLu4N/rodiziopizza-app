import { Fragment, useEffect, useState } from 'react';
import {
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { router } from 'expo-router';

import { RoomDTO } from '@dtos/Room';
import { useRoom } from '@hooks/useRoom';
import { storageRoomUpdate } from '@storage/storageRoom';
import { AppError } from '@utils/appError';

import { ButtonsChoice } from './ButtonsChocie';

export function ButtonFinally() {
  const { room, setRoom, setIsLoadingRoom } = useRoom();

  const [animationText, setAnimationText] = useState<FadeInDown | FadeInUp>(
    FadeInUp.delay(200),
  );

  const [isAskFinally, setIsAskFinally] = useState(false);

  function cancelFinally() {
    setIsAskFinally(false);
  }

  async function finallyAction() {
    setIsLoadingRoom(true);

    try {
      const newRoom = { ...room, status: 'closed' as const };

      await storageRoomUpdate(newRoom);
      setRoom({} as RoomDTO);

      router.replace(`/result?id=${room.id}`);
    } catch (error) {
      let message = 'Tivemos um problema ao tentar finalziar o rodízio. 😳🤒';

      if (error instanceof AppError) {
        message = error.message;
      }

      Toast.show({
        type: 'error',
        text1: message,
      });

      setIsLoadingRoom(false);
    }
  }

  useEffect(() => {
    if (isAskFinally) {
      setAnimationText(FadeInUp.delay(200));
    } else {
      setAnimationText(FadeInDown.delay(0));
    }
  }, [isAskFinally]);

  return (
    <Fragment>
      {isAskFinally && (
        <TouchableWithoutFeedback touchSoundDisabled onPress={cancelFinally}>
          <View className="absolute flex-1 top-0 bottom-0 right-0 left-0" />
        </TouchableWithoutFeedback>
      )}

      <View className="relative">
        <TouchableOpacity
          className={`mt-6 z-10 self-center`}
          onPress={() => setIsAskFinally(!isAskFinally)}
          disabled={isAskFinally}
        >
          <Animated.View
            key={isAskFinally ? 'exiting' : 'entering'}
            entering={animationText}
            className="px-2 self-center"
          >
            <Text
              className="font-[Carlson] text-[2rem] text-white text-center"
              style={{
                textShadowColor: '#000000a9',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {!isAskFinally ? 'Finalizar' : 'Deseja finalizar o rodizio?'}
            </Text>
          </Animated.View>
        </TouchableOpacity>

        <View className="items-center">
          {isAskFinally && (
            <ButtonsChoice
              className="absolute w-[80%] gap-8"
              variant="long"
              checkFn={finallyAction}
              cancelFn={cancelFinally}
            />
          )}
        </View>
      </View>
    </Fragment>
  );
}
