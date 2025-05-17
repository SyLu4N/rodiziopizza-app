import { PlayerDTO } from '@dtos/Player';

export function generatePlayer(players: PlayerDTO[] = []) {
  const maxId = players.reduce((max, player) => Math.max(max, player.id), 0);
  return {
    id: maxId + 1,
    name: '',
    score: 0,
  };
}
