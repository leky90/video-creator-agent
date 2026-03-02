import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  SCENE_PROBLEM_START,
  SCENE_PROBLEM_DURATION,
  SCENE_AGITATE_START,
  SCENE_AGITATE_DURATION,
  SCENE_SOLUTION_START,
  SCENE_SOLUTION_DURATION,
  SCENE_HOWITWORKS_START,
  SCENE_HOWITWORKS_DURATION,
  SCENE_ARCHITECTURE_START,
  SCENE_ARCHITECTURE_DURATION,
  SCENE_REALWORLD_START,
  SCENE_REALWORLD_DURATION,
  SCENE_CTA_START,
  SCENE_CTA_DURATION,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { SubtitleSequence } from "./components/SubtitleSequence";
import { ProblemScene } from "./scenes/ProblemScene";
import { AgitateScene } from "./scenes/AgitateScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { ArchitectureScene } from "./scenes/ArchitectureScene";
import { RealWorldScene } from "./scenes/RealWorldScene";
import { CTAScene } from "./scenes/CTAScene";

export const AIAgentExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Sequence from={SCENE_PROBLEM_START} durationInFrames={SCENE_PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={SCENE_AGITATE_START} durationInFrames={SCENE_AGITATE_DURATION}>
        <AgitateScene />
      </Sequence>
      <Sequence from={SCENE_SOLUTION_START} durationInFrames={SCENE_SOLUTION_DURATION}>
        <SolutionScene />
      </Sequence>
      <Sequence from={SCENE_HOWITWORKS_START} durationInFrames={SCENE_HOWITWORKS_DURATION}>
        <HowItWorksScene />
      </Sequence>
      <Sequence from={SCENE_ARCHITECTURE_START} durationInFrames={SCENE_ARCHITECTURE_DURATION}>
        <ArchitectureScene />
      </Sequence>
      <Sequence from={SCENE_REALWORLD_START} durationInFrames={SCENE_REALWORLD_DURATION}>
        <RealWorldScene />
      </Sequence>
      <Sequence from={SCENE_CTA_START} durationInFrames={SCENE_CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
      <SubtitleSequence />
    </AbsoluteFill>
  );
};
