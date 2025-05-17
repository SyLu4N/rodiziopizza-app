import { RoomDTO } from '@dtos/Room';

import { generatePlayer } from './generatePlayer';
import { generateRandomId } from './generateRandomId';

export function generateRoom(): RoomDTO {
  return {
    id: generateRandomId(),
    title: 'Hoje vou dar prejuízo!',
    players: [generatePlayer()],
    status: 'open',
    createdAt: new Date(),
  };
}
