import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  SCENE_HOOK_START,
  SCENE_HOOK_DURATION,
  SCENE_PROBLEM_START,
  SCENE_PROBLEM_DURATION,
  SCENE_CHATGPT_START,
  SCENE_CHATGPT_DURATION,
  SCENE_CLAUDE_START,
  SCENE_CLAUDE_DURATION,
  SCENE_GEMINI_START,
  SCENE_GEMINI_DURATION,
  SCENE_COMPARISON_START,
  SCENE_COMPARISON_DURATION,
  SCENE_CTA_START,
  SCENE_CTA_DURATION,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { SubtitleSequence } from "./components/SubtitleSequence";
import { HookScene } from "./scenes/HookScene";
import { ProblemScene } from "./scenes/ProblemScene";
import { ChatGPTScene } from "./scenes/ChatGPTScene";
import { ClaudeScene } from "./scenes/ClaudeScene";
import { GeminiScene } from "./scenes/GeminiScene";
import { ComparisonScene } from "./scenes/ComparisonScene";
import { CTAScene } from "./scenes/CTAScene";

export const AIBattle2026: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Sequence from={SCENE_HOOK_START} durationInFrames={SCENE_HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={SCENE_PROBLEM_START} durationInFrames={SCENE_PROBLEM_DURATION}>
        <ProblemScene />
      </Sequence>
      <Sequence from={SCENE_CHATGPT_START} durationInFrames={SCENE_CHATGPT_DURATION}>
        <ChatGPTScene />
      </Sequence>
      <Sequence from={SCENE_CLAUDE_START} durationInFrames={SCENE_CLAUDE_DURATION}>
        <ClaudeScene />
      </Sequence>
      <Sequence from={SCENE_GEMINI_START} durationInFrames={SCENE_GEMINI_DURATION}>
        <GeminiScene />
      </Sequence>
      <Sequence from={SCENE_COMPARISON_START} durationInFrames={SCENE_COMPARISON_DURATION}>
        <ComparisonScene />
      </Sequence>
      <Sequence from={SCENE_CTA_START} durationInFrames={SCENE_CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
      <SubtitleSequence />
    </AbsoluteFill>
  );
};
