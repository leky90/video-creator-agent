import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { AUDIO_SEGMENTS, SCENES } from "../constants";

const SceneNarration: React.FC<{ sceneKey: string }> = ({ sceneKey }) => {
  const segments = AUDIO_SEGMENTS[sceneKey as keyof typeof AUDIO_SEGMENTS];
  if (!segments) return null;
  return (
    <>
      {segments.map((seg, i) => (
        <Sequence
          key={i}
          from={seg.startFrame}
          durationInFrames={seg.endFrame - seg.startFrame}
        >
          <Audio src={staticFile(seg.file)} volume={1} />
        </Sequence>
      ))}
    </>
  );
};

export const AudioLayer: React.FC = () => {
  return (
    <>
      {Object.entries(SCENES).map(([key, scene]) => (
        <Sequence
          key={key}
          from={scene.start}
          durationInFrames={scene.duration}
        >
          <SceneNarration sceneKey={key} />
        </Sequence>
      ))}
    </>
  );
};
