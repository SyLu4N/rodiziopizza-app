import { Image, ImageSourcePropType, Text, View } from 'react-native';

interface Props {
  image: ImageSourcePropType;
  title: string;
  value: string | number;
}

export function ResumeFinally({ image, value, title }: Props) {
  const isDEVORADORES = title === 'Número de DEVORADORES:';

  return (
    <View className="flex-row gap-2 items-center justify-center mt-4 ml-[-10px]">
      <View className={`items-center w-[45px] ${isDEVORADORES && 'h-[60px]'}`}>
        <Image
          source={image}
          className={`${isDEVORADORES ? 'mt-[-8px] w-[60px] h-[60px]' : 'w-[45px] h-[45px]'}`}
        />
      </View>

      <View
        className={`flex-row gap-2 items-center h-[35px] ${isDEVORADORES && 'mb-6'}`}
      >
        <Text className={`font-[Alegreya] color-white text-[1.1rem] w-[240px]`}>
          {title}
        </Text>

        <Text className="font-[Alegreya] color-white text-[2rem] leading-[30px]">
          {value}
        </Text>
      </View>
    </View>
  );
}
