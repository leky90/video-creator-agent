#!/usr/bin/env python3
"""
Generate TTS from segments JSON → MP3 files.

Engines (set TTS_ENGINE in .env):
  edge        — Microsoft Edge TTS, free, default
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
    subprocess.run(
        [sys.executable, "-m", "edge_tts", "--voice", voice, "--text", text, "--write-media", out_path],
        check=True,
        cwd=ROOT,
    )


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
