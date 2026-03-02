import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE05_DURATION } from "../constants";

export const Scene05: React.FC = () => (
  <SceneFrame
    sceneKey="scene05"
    imageName="scene05"
    durationInFrames={SCENE05_DURATION}
    title="Copilot · ChatGPT · Otter"
  />
);
