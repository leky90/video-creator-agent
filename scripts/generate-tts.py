#!/usr/bin/env python3
"""
Generate TTS from segments JSON → MP3 + SRT files.

Outputs per segment:
  {seg_id}.mp3  — audio file
  {seg_id}.srt  — word-level subtitle timestamps (edge-tts only, sentence-grouped)

Engines (set TTS_ENGINE in .env):
  edge        — Microsoft Edge TTS, free, default (supports SRT)
  elevenlabs  — ElevenLabs, needs ELEVENLABS_API_KEY
  google      — Google Cloud TTS, needs GOOGLE_TTS_API_KEY

Usage:
  python scripts/generate-tts.py
  python scripts/generate-tts.py --segments remotion_video/explainer/segments.json --outdir public/audio/narration-explainer
"""
import argparse
import json
import os
import re
import subprocess
import sys

try:
    from dotenv import load_dotenv
    _env_path = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".env")
    if load_dotenv(_env_path):
        print("Loaded .env from", _env_path)
    elif not os.path.isfile(_env_path):
        print("No .env file (copy from .env.example and set EDGE_VOICE or ELEVENLABS_VOICE_ID to change voice)", file=sys.stderr)
except ImportError:
    pass

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEFAULT_SEGMENTS = os.path.join(ROOT, "remotion_video", "segments.json")
DEFAULT_OUT_DIR = os.path.join(ROOT, "public", "audio", "narration")

DEFAULT_VOICE_EDGE = "vi-VN-NamMinhNeural"
DEFAULT_VOICE_ELEVENLABS = "pNInz6obpgDQGcFmaJgB"  # Adam — multilingual
ELEVENLABS_MODEL = "eleven_multilingual_v2"
DEFAULT_VOICE_GOOGLE = "vi-VN-Neural2-A"  # Female; vi-VN-Neural2-D = Male
GOOGLE_TTS_ENDPOINT = "https://texttospeech.googleapis.com/v1/text:synthesize"


def clean(text: str) -> str:
    t = re.sub(r"\[\.\.?\.?\]", " ", text)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def generate_edge(seg_id: str, text: str, voice: str, out_path: str) -> None:
    srt_path = out_path.replace(".mp3", ".srt")
    subprocess.run(
        [
            sys.executable, "-m", "edge_tts",
            "--voice", voice,
            "--text", text,
            "--write-media", out_path,
            "--write-subtitles", srt_path,
        ],
        check=True,
        cwd=ROOT,
    )
    if os.path.isfile(srt_path):
        grouped = _group_srt_by_sentence(srt_path)
        with open(srt_path, "w", encoding="utf-8") as f:
            f.write(grouped)
        print(f"  + {os.path.basename(srt_path)} (sentence-grouped)")


def _parse_srt_time(ts: str) -> float:
    """Parse SRT timestamp 'HH:MM:SS,mmm' → seconds."""
    h, m, rest = ts.strip().split(":")
    s, ms = rest.split(",")
    return int(h) * 3600 + int(m) * 60 + int(s) + int(ms) / 1000.0


def _format_srt_time(sec: float) -> str:
    """Format seconds → 'HH:MM:SS,mmm'."""
    h = int(sec // 3600)
    m = int((sec % 3600) // 60)
    s = sec % 60
    ms = int((s - int(s)) * 1000)
    return f"{h:02d}:{m:02d}:{int(s):02d},{ms:03d}"


def _group_srt_by_sentence(srt_path: str) -> str:
    """Group word-level SRT entries into sentence-level entries.
    
    Splits on sentence-ending punctuation (.!?) to produce fewer, 
    more meaningful subtitle blocks aligned to sentence boundaries.
    """
    with open(srt_path, "r", encoding="utf-8") as f:
        content = f.read()

    blocks = re.split(r"\n\n+", content.strip())
    words = []
    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) < 3:
            continue
        time_line = lines[1]
        text_part = " ".join(lines[2:]).strip()
        if " --> " not in time_line:
            continue
        start_str, end_str = time_line.split(" --> ")
        words.append({
            "start": _parse_srt_time(start_str),
            "end": _parse_srt_time(end_str),
            "text": text_part,
        })

    if not words:
        return content

    sentences = []
    current_words = []
    for w in words:
        current_words.append(w)
        if re.search(r"[.!?。]$", w["text"].strip()):
            sentences.append({
                "start": current_words[0]["start"],
                "end": current_words[-1]["end"],
                "text": " ".join(cw["text"] for cw in current_words),
            })
            current_words = []
    if current_words:
        sentences.append({
            "start": current_words[0]["start"],
            "end": current_words[-1]["end"],
            "text": " ".join(cw["text"] for cw in current_words),
        })

    out_lines = []
    for i, sent in enumerate(sentences, 1):
        out_lines.append(str(i))
        out_lines.append(f"{_format_srt_time(sent['start'])} --> {_format_srt_time(sent['end'])}")
        out_lines.append(sent["text"])
        out_lines.append("")

    return "\n".join(out_lines)


def generate_elevenlabs(seg_id: str, text: str, voice: str, out_path: str) -> None:
    api_key = os.environ.get("ELEVENLABS_API_KEY")
    if not api_key:
        raise SystemExit("ELEVENLABS_API_KEY is not set. Set it in .env or environment.")
    from elevenlabs.client import ElevenLabs
    client = ElevenLabs(api_key=api_key)
    chunks = client.text_to_speech.convert(
        voice_id=voice,
        text=text,
        model_id=ELEVENLABS_MODEL,
        output_format="mp3_22050_32",
    )
    with open(out_path, "wb") as f:
        for chunk in chunks:
            f.write(chunk)


def generate_google(seg_id: str, text: str, voice: str, out_path: str) -> None:
    import base64
    import urllib.request

    api_key = os.environ.get("GOOGLE_TTS_API_KEY")
    if not api_key:
        raise SystemExit("GOOGLE_TTS_API_KEY is not set. Set it in .env or environment.")

    lang_code = "-".join(voice.split("-")[:2]) if voice else "vi-VN"
    payload = json.dumps({
        "input": {"text": text},
        "voice": {"languageCode": lang_code, "name": voice},
        "audioConfig": {"audioEncoding": "MP3", "sampleRateHertz": 24000},
    }).encode()

    url = f"{GOOGLE_TTS_ENDPOINT}?key={api_key}"
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
    resp = urllib.request.urlopen(req)
    data = json.loads(resp.read())
    audio_bytes = base64.b64decode(data["audioContent"])
    with open(out_path, "wb") as f:
        f.write(audio_bytes)


def main():
    parser = argparse.ArgumentParser(description="Generate TTS from segments JSON")
    parser.add_argument(
        "--segments",
        default=DEFAULT_SEGMENTS,
        help=f"Path to segments.json (default: {os.path.basename(os.path.dirname(DEFAULT_SEGMENTS))}/{os.path.basename(DEFAULT_SEGMENTS)})",
    )
    parser.add_argument(
        "--outdir",
        default=DEFAULT_OUT_DIR,
        help="Output directory for MP3 files (default: public/audio/narration)",
    )
    parser.add_argument(
        "--voice",
        default="",
        help="Voice: Edge-TTS (e.g. vi-VN-NamMinhNeural) or ElevenLabs voice ID. Overrides EDGE_VOICE / ELEVENLABS_VOICE_ID.",
    )
    args = parser.parse_args()
    segments_path = args.segments if os.path.isabs(args.segments) else os.path.join(ROOT, args.segments)
    out_dir = args.outdir if os.path.isabs(args.outdir) else os.path.join(ROOT, args.outdir)

    if not os.path.isfile(segments_path):
        print(f"Missing {segments_path}", file=sys.stderr)
        sys.exit(1)
    os.makedirs(out_dir, exist_ok=True)

    engine = os.environ.get("TTS_ENGINE", "edge").lower()
    if engine == "elevenlabs":
        if not os.environ.get("ELEVENLABS_API_KEY"):
            print("Set ELEVENLABS_API_KEY (e.g. in .env) and TTS_ENGINE=elevenlabs", file=sys.stderr)
            sys.exit(1)
        default_voice = (args.voice or os.environ.get("ELEVENLABS_VOICE_ID", "").strip() or DEFAULT_VOICE_ELEVENLABS).strip()
        generate_fn = generate_elevenlabs
        print("Using ElevenLabs TTS (voice:", default_voice, ")")
    elif engine == "google":
        if not os.environ.get("GOOGLE_TTS_API_KEY"):
            print("Set GOOGLE_TTS_API_KEY (e.g. in .env) and TTS_ENGINE=google", file=sys.stderr)
            sys.exit(1)
        default_voice = (args.voice or os.environ.get("GOOGLE_TTS_VOICE", "").strip() or DEFAULT_VOICE_GOOGLE).strip()
        generate_fn = generate_google
        print("Using Google Cloud TTS (voice:", default_voice, ")")
    else:
        default_voice = (args.voice or os.environ.get("EDGE_VOICE", "").strip() or DEFAULT_VOICE_EDGE).strip()
        generate_fn = generate_edge
        print("Using Edge-TTS (voice:", default_voice, ")")

    with open(segments_path, "r", encoding="utf-8") as f:
        segments = json.load(f)
    for seg in segments:
        seg_id = seg["id"]
        text = clean(seg["text"])
        voice = seg.get("voice") or default_voice
        out_path = os.path.join(out_dir, f"{seg_id}.mp3")
        print(f"Generating {seg_id}.mp3 ...")
        generate_fn(seg_id, text, voice, out_path)
    print(f"Done. Output: {out_dir}")


if __name__ == "__main__":
    main()
