#!/usr/bin/env python3
"""
Fetch illustrations/photos for video scenes from free image APIs.

Sources (in priority order):
  1. Pixabay API — free, 500 req/hour, illustrations + photos + vectors
  2. Pexels API — free, 200 req/hour, photos only

Usage:
  python scripts/fetch-illustrations.py --scenes remotion_video/my-video/segments.json --outdir public/images/my-video
  python scripts/fetch-illustrations.py --query "artificial intelligence" --outdir public/images/test --count 5
  python scripts/fetch-illustrations.py --queries "AI robot,data chart,automation" --outdir public/images/test

Environment:
  PIXABAY_API_KEY  — get free at https://pixabay.com/api/docs/#api_key
  PEXELS_API_KEY   — get free at https://www.pexels.com/api/ (optional fallback)
"""

import argparse
import json
import os
import sys
import urllib.request
import urllib.parse
from pathlib import Path

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass


PIXABAY_API = "https://pixabay.com/api/"
PEXELS_API = "https://api.pexels.com/v1/search"


def fetch_pixabay(query: str, count: int = 3, image_type: str = "illustration") -> list[dict]:
    """Search Pixabay for images. image_type: illustration, photo, vector, all"""
    api_key = os.environ.get("PIXABAY_API_KEY")
    if not api_key:
        return []

    params = urllib.parse.urlencode({
        "key": api_key,
        "q": query,
        "image_type": image_type,
        "orientation": "horizontal",
        "min_width": 1280,
        "per_page": count,
        "safesearch": "true",
    })

    url = f"{PIXABAY_API}?{params}"
    try:
        req = urllib.request.Request(url)
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read())
        return [
            {
                "id": hit["id"],
                "url": hit.get("largeImageURL") or hit.get("webformatURL"),
                "preview": hit.get("previewURL"),
                "tags": hit.get("tags", ""),
                "source": "pixabay",
                "page_url": hit.get("pageURL", ""),
                "user": hit.get("user", ""),
            }
            for hit in data.get("hits", [])[:count]
        ]
    except Exception as e:
        print(f"  Pixabay error: {e}", file=sys.stderr)
        return []


def fetch_pexels(query: str, count: int = 3) -> list[dict]:
    """Search Pexels for photos."""
    api_key = os.environ.get("PEXELS_API_KEY")
    if not api_key:
        return []

    params = urllib.parse.urlencode({
        "query": query,
        "orientation": "landscape",
        "size": "large",
        "per_page": count,
    })

    url = f"{PEXELS_API}?{params}"
    try:
        req = urllib.request.Request(url, headers={"Authorization": api_key})
        resp = urllib.request.urlopen(req, timeout=15)
        data = json.loads(resp.read())
        return [
            {
                "id": photo["id"],
                "url": photo["src"]["large2x"],
                "preview": photo["src"]["medium"],
                "tags": query,
                "source": "pexels",
                "page_url": photo.get("url", ""),
                "user": photo.get("photographer", ""),
            }
            for photo in data.get("photos", [])[:count]
        ]
    except Exception as e:
        print(f"  Pexels error: {e}", file=sys.stderr)
        return []


def download_image(url: str, output_path: str) -> bool:
    """Download image to local file."""
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (AI Video Studio)"
        })
        resp = urllib.request.urlopen(req, timeout=30)
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        with open(output_path, "wb") as f:
            f.write(resp.read())
        return True
    except Exception as e:
        print(f"  Download error: {e}", file=sys.stderr)
        return False


def search_and_download(query: str, outdir: str, count: int = 3, prefix: str = "") -> list[str]:
    """Search for images and download them. Returns list of downloaded file paths."""
    print(f"Searching: \"{query}\" (count={count})")

    results = fetch_pixabay(query, count, "illustration")
    if len(results) < count:
        results += fetch_pixabay(query, count - len(results), "photo")
    if len(results) < count:
        results += fetch_pexels(query, count - len(results))

    if not results:
        print(f"  No results found for \"{query}\"")
        return []

    downloaded = []
    for i, item in enumerate(results):
        ext = "jpg"
        if item["url"].endswith(".png"):
            ext = "png"
        elif item["url"].endswith(".svg"):
            ext = "svg"

        filename = f"{prefix}scene-{i+1:02d}-{item['source']}-{item['id']}.{ext}"
        filepath = os.path.join(outdir, filename)

        if download_image(item["url"], filepath):
            print(f"  Downloaded: {filename} ({item['tags']}) by {item['user']}")
            downloaded.append(filepath)

    return downloaded


def extract_keywords_from_segments(segments_path: str) -> list[dict]:
    """Extract search keywords from segments.json scene texts."""
    with open(segments_path, "r", encoding="utf-8") as f:
        segments = json.load(f)

    scenes = []
    for seg in segments:
        text = seg.get("text", "")
        scene_id = seg.get("id", f"scene-{len(scenes)+1:02d}")
        words = text.split()[:6]
        keyword = " ".join(words) if words else scene_id
        scenes.append({"id": scene_id, "keyword": keyword, "text": text})

    return scenes


def main():
    parser = argparse.ArgumentParser(description="Fetch illustrations for video scenes")
    parser.add_argument("--scenes", help="Path to segments.json")
    parser.add_argument("--query", help="Single search query")
    parser.add_argument("--queries", help="Comma-separated search queries")
    parser.add_argument("--outdir", required=True, help="Output directory")
    parser.add_argument("--count", type=int, default=3, help="Images per query (default: 3)")
    parser.add_argument("--type", default="illustration", help="Image type: illustration, photo, vector, all")
    args = parser.parse_args()

    has_pixabay = bool(os.environ.get("PIXABAY_API_KEY"))
    has_pexels = bool(os.environ.get("PEXELS_API_KEY"))

    if not has_pixabay and not has_pexels:
        print("ERROR: No API keys found.", file=sys.stderr)
        print("Set at least one in .env:", file=sys.stderr)
        print("  PIXABAY_API_KEY=...  (free: https://pixabay.com/api/docs/#api_key)", file=sys.stderr)
        print("  PEXELS_API_KEY=...   (free: https://www.pexels.com/api/)", file=sys.stderr)
        sys.exit(1)

    print(f"Sources: {'Pixabay' if has_pixabay else ''} {'Pexels' if has_pexels else ''}")

    Path(args.outdir).mkdir(parents=True, exist_ok=True)
    all_downloaded = []

    if args.scenes:
        scenes = extract_keywords_from_segments(args.scenes)
        for scene in scenes:
            files = search_and_download(scene["keyword"], args.outdir, args.count, f"{scene['id']}-")
            all_downloaded.extend(files)

    elif args.queries:
        for i, q in enumerate(args.queries.split(",")):
            files = search_and_download(q.strip(), args.outdir, args.count, f"q{i+1:02d}-")
            all_downloaded.extend(files)

    elif args.query:
        all_downloaded = search_and_download(args.query, args.outdir, args.count)

    else:
        parser.print_help()
        sys.exit(1)

    print(f"\nTotal downloaded: {len(all_downloaded)} images → {args.outdir}")

    manifest_path = os.path.join(args.outdir, "manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump({
            "images": [os.path.basename(p) for p in all_downloaded],
            "outdir": args.outdir,
        }, f, indent=2)
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    main()
