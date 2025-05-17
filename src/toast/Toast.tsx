import { Image, Text, View } from 'react-native';
import ToastLib, { ToastConfig } from 'react-native-toast-message';

import bgGreen from '@assets/imgs/backgroundGreen.png';
import bgPink from '@assets/imgs/backgroundPink.png';

interface Props {
  type: 'success' | 'error';
  text1: string;
}

function ToastComponent({ text1, type }: Props) {
  const bgType = type === 'success' ? bgGreen : bgPink;

  return (
    <View
      className="items-center justify-center w-[80%] h-[60px] relative overflow-hidden rounded-md m-auto"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      }}
    >
      <View className="absolute left-0 top-0 z-10 h-full w-2 bg-white" />

      <View className="absolute">
        <Image source={bgType} alt="Fundo com elementos de pizza verde" />
      </View>

      <Text className="font-[Alegreya] color-white p-4">{text1}</Text>
    </View>
  );
}

const toastConfig: ToastConfig = {
  success: ({ text1 }) => <ToastComponent type="success" text1={text1 || ''} />,
  error: ({ text1 }) => <ToastComponent type="error" text1={text1 || ''} />,
};

export function Toast() {
  return <ToastLib config={toastConfig} />;
}
