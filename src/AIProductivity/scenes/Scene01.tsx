import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE01_DURATION } from "../constants";

export const Scene01: React.FC = () => (
  <SceneFrame
    sceneKey="scene01"
    imageName="scene01"
    durationInFrames={SCENE01_DURATION}
    title="Ngập trong email & công việc?"
  />
);
