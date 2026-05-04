# Public assets

## Scroll-scrub video

Drop a short loop here as `scrub.mp4` and a still frame as `scrub-poster.jpg`.

The `<ScrollScrubVideo>` section maps scroll progress through a 300vh container to `video.currentTime`, so the video scrubs as the user scrolls. Apple does this with frame sequences; we use a single MP4 with a smoothed `requestAnimationFrame` lerp.

### Recommended specs

- 4 to 8 seconds long
- 1920x1080 or 1280x720
- H.264 MP4, faststart enabled, under 6 MB
- No audio (the section mutes anyway)

### Encoding example

```bash
ffmpeg -i source.mov \
  -movflags +faststart \
  -vcodec libx264 -crf 23 -preset slow \
  -pix_fmt yuv420p \
  -an \
  scrub.mp4

ffmpeg -i scrub.mp4 -vframes 1 -f image2 scrub-poster.jpg
```

### Notes

- Safari is more reliable scrubbing MP4 than WebM, so MP4 first.
- Keep the file small. Larger files stutter on slower connections.
- For a buttery Apple-style scrub, a frame sequence (300+ JPEGs) preloaded into an offscreen canvas is the gold standard, but a single MP4 covers 90% of the effect at 5% of the engineering cost.
