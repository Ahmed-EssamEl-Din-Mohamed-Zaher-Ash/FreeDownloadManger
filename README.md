# FreeDownloadManger (IDM Clone)

A full-featured Internet Download Manager clone desktop application built with Python 3.11+, PyQt6, and async networking.

## Features

- **Multi-threaded segmented downloads** (1-16 segments; default 8)
- **Pause/Resume with disk-backed state** (`~/.idm_clone/state/*.json`)
- **Queue manager** with priority and configurable max concurrency
- **Browser integration** via WebSocket bridge at `ws://127.0.0.1:6800`
- **Video grabber** powered by `yt-dlp`
- **Global & per-download speed limiting** using token buckets
- **Scheduler hooks** to move tasks between scheduled and queued states
- **Automatic file categorization** into `video`, `audio`, `documents`, `compressed`, and `others`
- **Persistent history/metadata** in SQLite (`~/.idm_clone/downloads.db`) using SQLAlchemy

## Project Structure

```text
idm_clone/
  api/
    browser_bridge.py         # Localhost WebSocket API for browser extensions
  core/
    categorizer.py            # Extension -> category folder routing
    downloader.py             # Segmented async downloader with resume
    queue_manager.py          # Priority queue + concurrency control
    scheduler.py              # Start/stop scheduling loop
    speed_limiter.py          # Token bucket limiter
    state_store.py            # On-disk download segment state
    types.py                  # Domain dataclasses/enums
  gui/
    main_window.py            # PyQt6 dark-themed desktop UI
  integrations/
    video_grabber.py          # yt-dlp wrapper
  models/
    database.py               # SQLAlchemy models + DB bootstrap
    repository.py             # Download history read/write helpers
  main.py                     # App entry point
extension/
  chrome/                     # Manifest V3 extension
  firefox/                    # Firefox extension
tests/
  test_categorizer.py
```

## Installation

```bash
python -m venv .venv
source .venv/bin/activate
pip install -e .
```

## Running the App

```bash
idm-clone
```

## Browser Extension Setup

### Chrome (Manifest V3)
1. Open `chrome://extensions`
2. Enable **Developer mode**
3. Click **Load unpacked** and select `extension/chrome`

### Firefox
1. Open `about:debugging#/runtime/this-firefox`
2. Click **Load Temporary Add-on**
3. Select `extension/firefox/manifest.json`

## How resume works

- Download state is checkpointed during segmented transfer.
- Each segment writes to a separate `.partN` file.
- On restart/resume, previous segment offsets are restored from the JSON state file.
- After completion, segments are merged and state is removed.

## Notes

- `yt-dlp` must be available in `$PATH` for video grabbing.
- The scheduler currently toggles status based on UTC timestamps and is prepared for advanced UI scheduling controls.
