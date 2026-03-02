import React, { useEffect, useState } from "react";
import { Lottie, LottieAnimationData } from "@remotion/lottie";
import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

import manifest from "../../public/lottie/manifest.json";

type ManifestEntry = (typeof manifest)[number];

export interface LottieAssetProps {
  /** Asset name from manifest (e.g. "ai-brain", "coding", "chart-bar") */
  name: string;
  style?: React.CSSProperties;
  /** Loop the animation (default: true) */
  loop?: boolean;
  /** Playback speed multiplier (default: 1) */
  playbackRate?: number;
  className?: string;
}

const cache = new Map<string, LottieAnimationData>();

/**
 * Pre-bundled Lottie animation wrapper.
 * Loads from public/lottie/ using the manifest for path resolution.
 *
 * Usage:
 *   <LottieAsset name="ai-brain" style={{ width: 400, height: 400 }} />
 *   <LottieAsset name="chart-bar" playbackRate={0.5} />
 */
export const LottieAsset: React.FC<LottieAssetProps> = ({
  name,
  style,
  loop = true,
  playbackRate = 1,
  className,
}) => {
  const [handle] = useState(() =>
    delayRender(`Loading Lottie asset: ${name}`),
  );
  const [animationData, setAnimationData] =
    useState<LottieAnimationData | null>(null);

  const entry = manifest.find(
    (e: ManifestEntry) => e.name === name,
  ) as ManifestEntry | undefined;
  const filePath = entry?.file ?? `lottie/${name}.json`;

  useEffect(() => {
    if (cache.has(filePath)) {
      setAnimationData(cache.get(filePath)!);
      continueRender(handle);
      return;
    }

    fetch(staticFile(filePath))
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load ${filePath}: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        cache.set(filePath, json as LottieAnimationData);
        setAnimationData(json as LottieAnimationData);
        continueRender(handle);
      })
      .catch((err) => {
        console.error(`LottieAsset "${name}":`, err);
        cancelRender(err);
      });
  }, [filePath, handle, name]);

  if (!animationData) return null;

  const defaultSize = entry?.suggestedSize ?? { width: 400, height: 400 };

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      playbackRate={playbackRate}
      className={className}
      style={{
        width: defaultSize.width,
        height: defaultSize.height,
        ...style,
      }}
    />
  );
};

/**
 * Get manifest entry for a Lottie asset by name.
 * Useful for reading tags, suggested scenes, etc.
 */
export function getLottieManifestEntry(name: string): ManifestEntry | undefined {
  return manifest.find((e: ManifestEntry) => e.name === name) as
    | ManifestEntry
    | undefined;
}

/**
 * Search manifest by tags or category.
 */
export function searchLottieAssets(
  query: string,
  options?: { category?: string },
): ManifestEntry[] {
  const q = query.toLowerCase();
  return manifest.filter((e: ManifestEntry) => {
    if (options?.category && e.category !== options.category) return false;
    return (
      e.name.includes(q) ||
      e.tags.some((t: string) => t.toLowerCase().includes(q))
    );
  }) as ManifestEntry[];
}
