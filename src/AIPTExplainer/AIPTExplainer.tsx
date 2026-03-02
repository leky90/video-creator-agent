import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  HOOK_START,
  HOOK_DURATION,
  PROBLEM_START,
  PROBLEM_DURATION,
  SOLUTION_START,
  SOLUTION_DURATION,
  HOW_IT_WORKS_START,
  HOW_IT_WORKS_DURATION,
  CTA_START,
  CTA_DURATION,
  COLORS,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { CTAScene } from "./scenes/CTAScene";

export const AIPTExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={HOOK_START} durationInFrames={HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={PROBLEM_START} durationInFrames={PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={SOLUTION_START} durationInFrames={SOLUTION_DURATION}>
        <SolutionScene />
      </Sequence>
      <Sequence
        from={HOW_IT_WORKS_START}
        durationInFrames={HOW_IT_WORKS_DURATION}
      >
        <HowItWorksScene />
      </Sequence>
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
    </AbsoluteFill>
  );
};
