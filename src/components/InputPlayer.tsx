import { TextInput, View } from 'react-native';

import { PlayerDTO } from '@dtos/Player';
import { useRoom } from '@hooks/useRoom';
import { cn } from '@sglara/cn';

import { TextShadow } from './TextShadow';

interface Props {
  player: PlayerDTO;
  className?: string;
}

export function InputPlayer({ className, player }: Props) {
  const { room, setRoom } = useRoom();

  function handleNameChange(text: string) {
    const storagePlayers = room.players;
    const newPlayers = storagePlayers.map((p) =>
      p.id === player.id ? { ...p, name: text } : p,
    );

    setRoom({ ...room, players: newPlayers });
  }

  return (
    <View
      className={cn('p-1 relative flex justify-center items-center', className)}
    >
      <TextInput
        value={player.name}
        onChangeText={handleNameChange}
        maxLength={13}
        className="z-20 mb-[4px] font-[Alegreya] min-w-[75%] text-[2.5rem] color-transparent h-[45px] text-center rounded-md"
        editable={player.name !== 'Excluir'}
      />

      <View className="absolute top-[-4px] w-full flex justify-center items-center">
        <TextShadow text={player.name} className="text-[2.5rem]" />
      </View>
    </View>
  );
}
