import { Fragment } from 'react';
import { Text } from 'react-native';

interface Props {
  index: number;
}

export function TextRaking({ index }: Props) {
  return (
    <Fragment>
      {index + 1 === 1 ? (
        <Text className="font-[ChauPhilomeneOne]">{index + 1}st</Text>
      ) : index + 1 === 2 ? (
        <Text className="font-[ChauPhilomeneOne]">{index + 1}nd</Text>
      ) : index + 1 === 3 ? (
        <Text className="font-[ChauPhilomeneOne]">{index + 1}rd</Text>
      ) : (
        <Text className="font-[ChauPhilomeneOne]">{index + 1}</Text>
      )}
    </Fragment>
  );
}
