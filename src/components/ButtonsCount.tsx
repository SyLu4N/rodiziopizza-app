import { TouchableOpacity, View } from 'react-native';

import { PlayerDTO } from '@dtos/Player';
import Icon from '@expo/vector-icons/AntDesign';
import { useRoom } from '@hooks/useRoom';
import { COLORS } from '@styles/colors';

interface Props {
  size?: number;
  player: PlayerDTO;
}

export function ButtonsCount({ size = 45, player }: Props) {
  const { room, setRoom } = useRoom();

  function handleAddButton() {
    const storagePlayers = room.players;

    const newPlayers = storagePlayers.map((p) =>
      p.id === player.id ? { ...p, score: p.score + 1 } : p,
    );

    setRoom({ ...room, players: newPlayers });
  }

  function handleRemoveButton() {
    if (player.score < 1) return;

    const storagePlayers = room.players;

    const newPlayers = storagePlayers.map((p) =>
      p.id === player.id ? { ...p, score: p.score - 1 } : p,
    );

    setRoom({ ...room, players: newPlayers });
  }

  return (
    <View className="flex ml-4 mr-2">
      <TouchableOpacity
        className="relative flex itens-center justify-center"
        onPress={handleAddButton}
      >
        <Icon
          name="caretup"
          size={size}
          className="mb-[-15px] z-10"
          color={COLORS['letter'][500]}
        />

        <Icon
          name="caretup"
          size={size}
          className="mb-[-15px] absolute top-[2px]"
          color={COLORS['letter'][600]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        className="relative flex items-center justify-center duration-300"
        disabled={player.score < 1}
        onPress={handleRemoveButton}
      >
        <Icon
          name="caretdown"
          size={size}
          color={COLORS['red'][500]}
          className="z-10"
        />

        <Icon
          name="caretdown"
          className="absolute top-[-2px]"
          size={size}
          color={COLORS['red'][600]}
        />
      </TouchableOpacity>
    </View>
  );
}
