/**
 * Regenerate TTS (voiceover) cho tất cả video rồi rebuild timeline.
 * Đọc voice từ .env (EDGE_VOICE hoặc ELEVENLABS_VOICE_ID). Có thể truyền --voice để ghi đè.
 *
 * Usage: node scripts/regenerate-all-tts.js [--voice "vi-VN-HoaiMyNeural"]
 */

const path = require("path");
const { spawnSync } = require("child_process");

const ROOT = path.join(__dirname, "..");

const JOBS = [
  {
    name: "OpenClaw Explainer",
    segments: "remotion_video/explainer/segments.json",
    outdir: "public/audio/narration-explainer",
    rebuild: "scripts/rebuild-timeline-explainer.js",
  },
  {
    name: "Prompt Explainer",
    segments: "remotion_video/prompt-explainer/segments.json",
    outdir: "public/audio/narration-prompt-explainer",
    rebuild: "scripts/rebuild-timeline-prompt-explainer.js",
  },
  {
    name: "AIPT Explainer",
    segments: "remotion_video/ai-productivity-tools-explainer/segments.json",
    outdir: "public/audio/narration-aipt-explainer",
    rebuild: "scripts/rebuild-timeline-aipt-explainer.js",
  },
];

function run(cmd, args, opts = {}) {
  const result = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: "inherit",
    shell: true,
    ...opts,
  });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

const voiceArg = process.argv.includes("--voice")
  ? process.argv.slice(process.argv.indexOf("--voice"), process.argv.indexOf("--voice") + 2)
  : [];

for (const job of JOBS) {
  console.log("\n---", job.name, "---");
  run("python", [
    "scripts/generate-tts.py",
    "--segments", job.segments,
    "--outdir", job.outdir,
    ...voiceArg,
  ]);
  run("node", [path.join(ROOT, job.rebuild)]);
}

console.log("\nDone. All videos updated with current voice.");
