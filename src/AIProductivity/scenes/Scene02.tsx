import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE02_DURATION } from "../constants";

export const Scene02: React.FC = () => (
  <SceneFrame
    sceneKey="scene02"
    imageName="scene02"
    durationInFrames={SCENE02_DURATION}
    title="Hàng giờ cho việc lặp lại"
  />
);
