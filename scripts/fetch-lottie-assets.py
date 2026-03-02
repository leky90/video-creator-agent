"""
Download free Lottie JSON animations from LottieFiles for pre-bundling.
Uses publicly available animation URLs (Lottie Simple License — free commercial use).

Usage: python scripts/fetch-lottie-assets.py
"""

import json
import os
import urllib.request
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOTTIE_DIR = os.path.join(ROOT, "public", "lottie")

ASSETS = [
    # === AI ===
    {
        "name": "ai-brain",
        "category": "ai",
        "tags": ["AI", "neural network", "brain", "intelligence", "thinking"],
        "url": "https://lottie.host/4db68bbd-31f6-4cd8-84eb-189572c9ac17/AtDGMYFbSe.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["hook", "solution", "info"],
    },
    {
        "name": "ai-robot",
        "category": "ai",
        "tags": ["AI", "robot", "assistant", "chatbot", "automation"],
        "url": "https://lottie.host/1a2b3c4d-robot-placeholder/robot.json",
        "fallback_url": "https://assets2.lottiefiles.com/packages/lf20_M9p23l.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["hook", "solution", "automation"],
    },
    {
        "name": "ai-chip",
        "category": "ai",
        "tags": ["AI", "chip", "processor", "CPU", "hardware", "technology"],
        "url": "https://assets9.lottiefiles.com/packages/lf20_svy4ivvy.json",
        "suggestedSize": {"width": 350, "height": 350},
        "suggestedScenes": ["solution", "tech"],
    },
    {
        "name": "ai-network",
        "category": "ai",
        "tags": ["AI", "network", "nodes", "connected", "neural", "graph"],
        "url": "https://assets3.lottiefiles.com/packages/lf20_kuiie5gq.json",
        "suggestedSize": {"width": 500, "height": 400},
        "suggestedScenes": ["info", "solution", "hook"],
    },
    {
        "name": "ai-learning",
        "category": "ai",
        "tags": ["AI", "machine learning", "training", "model", "education"],
        "url": "https://assets10.lottiefiles.com/packages/lf20_kkflmtur.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["info", "solution"],
    },
    # === TECH ===
    {
        "name": "coding",
        "category": "tech",
        "tags": ["code", "programming", "developer", "software", "typing"],
        "url": "https://assets4.lottiefiles.com/packages/lf20_w51pcehl.json",
        "suggestedSize": {"width": 500, "height": 400},
        "suggestedScenes": ["code", "tech"],
    },
    {
        "name": "terminal",
        "category": "tech",
        "tags": ["terminal", "console", "CLI", "command line", "shell"],
        "url": "https://assets6.lottiefiles.com/packages/lf20_uwR49r.json",
        "suggestedSize": {"width": 500, "height": 350},
        "suggestedScenes": ["code", "tech"],
    },
    {
        "name": "cloud",
        "category": "tech",
        "tags": ["cloud", "computing", "server", "hosting", "SaaS"],
        "url": "https://assets1.lottiefiles.com/packages/lf20_hbr24n88.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["tech", "solution"],
    },
    {
        "name": "server",
        "category": "tech",
        "tags": ["server", "database", "hosting", "infrastructure", "backend"],
        "url": "https://assets7.lottiefiles.com/packages/lf20_DSMSKi.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["tech", "info"],
    },
    {
        "name": "api",
        "category": "tech",
        "tags": ["API", "connection", "integration", "sync", "data transfer"],
        "url": "https://assets3.lottiefiles.com/packages/lf20_hzfmxrr7.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["tech", "info"],
    },
    {
        "name": "security",
        "category": "tech",
        "tags": ["security", "shield", "lock", "protection", "privacy"],
        "url": "https://assets8.lottiefiles.com/packages/lf20_ulp9txrj.json",
        "suggestedSize": {"width": 350, "height": 350},
        "suggestedScenes": ["info", "solution"],
    },
    # === DATA ===
    {
        "name": "chart-bar",
        "category": "data",
        "tags": ["chart", "bar chart", "analytics", "statistics", "growth"],
        "url": "https://assets7.lottiefiles.com/packages/lf20_dews3j6m.json",
        "suggestedSize": {"width": 500, "height": 400},
        "suggestedScenes": ["data", "stats"],
    },
    {
        "name": "chart-pie",
        "category": "data",
        "tags": ["chart", "pie chart", "distribution", "percentage", "ratio"],
        "url": "https://assets4.lottiefiles.com/packages/lf20_iorpbol0.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["data", "stats"],
    },
    {
        "name": "chart-line",
        "category": "data",
        "tags": ["chart", "line chart", "trend", "growth", "time series"],
        "url": "https://assets9.lottiefiles.com/packages/lf20_t9gkkhz4.json",
        "suggestedSize": {"width": 500, "height": 350},
        "suggestedScenes": ["data", "stats", "hook"],
    },
    {
        "name": "database",
        "category": "data",
        "tags": ["database", "storage", "data", "SQL", "records"],
        "url": "https://assets5.lottiefiles.com/packages/lf20_puciaact.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["data", "tech"],
    },
    {
        "name": "analytics",
        "category": "data",
        "tags": ["analytics", "dashboard", "metrics", "KPI", "monitoring"],
        "url": "https://assets10.lottiefiles.com/packages/lf20_qp1q7mct.json",
        "suggestedSize": {"width": 500, "height": 400},
        "suggestedScenes": ["data", "info"],
    },
    # === BUSINESS ===
    {
        "name": "growth",
        "category": "business",
        "tags": ["growth", "upward", "trend", "profit", "increase", "success"],
        "url": "https://assets8.lottiefiles.com/packages/lf20_ydo1amjm.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["hook", "data", "cta"],
    },
    {
        "name": "team",
        "category": "business",
        "tags": ["team", "collaboration", "people", "group", "meeting"],
        "url": "https://assets5.lottiefiles.com/packages/lf20_gkgqj2yq.json",
        "suggestedSize": {"width": 500, "height": 400},
        "suggestedScenes": ["info", "solution"],
    },
    {
        "name": "money",
        "category": "business",
        "tags": ["money", "finance", "savings", "investment", "dollar"],
        "url": "https://assets6.lottiefiles.com/packages/lf20_06a6pf9i.json",
        "suggestedSize": {"width": 350, "height": 350},
        "suggestedScenes": ["data", "info"],
    },
    {
        "name": "target",
        "category": "business",
        "tags": ["target", "goal", "bullseye", "aim", "objective", "focus"],
        "url": "https://assets4.lottiefiles.com/packages/lf20_ocgpbfx4.json",
        "suggestedSize": {"width": 350, "height": 350},
        "suggestedScenes": ["cta", "solution"],
    },
    {
        "name": "success",
        "category": "business",
        "tags": ["success", "celebration", "win", "achievement", "trophy"],
        "url": "https://assets2.lottiefiles.com/packages/lf20_touohxv0.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["cta", "hook"],
    },
    # === GENERAL ===
    {
        "name": "rocket",
        "category": "general",
        "tags": ["rocket", "launch", "startup", "speed", "progress", "boost"],
        "url": "https://assets3.lottiefiles.com/packages/lf20_kkflmtur.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["cta", "hook"],
    },
    {
        "name": "loading",
        "category": "general",
        "tags": ["loading", "spinner", "wait", "progress", "processing"],
        "url": "https://assets10.lottiefiles.com/packages/lf20_usmfx6bp.json",
        "suggestedSize": {"width": 200, "height": 200},
        "suggestedScenes": ["tech", "info"],
    },
    {
        "name": "checkmark",
        "category": "general",
        "tags": ["check", "success", "done", "complete", "confirm", "yes"],
        "url": "https://assets1.lottiefiles.com/packages/lf20_jbrw3hcz.json",
        "suggestedSize": {"width": 200, "height": 200},
        "suggestedScenes": ["cta", "info"],
    },
    {
        "name": "notification",
        "category": "general",
        "tags": ["notification", "alert", "bell", "message", "warning"],
        "url": "https://assets9.lottiefiles.com/packages/lf20_mdxzsxcd.json",
        "suggestedSize": {"width": 300, "height": 300},
        "suggestedScenes": ["problem", "hook"],
    },
    {
        "name": "search",
        "category": "general",
        "tags": ["search", "magnify", "find", "explore", "discover"],
        "url": "https://assets4.lottiefiles.com/packages/lf20_vPnn3K.json",
        "suggestedSize": {"width": 300, "height": 300},
        "suggestedScenes": ["hook", "info"],
    },
    {
        "name": "globe",
        "category": "general",
        "tags": ["globe", "world", "earth", "global", "international"],
        "url": "https://assets8.lottiefiles.com/packages/lf20_bknfnqga.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["hook", "solution"],
    },
    {
        "name": "lightbulb",
        "category": "general",
        "tags": ["lightbulb", "idea", "insight", "innovation", "eureka"],
        "url": "https://assets5.lottiefiles.com/packages/lf20_n1pjlvdo.json",
        "suggestedSize": {"width": 350, "height": 350},
        "suggestedScenes": ["hook", "solution"],
    },
    {
        "name": "clock",
        "category": "general",
        "tags": ["clock", "time", "speed", "deadline", "timer", "fast"],
        "url": "https://assets2.lottiefiles.com/packages/lf20_rqcjx8ig.json",
        "suggestedSize": {"width": 300, "height": 300},
        "suggestedScenes": ["problem", "data"],
    },
    {
        "name": "star",
        "category": "general",
        "tags": ["star", "rating", "favorite", "highlight", "premium"],
        "url": "https://assets6.lottiefiles.com/packages/lf20_1pxqjqps.json",
        "suggestedSize": {"width": 200, "height": 200},
        "suggestedScenes": ["cta", "info"],
    },
    # === ABSTRACT ===
    {
        "name": "particles",
        "category": "abstract",
        "tags": ["particles", "dots", "flow", "ambient", "background"],
        "url": "https://assets7.lottiefiles.com/packages/lf20_fclga8fl.json",
        "suggestedSize": {"width": 600, "height": 400},
        "suggestedScenes": ["any"],
    },
    {
        "name": "wave",
        "category": "abstract",
        "tags": ["wave", "audio", "sound", "frequency", "rhythm"],
        "url": "https://assets3.lottiefiles.com/packages/lf20_swnrn2oy.json",
        "suggestedSize": {"width": 600, "height": 200},
        "suggestedScenes": ["hook", "transition"],
    },
    {
        "name": "gradient-orb",
        "category": "abstract",
        "tags": ["gradient", "orb", "blob", "organic", "background"],
        "url": "https://assets1.lottiefiles.com/packages/lf20_bq045hmx.json",
        "suggestedSize": {"width": 500, "height": 500},
        "suggestedScenes": ["any"],
    },
    {
        "name": "geometric",
        "category": "abstract",
        "tags": ["geometric", "shapes", "pattern", "abstract", "modern"],
        "url": "https://assets10.lottiefiles.com/packages/lf20_UJlvc92x0D.json",
        "suggestedSize": {"width": 400, "height": 400},
        "suggestedScenes": ["any"],
    },
]


def download_asset(asset):
    """Download a single Lottie JSON file."""
    category = asset["category"]
    name = asset["name"]
    out_path = os.path.join(LOTTIE_DIR, category, f"{name}.json")

    if os.path.exists(out_path) and os.path.getsize(out_path) > 100:
        print(f"  [skip] {category}/{name}.json already exists")
        return True

    urls_to_try = [asset["url"]]
    if "fallback_url" in asset:
        urls_to_try.append(asset["fallback_url"])

    for url in urls_to_try:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                data = resp.read()
                # Validate it's JSON
                json.loads(data)
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "wb") as f:
                    f.write(data)
                size_kb = len(data) / 1024
                print(f"  [ok]   {category}/{name}.json ({size_kb:.1f} KB)")
                return True
        except Exception as e:
            print(f"  [warn] {url} failed: {e}")
            continue

    return False


def create_placeholder(asset):
    """Create a minimal valid Lottie placeholder for assets that couldn't be downloaded."""
    category = asset["category"]
    name = asset["name"]
    out_path = os.path.join(LOTTIE_DIR, category, f"{name}.json")

    placeholder = {
        "v": "5.7.4",
        "fr": 30,
        "ip": 0,
        "op": 60,
        "w": asset["suggestedSize"]["width"],
        "h": asset["suggestedSize"]["height"],
        "nm": name,
        "ddd": 0,
        "assets": [],
        "layers": [
            {
                "ddd": 0,
                "ind": 1,
                "ty": 4,
                "nm": "Circle",
                "sr": 1,
                "ks": {
                    "o": {"a": 1, "k": [
                        {"t": 0, "s": [0], "e": [100]},
                        {"t": 30, "s": [100], "e": [100]},
                        {"t": 50, "s": [100], "e": [0]},
                        {"t": 60, "s": [0]}
                    ]},
                    "r": {"a": 0, "k": 0},
                    "p": {"a": 0, "k": [
                        asset["suggestedSize"]["width"] / 2,
                        asset["suggestedSize"]["height"] / 2,
                        0
                    ]},
                    "a": {"a": 0, "k": [0, 0, 0]},
                    "s": {"a": 1, "k": [
                        {"t": 0, "s": [0, 0, 100], "e": [100, 100, 100]},
                        {"t": 20, "s": [100, 100, 100]}
                    ]},
                },
                "ao": 0,
                "shapes": [
                    {
                        "ty": "el",
                        "d": 1,
                        "s": {"a": 0, "k": [80, 80]},
                        "p": {"a": 0, "k": [0, 0]},
                        "nm": "Ellipse",
                    },
                    {
                        "ty": "fl",
                        "c": {"a": 0, "k": [0.231, 0.510, 0.965, 1]},
                        "o": {"a": 0, "k": 100},
                        "nm": "Fill",
                    },
                ],
                "ip": 0,
                "op": 60,
                "st": 0,
            }
        ],
    }

    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w") as f:
        json.dump(placeholder, f, separators=(",", ":"))
    print(f"  [placeholder] {category}/{name}.json")


def build_manifest(assets):
    """Build manifest.json from asset definitions."""
    manifest = []
    for asset in assets:
        category = asset["category"]
        name = asset["name"]
        file_path = f"lottie/{category}/{name}.json"
        full_path = os.path.join(LOTTIE_DIR, category, f"{name}.json")

        size_kb = 0
        if os.path.exists(full_path):
            size_kb = round(os.path.getsize(full_path) / 1024, 1)

        manifest.append({
            "name": name,
            "category": category,
            "tags": asset["tags"],
            "file": file_path,
            "sizeKB": size_kb,
            "suggestedSize": asset["suggestedSize"],
            "suggestedScenes": asset["suggestedScenes"],
        })

    manifest_path = os.path.join(LOTTIE_DIR, "manifest.json")
    with open(manifest_path, "w") as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)
    print(f"\nWrote {manifest_path} ({len(manifest)} assets)")


def main():
    print(f"Downloading {len(ASSETS)} Lottie assets to {LOTTIE_DIR}/\n")

    success = 0
    placeholders = 0

    for asset in ASSETS:
        ok = download_asset(asset)
        if ok:
            success += 1
        else:
            create_placeholder(asset)
            placeholders += 1

    build_manifest(ASSETS)

    print(f"\nDone: {success} downloaded, {placeholders} placeholders")
    if placeholders > 0:
        print("Replace placeholders by downloading real Lottie JSON files from https://lottiefiles.com/free-animations")


if __name__ == "__main__":
    main()
