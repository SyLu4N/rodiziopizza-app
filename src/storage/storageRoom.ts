import { RoomDTO } from '@dtos/Room';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/appError';

import { ROOM_STORAGE } from './@storageConfig';

export async function storageRoomCreate(room: RoomDTO) {
  const storage = await storageRoomGetAll();

  const roomAlreadyExists = storage.find((r) => r.id === room.id);
  if (roomAlreadyExists) {
    throw new AppError('Rodízio já salvo. 🤔😒');
  }

  const newRooms = [...storage, room];
  await AsyncStorage.setItem(ROOM_STORAGE, JSON.stringify(newRooms));
}

export async function storageRoomGet(id: string) {
  const storage = await AsyncStorage.getItem(ROOM_STORAGE);

  const rooms: RoomDTO[] = storage ? JSON.parse(storage) : ([] as RoomDTO[]);
  const room = rooms.find((room) => room.id === id);

  return room;
}

export async function storageRoomGetAll() {
  const storage = await AsyncStorage.getItem(ROOM_STORAGE);

  const rooms: RoomDTO[] = storage ? JSON.parse(storage) : ([] as RoomDTO[]);

  return rooms;
}

export async function storageRoomGetStart() {
  const storage = await AsyncStorage.getItem(ROOM_STORAGE);

  const rooms: RoomDTO[] = storage ? JSON.parse(storage) : ([] as RoomDTO[]);
  const roomClosed = rooms.filter((room) => room.status === 'closed');
  if (roomClosed.length) return roomClosed[0];

  const roomOpen = rooms.filter((room) => room.status === 'open');
  return roomOpen[0];
}

export async function storageRoomGetSaved() {
  const storage = await AsyncStorage.getItem(ROOM_STORAGE);

  const rooms: RoomDTO[] = storage ? JSON.parse(storage) : ([] as RoomDTO[]);
  const roomsSaved = rooms.filter((room) => room.status === 'saved');

  return roomsSaved;
}

export async function storageRoomUpdate(room: RoomDTO) {
  const storage = await storageRoomGetAll();

  const newRooms = storage.map((r) => (r.id === room.id ? room : r));
  await AsyncStorage.setItem(ROOM_STORAGE, JSON.stringify(newRooms));
}

export async function storageRoomRemove(id: string) {
  const storage = await storageRoomGetAll();

  const room = storage.find((r) => r.id !== id);
  if (!room) new AppError('Rodízio não encontrado. 😵🥴');

  const newRooms = storage.filter((r) => r.id !== id);
  await AsyncStorage.setItem(ROOM_STORAGE, JSON.stringify(newRooms));
}
