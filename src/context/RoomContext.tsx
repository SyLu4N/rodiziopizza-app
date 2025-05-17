import { createContext, ReactNode, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';

import { PlayerDTO } from '@dtos/Player';
import { RoomDTO } from '@dtos/Room';
import {
  storageRoomCreate,
  storageRoomGetStart,
  storageRoomUpdate,
} from '@storage/storageRoom';
import { generateRoom } from '@utils/generateRoom';

export type RoomContextType = {
  room: RoomDTO;
  setRoom: React.Dispatch<React.SetStateAction<RoomDTO>>;
  refetchRoom: () => Promise<void>;

  askDeletePlayer: PlayerDTO | undefined;
  setAskDeletePlayer: (player: PlayerDTO | undefined) => void;

  saveNameTemp: string;
  setSaveNameTemp: (name: string) => void;

  isLoadingRoom: boolean;
  setIsLoadingRoom: React.Dispatch<React.SetStateAction<boolean>>;
};

type RoomContextProviderProps = {
  children: ReactNode;
};

export const RoomContext = createContext<RoomContextType>(
  {} as RoomContextType,
);

export function RoomContextProvider({ children }: RoomContextProviderProps) {
  const [room, setRoom] = useState<RoomDTO>({} as RoomDTO);
  const [isLoadingRoom, setIsLoadingRoom] = useState(true);
  const [saveNameTemp, setSaveNameTemp] = useState('');
  const [askDeletePlayer, setAskDeletePlayer] = useState<PlayerDTO | undefined>(
    undefined,
  );

  useEffect(() => {
    getRoomStorage();
  }, []);

  async function getRoomStorage() {
    setIsLoadingRoom(true);

    try {
      const roomStorage = await storageRoomGetStart();
      if (!roomStorage) {
        const newRoom = generateRoom();

        await storageRoomCreate(newRoom);

        setRoom(newRoom);
        return;
      }

      setRoom(roomStorage);
    } catch {
      setIsLoadingRoom(false);

      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar carregar o rodízio. 😭🤬',
      });
    }
  }

  async function refetchRoom() {
    setIsLoadingRoom(true);

    try {
      await getRoomStorage();
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar recarregar o rodízio. 😓😖',
      });
    } finally {
      setIsLoadingRoom(false);
    }
  }

  useEffect(() => {
    updateRoomStorage();
  }, [room]);

  async function updateRoomStorage() {
    try {
      await storageRoomUpdate(room);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Erro ao tentar salvar o rodízio. 😭🤬',
      });
    }
  }

  return (
    <RoomContext.Provider
      value={{
        room,
        setRoom,
        refetchRoom,

        askDeletePlayer,
        setAskDeletePlayer,

        saveNameTemp,
        setSaveNameTemp,

        isLoadingRoom,
        setIsLoadingRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}
