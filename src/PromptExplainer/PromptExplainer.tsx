import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  HOOK_START,
  HOOK_DURATION,
  PROBLEM_START,
  PROBLEM_DURATION,
  WHAT_IS_START,
  WHAT_IS_DURATION,
  HOW_TO_USE_START,
  HOW_TO_USE_DURATION,
  CTA_START,
  CTA_DURATION,
  COLORS,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { WhatIsScene } from "./scenes/WhatIsScene";
import { HowToUseScene } from "./scenes/HowToUseScene";
import { CTAScene } from "./scenes/CTAScene";

export const PromptExplainer: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <Sequence from={HOOK_START} durationInFrames={HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={PROBLEM_START} durationInFrames={PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={WHAT_IS_START} durationInFrames={WHAT_IS_DURATION}>
        <WhatIsScene />
      </Sequence>
      <Sequence from={HOW_TO_USE_START} durationInFrames={HOW_TO_USE_DURATION}>
        <HowToUseScene />
      </Sequence>
      <Sequence from={CTA_START} durationInFrames={CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
    </AbsoluteFill>
  );
};
