/**
 * Shared layout constants for consistent scene composition.
 * Import in every scene: import { LAYOUT } from "@shared/layout";
 */

export const LAYOUT = {
  WIDTH: 1920,
  HEIGHT: 1080,

  SAFE_ZONE: 80,
  PADDING: 60,
  COLUMN_GAP: 32,
  ROW_GAP: 24,

  CONTENT_LEFT: 80,
  CONTENT_RIGHT: 80,
  CONTENT_TOP: 80,
  CONTENT_BOTTOM: 120,

  get CONTENT_WIDTH() {
    return this.WIDTH - this.CONTENT_LEFT - this.CONTENT_RIGHT;
  },
  get CONTENT_HEIGHT() {
    return this.HEIGHT - this.CONTENT_TOP - this.CONTENT_BOTTOM;
  },

  FOCAL_MAX_WIDTH: 500,
  FOCAL_MAX_HEIGHT: 500,
  FOCAL_MIN_SIZE: 200,

  MAX_VISUAL_ELEMENTS: 5,

  SUBTITLE_BOTTOM: 60,
  SUBTITLE_HEIGHT: 80,
} as const;

export const ZONES = {
  center: {
    top: LAYOUT.CONTENT_TOP,
    left: LAYOUT.CONTENT_LEFT,
    width: LAYOUT.WIDTH - LAYOUT.CONTENT_LEFT - LAYOUT.CONTENT_RIGHT,
    height: LAYOUT.HEIGHT - LAYOUT.CONTENT_TOP - LAYOUT.CONTENT_BOTTOM,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    flexDirection: "column" as const,
  },
  leftThird: {
    position: "absolute" as const,
    top: LAYOUT.CONTENT_TOP,
    left: LAYOUT.CONTENT_LEFT,
    width: Math.floor(
      (LAYOUT.WIDTH - LAYOUT.CONTENT_LEFT - LAYOUT.CONTENT_RIGHT) * 0.4,
    ),
    height: LAYOUT.HEIGHT - LAYOUT.CONTENT_TOP - LAYOUT.CONTENT_BOTTOM,
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
  },
  rightTwoThirds: {
    position: "absolute" as const,
    top: LAYOUT.CONTENT_TOP,
    right: LAYOUT.CONTENT_RIGHT,
    width: Math.floor(
      (LAYOUT.WIDTH - LAYOUT.CONTENT_LEFT - LAYOUT.CONTENT_RIGHT) * 0.55,
    ),
    height: LAYOUT.HEIGHT - LAYOUT.CONTENT_TOP - LAYOUT.CONTENT_BOTTOM,
  },
  topBanner: {
    position: "absolute" as const,
    top: LAYOUT.CONTENT_TOP,
    left: LAYOUT.CONTENT_LEFT,
    right: LAYOUT.CONTENT_RIGHT,
    height: 100,
  },
  contentBelow: {
    position: "absolute" as const,
    top: LAYOUT.CONTENT_TOP + 120,
    left: LAYOUT.CONTENT_LEFT,
    right: LAYOUT.CONTENT_RIGHT,
    bottom: LAYOUT.CONTENT_BOTTOM,
  },
} as const;

export const TYPOGRAPHY = {
  headline: { fontSize: 48, fontWeight: 700, lineHeight: 1.2 },
  subheadline: { fontSize: 36, fontWeight: 600, lineHeight: 1.3 },
  body: { fontSize: 24, fontWeight: 400, lineHeight: 1.5 },
  label: { fontSize: 16, fontWeight: 600, lineHeight: 1.4, letterSpacing: 1 },
  counter: { fontSize: 72, fontWeight: 800, lineHeight: 1 },
} as const;

export const Z_INDEX = {
  background: 0,
  ambient: 1,
  content: 2,
  focal: 3,
  text: 4,
  subtitle: 10,
} as const;
