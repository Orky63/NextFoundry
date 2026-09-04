#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT_DIR="$ROOT_DIR/assets/social"
OUT_FILE="$OUT_DIR/nextfoundry-linkedin-promo.mp4"
WEB_OUT_FILE="$ROOT_DIR/apps/web/public/videos/nextfoundry-linkedin-promo.mp4"
TMP_DIR="${TMPDIR:-/tmp}/nextfoundry-linkedin-render"

mkdir -p "$OUT_DIR" "$TMP_DIR"
rm -f "$TMP_DIR"/scene-*.svg "$TMP_DIR"/scene-*.svg.png

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ffmpeg is required to render the video. Install it with: brew install ffmpeg" >&2
  exit 1
fi

if ! command -v qlmanage >/dev/null 2>&1; then
  echo "qlmanage is required to rasterize the SVG scene cards on macOS." >&2
  exit 1
fi

image_data_uri() {
  local image_path="$1"
  printf 'data:image/jpeg;base64,%s' "$(base64 -i "$image_path" | tr -d '\n')"
}

write_scene() {
  local file="$1"
  local image_path="$2"
  local headline_one="$3"
  local headline_two="$4"
  local kicker_one="$5"
  local kicker_two="$6"
  local image_uri
  image_uri="$(image_data_uri "$image_path")"

  cat > "$file" <<SVG
<svg width="1080" height="1080" viewBox="0 0 1080 1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="frame"><rect width="1080" height="1080"/></clipPath>
    <linearGradient id="ember" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#ffb15f"/>
      <stop offset="0.55" stop-color="#ff7a2f"/>
      <stop offset="1" stop-color="#ffce73"/>
    </linearGradient>
    <radialGradient id="warmGlow" cx="0.14" cy="0.16" r="0.82">
      <stop offset="0" stop-color="#ff8a3d" stop-opacity="0.32"/>
      <stop offset="0.42" stop-color="#352019" stop-opacity="0.2"/>
      <stop offset="1" stop-color="#080504" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <g clip-path="url(#frame)">
    <image href="$image_uri" width="1620" height="1080" x="-270" y="0" preserveAspectRatio="xMidYMid slice"/>
    <rect width="1080" height="1080" fill="#160f0b" opacity="0.62"/>
    <rect width="1080" height="1080" fill="url(#warmGlow)"/>
    <g opacity="0.14" stroke="#f8f2ec" stroke-width="1">
      <path d="M0 180H1080M0 360H1080M0 540H1080M0 720H1080M0 900H1080"/>
      <path d="M180 0V1080M360 0V1080M540 0V1080M720 0V1080M900 0V1080"/>
    </g>

    <rect x="78" y="84" width="64" height="64" rx="9" fill="#ff8a3d" opacity="0.95"/>
    <path d="M110 98C110 98 93 119 93 137C93 149 101 158 110 158C119 158 127 149 127 137C127 119 110 98 110 98Z" fill="#1c100b" opacity="0.92"/>
    <text x="162" y="133" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="#f8f2ec">Next</text>
    <text x="275" y="133" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="700" fill="url(#ember)">Foundry</text>

    <text x="78" y="366" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="#f8f2ec">$headline_one</text>
    <text x="78" y="456" font-family="Arial, Helvetica, sans-serif" font-size="72" font-weight="700" fill="url(#ember)">$headline_two</text>
    <text x="80" y="598" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="400" fill="#ded4cc">$kicker_one</text>
    <text x="80" y="646" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="400" fill="#ded4cc">$kicker_two</text>

    <text x="78" y="812" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="400" fill="#f8f2ec">Free Business &amp; Technology Review</text>
    <text x="78" y="875" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700" fill="url(#ember)">nextfoundry.co.uk</text>
    <rect x="78" y="932" width="924" height="3" fill="#ff8a3d" opacity="0.94"/>
    <text x="78" y="970" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="400" fill="#d8ccc2">Practical AI, cloud and digital process improvement</text>
  </g>
</svg>
SVG
}

write_scene "$TMP_DIR/scene-01.svg" "$ROOT_DIR/apps/web/public/images/team-collab.jpg" "Growing business." "Too much manual work?" "Systems, spreadsheets and workarounds" "quietly slow teams down."
write_scene "$TMP_DIR/scene-02.svg" "$ROOT_DIR/apps/web/public/images/innovation.jpg" "AI and automation" "with business-first advice" "Start with how the business works," "then choose the right technology."
write_scene "$TMP_DIR/scene-03.svg" "$ROOT_DIR/apps/web/public/images/dashboard.jpg" "Find improvements" "before buying more tech" "Clear recommendations your team can act on" "with confidence."

qlmanage -t -s 1080 -o "$TMP_DIR" "$TMP_DIR/scene-01.svg" "$TMP_DIR/scene-02.svg" "$TMP_DIR/scene-03.svg" >/dev/null

ffmpeg -y \
  -loop 1 -t 5.3 -i "$TMP_DIR/scene-01.svg.png" \
  -loop 1 -t 5.3 -i "$TMP_DIR/scene-02.svg.png" \
  -loop 1 -t 5.3 -i "$TMP_DIR/scene-03.svg.png" \
  -filter_complex "\
[0:v]scale=1080:1080,zoompan=z='min(zoom+0.00025,1.035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=159:s=1080x1080:fps=30,setsar=1[v0];\
[1:v]scale=1080:1080,zoompan=z='min(zoom+0.00025,1.035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=159:s=1080x1080:fps=30,setsar=1[v1];\
[2:v]scale=1080:1080,zoompan=z='min(zoom+0.00025,1.035)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=159:s=1080x1080:fps=30,setsar=1[v2];\
[v0][v1]xfade=transition=fade:duration=0.45:offset=4.85[x01];\
[x01][v2]xfade=transition=fade:duration=0.45:offset=9.7,format=yuv420p[v]" \
  -map "[v]" \
  -an \
  -r 30 \
  -t 15 \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -movflags +faststart \
  "$OUT_FILE"

mkdir -p "$(dirname "$WEB_OUT_FILE")"
cp "$OUT_FILE" "$WEB_OUT_FILE"

echo "Rendered $OUT_FILE"
echo "Copied $WEB_OUT_FILE"
