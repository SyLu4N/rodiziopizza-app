import { StatusBar } from 'react-native';

import './global.css';
import { Routes } from '@routes/index';

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <Routes />
    </>
  );
}
