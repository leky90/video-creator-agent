#!/usr/bin/env node

/**
 * Embed thumbnail into MP4 by replacing the first frame.
 * No extra duration added — Facebook/Twitter pick up frame 0 as the preview.
 *
 * Usage:
 *   node scripts/embed-thumbnail.js <video.mp4> [thumbnail.png]
 *
 * If thumbnail is omitted, looks for <video-name>-thumbnail.png in the same dir.
 * The original file is replaced in-place.
 */

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const FFMPEG_DIR =
  "C:\\Users\\ADMIN\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.0.1-full_build\\bin";

function findBin(name) {
  try {
    execSync(`${name} -version`, { stdio: "ignore" });
    return name;
  } catch {
    const full = path.join(FFMPEG_DIR, `${name}.exe`);
    if (fs.existsSync(full)) return `"${full}"`;
    throw new Error(
      `${name} not found. Add it to PATH or install via: winget install Gyan.FFmpeg`
    );
  }
}

function getVideoInfo(ffprobe, videoPath) {
  const raw = execSync(
    `${ffprobe} -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -of json "${videoPath}"`,
    { encoding: "utf-8" }
  );
  const info = JSON.parse(raw).streams[0];
  const [num, den] = info.r_frame_rate.split("/").map(Number);
  return { width: info.width, height: info.height, fps: Math.round(num / den) };
}

function main() {
  const args = process.argv.slice(2);
  if (args.length < 1) {
    console.error("Usage: node scripts/embed-thumbnail.js <video.mp4> [thumbnail.png]");
    process.exit(1);
  }

  const videoPath = path.resolve(args[0]);
  if (!fs.existsSync(videoPath)) {
    console.error(`Video not found: ${videoPath}`);
    process.exit(1);
  }

  const baseName = path.basename(videoPath, path.extname(videoPath));
  const videoDir = path.dirname(videoPath);

  const thumbPath = args[1]
    ? path.resolve(args[1])
    : path.join(videoDir, `${baseName}-thumbnail.png`);

  if (!fs.existsSync(thumbPath)) {
    console.error(`Thumbnail not found: ${thumbPath}`);
    console.error(
      `Hint: render it first with:\n  npx remotion still src/index.ts <ThumbnailId> ${thumbPath}`
    );
    process.exit(1);
  }

  const ffmpeg = findBin("ffmpeg");
  const ffprobe = findBin("ffprobe");
  const tmpPath = path.join(videoDir, `${baseName}_tmp${path.extname(videoPath)}`);

  const { width, height } = getVideoInfo(ffprobe, videoPath);

  console.log(`Video:     ${videoPath} (${width}x${height})`);
  console.log(`Thumbnail: ${thumbPath}`);
  console.log(`Replacing frame 0...`);

  try {
    execSync(
      `${ffmpeg} -y -i "${videoPath}" -i "${thumbPath}" ` +
        `-filter_complex "` +
          `[1:v]scale=${width}:${height}:force_original_aspect_ratio=decrease,` +
          `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=black,` +
          `setsar=1,format=yuv420p[thumb];` +
          `[0:v][thumb]overlay=enable='lte(n\\,0)'[outv]` +
        `" ` +
        `-map "[outv]" -map 0:a -c:v libx264 -preset fast -crf 18 -c:a copy ` +
        `-movflags +faststart ` +
        `"${tmpPath}"`,
      { stdio: "inherit" }
    );

    fs.unlinkSync(videoPath);
    fs.renameSync(tmpPath, videoPath);

    console.log(`\nDone! Frame 0 replaced with thumbnail in ${videoPath}`);
  } catch (err) {
    if (fs.existsSync(tmpPath)) fs.unlinkSync(tmpPath);
    console.error("ffmpeg failed:", err.message);
    process.exit(1);
  }
}

main();
