# AI Video Studio

Video production studio chạy trên Cursor IDE + Remotion. Từ nghiên cứu chủ đề → kịch bản → TTS → animation → render MP4 + thumbnail, tất cả tự động qua subagent.

## Yêu cầu

| Tool | Version | Mô tả |
|------|---------|-------|
| Node.js | >= 18 | Runtime cho Remotion |
| Python | >= 3.10 | TTS generation |
| FFmpeg | >= 6.0 | Audio/video processing (ffprobe + embed thumbnail) |
| Cursor IDE | latest | IDE + subagent runtime |

## Cài đặt

### macOS

```bash
# 1. Cài Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Cài dependencies hệ thống
brew install node python ffmpeg

# 3. Clone và setup project
git clone <repo-url> ai-video-studio
cd ai-video-studio
npm install

# 4. Cài Python dependencies
pip3 install edge-tts python-dotenv

# 5. Cấu hình TTS (tùy chọn)
cp .env.example .env
# Mặc định dùng edge-tts miễn phí. Sửa .env nếu muốn ElevenLabs / Google Cloud TTS.
```

### Linux (Ubuntu/Debian)

```bash
# 1. Cài Node.js (via NodeSource)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Cài Python + FFmpeg
sudo apt install -y python3 python3-pip ffmpeg

# 3. Clone và setup project
git clone <repo-url> ai-video-studio
cd ai-video-studio
npm install

# 4. Cài Python dependencies
pip3 install edge-tts python-dotenv

# 5. Cấu hình TTS (tùy chọn)
cp .env.example .env
```

### Windows

```powershell
# 1. Cài Node.js — download installer từ https://nodejs.org
# Hoặc qua winget:
winget install OpenJS.NodeJS.LTS

# 2. Cài Python — download từ https://python.org
# ⚠️ Tick "Add Python to PATH" khi cài
# Hoặc qua winget:
winget install Python.Python.3.12

# 3. Cài FFmpeg
winget install Gyan.FFmpeg
# ⚠️ Sau khi cài, đóng và mở lại terminal để cập nhật PATH
# Kiểm tra: ffmpeg -version

# 4. Clone và setup project
git clone <repo-url> ai-video-studio
cd ai-video-studio
npm install

# 5. Cài Python dependencies
python -m pip install edge-tts python-dotenv

# 6. Cấu hình TTS (tùy chọn)
copy .env.example .env
# Mặc định dùng edge-tts miễn phí. Sửa .env nếu muốn ElevenLabs / Google Cloud TTS.
```

### Kiểm tra cài đặt

```bash
node -v          # >= 18.x
python3 -v       # >= 3.10 (Windows: python -V)
ffmpeg -version  # >= 6.x
ffprobe -version # phải có (đi kèm ffmpeg)
```

## Sử dụng

### Cách 1: Subagent tự động (khuyến nghị)

Trong Cursor IDE, gọi subagent:

```
/video-creator [CHỦ ĐỀ]
```

Ví dụ:
```
/video-creator AI Agent là gì
/video-creator So sánh ChatGPT Claude Gemini ai-comparison-2026
/video-creator Top 7 AI tools miễn phí top-7-free-ai-tools
```

Subagent tự động chạy 7 bước: nghiên cứu → kịch bản → TTS → sync timeline → visual plan → Remotion code → render + thumbnail.

### Cách 2: Từng bước thủ công

```bash
# Preview trong browser
npm run dev

# Render video
npm run render -- [CompositionId] out/video-name.mp4 --codec h264

# Render thumbnail
npm run thumbnail -- [CompositionId]Thumbnail out/video-name-thumbnail.png

# Embed thumbnail vào video (2s still frame đầu video)
npm run embed-thumb -- out/video-name.mp4

# Re-generate TTS cho tất cả video
npm run tts:all
```

## Cấu trúc project

```
ai-video-studio/
├── .cursor/
│   ├── agents/
│   │   └── video-creator.md          # Subagent - orchestrate toàn bộ workflow
│   └── skills/
│       ├── pro-video-creator/         # Skill chính - visual design + templates
│       │   ├── SKILL.md
│       │   ├── templates/             # 10 scene templates
│       │   │   ├── notification-swarm.md
│       │   │   ├── data-fragmentation.md
│       │   │   ├── orbital-hub.md
│       │   │   ├── multi-column-showcase.md
│       │   │   ├── particle-cta.md
│       │   │   ├── counter-reveal.md
│       │   │   ├── timeline-flow.md
│       │   │   ├── split-compare.md
│       │   │   ├── floating-cards.md
│       │   │   └── code-terminal.md
│       │   ├── components/            # 8 reusable animation components
│       │   │   ├── ParticleField.md
│       │   │   ├── AmbientGlow.md
│       │   │   ├── SpringBadge.md
│       │   │   ├── AnimatedCounter.md
│       │   │   ├── TypingEffect.md
│       │   │   ├── ProgressRing.md
│       │   │   ├── GradientText.md
│       │   │   └── PulsingGlow.md
│       │   └── references/
│       │       ├── pro-assets-guide.md       # Nguồn Lottie, icons, illustrations
│       │       └── visual-variety-rules.md   # Quy tắc đa dạng visual
│       ├── web-research/              # Nghiên cứu từ internet
│       ├── content-research-writer/   # Viết kịch bản
│       ├── explainer-video-guide/     # Cấu trúc video explainer
│       ├── educational-video-creator/ # Remotion workflow gốc
│       ├── remotion-best-practices/   # Remotion API reference
│       ├── remotion-video-toolkit/    # Animation patterns
│       ├── remotion-asset-coordinator/# Quản lý assets
│       ├── unsplash/                  # Ảnh miễn phí từ Unsplash
│       └── content-repurposing/       # Tái sử dụng nội dung
├── src/
│   ├── Root.tsx                       # Đăng ký compositions
│   ├── index.ts                       # Entry point
│   └── [VideoName]/                   # Mỗi video = 1 folder
│       ├── [VideoName].tsx            # Composition chính
│       ├── Thumbnail.tsx              # Thumbnail composition
│       ├── constants.ts               # Colors, fonts, narration
│       ├── timeline.generated.ts      # Auto-generated từ audio
│       ├── components/
│       │   ├── AudioLayer.tsx
│       │   └── SubtitleSequence.tsx
│       └── scenes/
│           ├── Scene01_Hook.tsx
│           ├── Scene02_Problem.tsx
│           └── ...
├── scripts/
│   ├── generate-tts.py               # TTS generation (edge-tts/elevenlabs/google)
│   ├── embed-thumbnail.js            # Chèn thumbnail vào MP4
│   ├── rebuild-timeline.js           # Template rebuild-timeline
│   └── regenerate-all-tts.js         # Re-generate TTS tất cả video
├── public/
│   ├── audio/narration/[video-name]/ # TTS audio files
│   └── lottie/[video-name]/          # Lottie JSON animations
├── remotion_video/
│   └── [video-name]/
│       ├── research.md               # Kết quả nghiên cứu
│       └── segments.json             # Kịch bản theo scenes
├── out/                               # Video + thumbnail output
├── .env.example                       # Template cấu hình TTS
├── package.json
└── README.md
```

## Loại video hỗ trợ

| Loại | Cấu trúc |
|------|----------|
| Explainer | Problem → Agitate → Solution → How it works → CTA |
| Tutorial | Hook → Overview → Step-by-step → Tips → Recap |
| Review/So sánh | Hook → Intro → Criteria → Compare → Verdict |
| Storytelling | Hook → Context → Conflict → Resolution → Takeaway |
| Marketing | Hook → Pain → Solution → Social proof → CTA |
| Listicle | Hook → Item 1 → Item 2 → ... → Summary → CTA |
| Product demo | Hook → Problem → Demo → Features → Pricing → CTA |

## TTS Voice

Mặc định: **edge-tts** với giọng `vi-VN-NamMinhNeural` (miễn phí, không cần API key).

Các engine khác (cấu hình trong `.env`):

| Engine | Chất lượng | Giá | Cần API key |
|--------|-----------|-----|-------------|
| edge-tts | Tốt | Miễn phí | Không |
| ElevenLabs | Rất tốt | Paid | Có |
| Google Cloud TTS | Rất tốt | Free tier 4M chars/tháng | Có |

## Visual Assets

Thứ tự ưu tiên khi chọn visual cho scene:

1. **Lottie animations** — từ LottieFiles.com (`@remotion/lottie`)
2. **SVG icon library** — Lucide React (`lucide-react`)
3. **Light Leaks** — hiệu ứng cinematic (`@remotion/light-leaks`)
4. **Illustrations** — từ unDraw, Storyset
5. **Code-based animations** — particles, gradient orbs
6. **Custom SVG** — chỉ khi không có nguồn phù hợp

## Scene Templates

10 templates để mỗi scene có layout khác nhau:

| Template | Dùng cho |
|----------|----------|
| Notification Swarm | Problem/pain — badges xung quanh figure |
| Data Fragmentation | Agitate — vỡ vụn, bar chart |
| Orbital Hub | Solution — hub + orbiting nodes |
| Multi-Column Showcase | How-it-works — columns + micro-demos |
| Particle CTA | CTA — particles + glowing button |
| Counter Reveal | Hook/stats — animated counter |
| Timeline Flow | Process — sequential timeline |
| Split Compare | Before/After — split screen |
| Floating Cards | Features — spring physics cards |
| Code Terminal | Tech demo — terminal + typing |

## License

UNLICENSED — Private project.
