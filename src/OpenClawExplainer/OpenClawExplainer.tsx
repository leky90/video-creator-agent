import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  HOOK_START,
  HOOK_DURATION,
  PROBLEM_START,
  PROBLEM_DURATION,
  AGITATE_START,
  AGITATE_DURATION,
  SOLUTION_START,
  SOLUTION_DURATION,
  HOW_IT_WORKS_START,
  HOW_IT_WORKS_DURATION,
  USE_CASES_START,
  USE_CASES_DURATION,
  CTA_START,
  CTA_DURATION,
  BACKGROUND_GRADIENT,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { AgitateScene } from "./scenes/AgitateScene";
import { SolutionScene } from "./scenes/SolutionScene";
import { HowItWorksScene } from "./scenes/HowItWorksScene";
import { UseCasesScene } from "./scenes/UseCasesScene";
import { CTAScene } from "./scenes/CTAScene";

export const OpenClawExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: BACKGROUND_GRADIENT }}>
      <Sequence from={HOOK_START} durationInFrames={HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={PROBLEM_START} durationInFrames={PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={AGITATE_START} durationInFrames={AGITATE_DURATION}>
        <AgitateScene />
      </Sequence>
      <Sequence from={SOLUTION_START} durationInFrames={SOLUTION_DURATION}>
        <SolutionScene />
      </Sequence>
      <Sequence from={HOW_IT_WORKS_START} durationInFrames={HOW_IT_WORKS_DURATION}>
        <HowItWorksScene />
      </Sequence>
      <Sequence from={USE_CASES_START} durationInFrames={USE_CASES_DURATION}>
        <UseCasesScene />
      </Sequence>
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
    </AbsoluteFill>
  );
};
