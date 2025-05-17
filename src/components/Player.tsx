import { memo } from 'react';
import {
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import Trash from '@assets/svg/lixeira.svg';
import { PlayerDTO } from '@dtos/Player';
import { useRoom } from '@hooks/useRoom';

import { ButtonsChoice } from './ButtonsChocie';
import { ButtonsCount } from './ButtonsCount';
import { Count } from './Count';
import { InputPlayer } from './InputPlayer';

interface Props {
  handleDeletePlayer: (player: PlayerDTO) => void;
  deletePlayer: (player: PlayerDTO) => void;
  cancelDeletePlayer: () => void;

  player: PlayerDTO;
}

export const Player = memo(function Player({
  handleDeletePlayer,
  cancelDeletePlayer,
  deletePlayer,

  player,
}: Props) {
  const { room, askDeletePlayer } = useRoom();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      className="w-full"
      onStartShouldSetResponder={() => true}
    >
      <View className="flex flex-row w-full items-center mb-2">
        <Count size={70} score={player.score} className="mr-[-30px] z-20" />

        <View className="flex-1 justify-center items-center relative mt-1">
          <InputPlayer className="z-20" player={player} />

          <View className="z-10 bg-default-400 absolute h-[45px] w-full top-[3px]" />
          <View className="bg-default-600 absolute h-[45px] w-full top-[6px] right-[-4]" />

          {room?.players?.length > 1 && !askDeletePlayer && (
            <TouchableOpacity
              className="absolute right-3 z-10 top-[14px]"
              onPress={() => handleDeletePlayer(player)}
            >
              <Trash width={22} height={22} />
            </TouchableOpacity>
          )}

          {askDeletePlayer && askDeletePlayer.id === player.id && (
            <ButtonsChoice
              className="absolute top-[55%]"
              checkFn={() => deletePlayer(player)}
              cancelFn={cancelDeletePlayer}
            />
          )}
        </View>

        <ButtonsCount player={player} />
      </View>
    </KeyboardAvoidingView>
  );
});
