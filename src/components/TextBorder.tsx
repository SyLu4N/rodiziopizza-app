import Svg, { Text } from 'react-native-svg';

import { COLORS } from '@styles/colors';

interface Props {
  size: string;
  text: string;
  fontSize?: string;
}

export function TextBorder({ size, fontSize = '40', text }: Props) {
  const center = Number(size) / 2;
  const fontSizeFormatted = text.length > 99 ? Number(fontSize) - 10 : fontSize;

  return (
    <Svg height={size} width={size}>
      <Text
        stroke="white"
        strokeWidth={2}
        fill={COLORS['letter'][500]}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={fontSizeFormatted}
        x={center}
        y={center}
        fontFamily="Alegreya"
      >
        {text}
      </Text>
    </Svg>
  );
}
