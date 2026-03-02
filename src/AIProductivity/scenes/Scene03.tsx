import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE03_DURATION } from "../constants";

export const Scene03: React.FC = () => (
  <SceneFrame
    sceneKey="scene03"
    imageName="scene03"
    durationInFrames={SCENE03_DURATION}
    title="AI bổ trợ — tăng năng suất"
  />
);
