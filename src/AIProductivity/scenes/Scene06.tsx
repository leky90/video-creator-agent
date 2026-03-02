import React from "react";
import { SceneFrame } from "./SceneFrame";
import { SCENE06_DURATION } from "../constants";

export const Scene06: React.FC = () => (
  <SceneFrame
    sceneKey="scene06"
    imageName="scene06"
    durationInFrames={SCENE06_DURATION}
    title="Thử ngay — bắt đầu hôm nay"
  />
);
