import './src/styles/global.css';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <>
      <Text className="color-slate-900">Olá</Text>
      <View className="h-[500px] w-[300px] bg-slate-500" />
    </>
  );
}
