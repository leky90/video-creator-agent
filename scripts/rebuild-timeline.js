/**
 * Rebuild AUDIO_SEGMENTS from MP3 durations + SRT sentence timestamps.
 *
 * For each scene's MP3, checks for a matching .srt file.
 * If SRT exists → produces multiple sub-segments (sentence-level timing).
 * If no SRT → falls back to single segment with full duration.
 *
 * TEMPLATE: The agent copies and customizes this per video.
 * Customize: AUDIO_DIR, SEGMENT_ORDER, SCENE_ORDER, outPath.
 *
 * Usage: node scripts/rebuild-timeline.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const { parseFile } = require("music-metadata");

const ROOT = path.join(__dirname, "..");
const AUDIO_DIR = path.join(ROOT, "public", "audio", "narration");
const FPS = 30;
const SCENE_PAD = 15;

const SEGMENT_ORDER = [
  "hook_0",
  "use_case_1_0",
  "use_case_2_0",
  "use_case_3_0",
  "summary_cta_0",
];

function getFfprobeCommand() {
  if (process.platform !== "win32") return "ffprobe";
  const localAppData =
    process.env.LOCALAPPDATA ||
    path.join(process.env.USERPROFILE || "", "AppData", "Local");
  const wingetBase = path.join(localAppData, "Microsoft", "WinGet", "Packages");
  try {
    const dirs = fs.readdirSync(wingetBase);
    const pkg = dirs.find((d) => d.startsWith("Gyan.FFmpeg"));
    if (!pkg) return "ffprobe";
    const pkgPath = path.join(wingetBase, pkg);
    const subs = fs.readdirSync(pkgPath);
    const ffmpegDir = subs.find(
      (s) =>
        s.startsWith("ffmpeg") &&
        fs.statSync(path.join(pkgPath, s)).isDirectory(),
    );
    if (!ffmpegDir) return "ffprobe";
    const exe = path.join(pkgPath, ffmpegDir, "bin", "ffprobe.exe");
    if (fs.existsSync(exe)) return `"${exe}"`;
  } catch (_) {}
  return "ffprobe";
}

const FFPROBE_CMD = getFfprobeCommand();

async function getDurationSeconds(mp3Path) {
  try {
    const out = execSync(
      `${FFPROBE_CMD} -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${mp3Path}"`,
      { encoding: "utf-8" },
    ).trim();
    return parseFloat(out, 10);
  } catch {
    const metadata = await parseFile(mp3Path);
    return metadata.format.duration ?? 10;
  }
}

/**
 * Parse sentence-grouped SRT file into timed entries.
 * Returns array of { startSec, endSec, text }.
 */
function parseSrt(srtPath) {
  const content = fs.readFileSync(srtPath, "utf-8");
  const blocks = content.trim().split(/\n\n+/);
  const entries = [];
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;
    const timeLine = lines[1];
    if (!timeLine.includes("-->")) continue;
    const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
    const text = lines.slice(2).join(" ").trim();
    entries.push({
      startSec: parseSrtTime(startStr),
      endSec: parseSrtTime(endStr),
      text,
    });
  }
  return entries;
}

function parseSrtTime(ts) {
  const [h, m, rest] = ts.split(":");
  const [s, ms] = rest.split(",");
  return parseInt(h) * 3600 + parseInt(m) * 60 + parseInt(s) + parseInt(ms) / 1000;
}

const SCENE_ORDER = [
  "hook",
  "use_case_1",
  "use_case_2",
  "use_case_3",
  "summary_cta",
];

async function main() {
  const byScene = {};
  let globalStart = 0;
  const sceneStarts = {};
  const sceneDurations = {};

  for (const id of SEGMENT_ORDER) {
    const mp3Path = path.join(AUDIO_DIR, `${id}.mp3`);
    const srtPath = path.join(AUDIO_DIR, `${id}.srt`);

    if (!fs.existsSync(mp3Path)) {
      console.warn(`Missing ${mp3Path}, using placeholder duration`);
    }
    const durationSec = fs.existsSync(mp3Path)
      ? await getDurationSeconds(mp3Path)
      : 10;
    const durationFrames = Math.round(durationSec * FPS);
    const sceneDuration = durationFrames + SCENE_PAD * 2;
    const sceneKey = id.replace(/_0$/, "");

    sceneStarts[sceneKey] = globalStart;
    sceneDurations[sceneKey] = sceneDuration;
    globalStart += sceneDuration;

    const audioFile = `audio/narration/${id}.mp3`;

    if (fs.existsSync(srtPath)) {
      const srtEntries = parseSrt(srtPath);
      if (srtEntries.length > 0) {
        byScene[sceneKey] = srtEntries.map((entry) => ({
          startFrame: SCENE_PAD + Math.round(entry.startSec * FPS),
          endFrame: SCENE_PAD + Math.round(entry.endSec * FPS),
          text: entry.text,
          file: audioFile,
        }));
        console.log(
          `  ${sceneKey}: ${srtEntries.length} segments from SRT`,
        );
        continue;
      }
    }

    byScene[sceneKey] = [
      {
        startFrame: SCENE_PAD,
        endFrame: SCENE_PAD + durationFrames,
        text: "",
        file: audioFile,
      },
    ];
    console.log(`  ${sceneKey}: 1 segment (no SRT)`);
  }

  const totalFrames = globalStart;
  const outPath = path.join(
    ROOT,
    "src",
    "OpenClawUseCases",
    "timeline.generated.ts",
  );
  const bySceneStr = JSON.stringify(byScene, null, 2);
  const scenesStr = JSON.stringify(
    Object.fromEntries(
      SCENE_ORDER.map((k) => [
        k,
        { start: sceneStarts[k] ?? 0, duration: sceneDurations[k] ?? 150 },
      ]),
    ),
    null,
    2,
  );
  const lines = [
    "// Auto-generated by rebuild-timeline — run after TTS to sync timing",
    "export type AudioSegment = { startFrame: number; endFrame: number; text: string; file: string };",
    "",
    "export const AUDIO_SEGMENTS: Record<string, AudioSegment[]> = " +
      bySceneStr +
      ";",
    "",
    "export const TOTAL_FRAMES = " + totalFrames + ";",
    "",
    "export const SCENES: Record<string, { start: number; duration: number }> = " +
      scenesStr +
      ";",
  ];
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, lines.join("\n"), "utf-8");
  console.log("Wrote", outPath, "| totalFrames:", totalFrames);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
