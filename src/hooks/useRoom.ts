import { useContext } from 'react';

import { RoomContext } from '../context/RoomContext';

export function useRoom() {
  const {
    room,
    setRoom,
    refetchRoom,

    askDeletePlayer,
    saveNameTemp,

    isLoadingRoom,
    setIsLoadingRoom,

    setAskDeletePlayer,
    setSaveNameTemp,
  } = useContext(RoomContext);

  return {
    room,
    setRoom,
    refetchRoom,

    askDeletePlayer,
    saveNameTemp,

    isLoadingRoom,
    setIsLoadingRoom,

    setAskDeletePlayer,
    setSaveNameTemp,
  };
}
