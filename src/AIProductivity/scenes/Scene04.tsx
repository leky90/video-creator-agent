import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE04_DURATION } from "../constants";

export const Scene04: React.FC = () => (
  <SceneFrame
    sceneKey="scene04"
    imageName="scene04"
    durationInFrames={SCENE04_DURATION}
    title="Ghi chú họp · Soạn văn bản · Tóm tắt email"
  />
);
