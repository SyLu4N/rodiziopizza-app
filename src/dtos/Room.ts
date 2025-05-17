import { PlayerDTO } from './Player';

export type RoomDTO = {
  id: string;
  title: string;
  players: PlayerDTO[];
  status: 'open' | 'closed' | 'saved';
  password?: string;
  createdAt: Date;
};
