import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import {
  COLORS,
  SCENE_HOOK_START,
  SCENE_HOOK_DURATION,
  SCENE_CONTEXT_START,
  SCENE_CONTEXT_DURATION,
  SCENE_ACTORS_START,
  SCENE_ACTORS_DURATION,
  SCENE_RECENT_START,
  SCENE_RECENT_DURATION,
  SCENE_IMPACT_START,
  SCENE_IMPACT_DURATION,
  SCENE_CTA_START,
  SCENE_CTA_DURATION,
} from "./constants";
import { AudioLayer } from "./components/AudioLayer";
import { SubtitleSequence } from "./components/SubtitleSequence";
import { HookScene } from "./scenes/HookScene";
import { ContextScene } from "./scenes/ContextScene";
import { ActorsScene } from "./scenes/ActorsScene";
import { RecentScene } from "./scenes/RecentScene";
import { ImpactScene } from "./scenes/ImpactScene";
import { CTAScene } from "./scenes/CTAScene";

export const IranMilitarySituation: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.bgDark }}>
      <Sequence from={SCENE_HOOK_START} durationInFrames={SCENE_HOOK_DURATION}>
        <HookScene />
      </Sequence>
      <Sequence from={SCENE_CONTEXT_START} durationInFrames={SCENE_CONTEXT_DURATION}>
        <ContextScene />
      </Sequence>
      <Sequence from={SCENE_ACTORS_START} durationInFrames={SCENE_ACTORS_DURATION}>
        <ActorsScene />
      </Sequence>
      <Sequence from={SCENE_RECENT_START} durationInFrames={SCENE_RECENT_DURATION}>
        <RecentScene />
      </Sequence>
      <Sequence from={SCENE_IMPACT_START} durationInFrames={SCENE_IMPACT_DURATION}>
        <ImpactScene />
      </Sequence>
      <Sequence from={SCENE_CTA_START} durationInFrames={SCENE_CTA_DURATION}>
        <CTAScene />
      </Sequence>
      <AudioLayer />
      <SubtitleSequence />
    </AbsoluteFill>
  );
};
