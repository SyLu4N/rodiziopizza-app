import { View } from 'react-native';

import Fatia from '@assets/svg/fatia.svg';
import { TextBorder } from '@components/TextBorder';
import { TextShadow } from '@components/TextShadow';
import { PlayerDTO } from '@dtos/Player';

interface Props {
  player: PlayerDTO;
  index: number;
}

export function PlayerRaking({ player, index }: Props) {
  const colorMap: Record<number, string> = {
    0: '!color-raking-first text-[2rem]',
    1: '!color-raking-second text-[2rem]',
    2: '!color-raking-third text-[2rem]',
    3: '',
  };
  const color = colorMap[index];

  return (
    <View className="items-center w-full">
      <View className="w-[80%] flex-row m-auto items-center justify-between">
        <View className="flex-row gap-4 justify-start">
          <View className="flex-row justify-start mt-4 gap-[1px] w-[35px]">
            <TextShadow
              text={String(index + 1)}
              variant="single"
              className={`text-[1.3rem] font-[ChauPhilomeneOne] ${color}`}
              classNameShadow="left-[2] top-[-8] !color-shadow-black"
            />

            {index + 1 === 1 ? (
              <TextShadow
                text="st"
                className="text-[1.3rem] font-[ChauPhilomeneOne] !color-raking-first"
                classNameShadow="left-[2] top-[-10] !color-shadow-black"
                variant="single"
              />
            ) : index + 1 === 2 ? (
              <TextShadow
                text="nd"
                className="text-[1.3rem] font-[ChauPhilomeneOne] !color-raking-second"
                classNameShadow="left-[2] top-[-10] !color-shadow-black"
                variant="single"
              />
            ) : index + 1 === 3 ? (
              <TextShadow
                text="rd"
                className="text-[1.3rem] font-[ChauPhilomeneOne] !color-raking-third"
                classNameShadow="left-[2] top-[-10] !color-shadow-black"
                variant="single"
              />
            ) : (
              <TextShadow
                text="th"
                className="text-[1rem] font-[ChauPhilomeneOne]"
                classNameShadow="left-[2] top-[-10] !color-shadow-black"
                variant="single"
              />
            )}
          </View>

          <TextShadow className="text-[3rem]" text={player.name} />
        </View>

        <View className="items-center justify-center mt-4 relative">
          <View className="z-10">
            <TextBorder text={String(player.score)} fontSize="40" size="60" />
          </View>

          <View className="absolute top-2">
            <Fatia width={50} height={50} />
          </View>
        </View>
      </View>
    </View>
  );
}
