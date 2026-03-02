import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  AGITATE_DURATION,
  AGITATE_START,
  COLORS,
  CTA_DURATION,
  CTA_START,
  HOW_IT_WORKS_DURATION,
  HOW_IT_WORKS_START,
  PROBLEM_DURATION,
  PROBLEM_START,
  SOLUTION_DURATION,
  SOLUTION_START,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { ProblemScene } from "./scenes/ProblemScene";
import { AgitateScene } from "./scenes/AgitateScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { CTAScene } from "./scenes/CTAScene";

export const AIProductivityTools: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Sequence from={PROBLEM_START} durationInFrames={PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={AGITATE_START} durationInFrames={AGITATE_DURATION}>
        <AgitateScene />
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
