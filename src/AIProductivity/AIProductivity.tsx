import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  SCENE01_START,
  SCENE01_DURATION,
  SCENE02_START,
  SCENE02_DURATION,
  SCENE03_START,
  SCENE03_DURATION,
  SCENE04_START,
  SCENE04_DURATION,
  SCENE05_START,
  SCENE05_DURATION,
  SCENE06_START,
  SCENE06_DURATION,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { Scene01 } from "./scenes/Scene01";
import { Scene02 } from "./scenes/Scene02";
import { Scene03 } from "./scenes/Scene03";
import { Scene04 } from "./scenes/Scene04";
import { Scene05 } from "./scenes/Scene05";
import { Scene06 } from "./scenes/Scene06";

export const AIProductivity: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={SCENE01_START} durationInFrames={SCENE01_DURATION}>
        <Scene01 />
      </Sequence>
      <Sequence from={SCENE02_START} durationInFrames={SCENE02_DURATION}>
        <Scene02 />
      </Sequence>
      <Sequence from={SCENE03_START} durationInFrames={SCENE03_DURATION}>
        <Scene03 />
      </Sequence>
      <Sequence from={SCENE04_START} durationInFrames={SCENE04_DURATION}>
        <Scene04 />
      </Sequence>
      <Sequence from={SCENE05_START} durationInFrames={SCENE05_DURATION}>
        <Scene05 />
      </Sequence>
      <Sequence from={SCENE06_START} durationInFrames={SCENE06_DURATION}>
        <Scene06 />
      </Sequence>
      <AudioLayer />
    </AbsoluteFill>
  );
};
