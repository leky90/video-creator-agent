import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  SCENE_HOOK_START,
  SCENE_HOOK_DURATION,
  SCENE_PROBLEM_START,
  SCENE_PROBLEM_DURATION,
  SCENE_AGITATE_START,
  SCENE_AGITATE_DURATION,
  SCENE_SOLUTION_START,
  SCENE_SOLUTION_DURATION,
  SCENE_HOWITWORKS_START,
  SCENE_HOWITWORKS_DURATION,
  SCENE_RESULTS_START,
  SCENE_RESULTS_DURATION,
  SCENE_CTA_START,
  SCENE_CTA_DURATION,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { SubtitleSequence } from "./components/SubtitleSequence";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { AgitateScene } from "./scenes/AgitateScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { ResultsScene } from "./scenes/ResultsScene";
import { CTAScene } from "./scenes/CTAScene";

export const AIAutomationBusiness: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Sequence from={SCENE_HOOK_START} durationInFrames={SCENE_HOOK_DURATION}>
        <HookScene />
      </Sequence>
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
      <Sequence from={SCENE_RESULTS_START} durationInFrames={SCENE_RESULTS_DURATION}>
        <ResultsScene />
      </Sequence>
      <Sequence from={SCENE_CTA_START} durationInFrames={SCENE_CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
      <SubtitleSequence />
    </AbsoluteFill>
  );
};
