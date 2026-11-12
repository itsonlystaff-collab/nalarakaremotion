import React from 'react';
import {Composition} from 'remotion';
import {AirbagShort} from './video/AirbagShort';

export const Root: React.FC = () => {
  return (
    <Composition
      id="AirbagShort"
      component={AirbagShort}
      durationInFrames={1800}
      fps={60}
      width={1080}
      height={1920}
    />
  );
};
