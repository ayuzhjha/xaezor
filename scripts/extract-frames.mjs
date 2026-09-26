/**
 * extract-frames.mjs — Extract frames from bgvdeo.mp4 using ffmpeg-static.
 *
 * Usage: node scripts/extract-frames.mjs
 *
 * Outputs: src/assets/frames/frame_001.webp ... frame_NNN.webp
 * at 10fps, 1280px wide, for scroll-scrubbed playback.
 */
import { execSync } from 'child_process';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const INPUT = resolve(projectRoot, 'src/assets/video/bgvdeo.mp4');
const OUTPUT_DIR = resolve(projectRoot, 'src/assets/frames');
const FPS = 10;       // frames per second to extract
const WIDTH = 1280;   // output width (height auto)
const FORMAT = 'webp'; // output format

// Get ffmpeg binary path from ffmpeg-static
let ffmpegPath;
try {
  const mod = await import('ffmpeg-static');
  ffmpegPath = mod.default;
} catch {
  console.error('ffmpeg-static not installed. Run: npm install --save-dev ffmpeg-static');
  process.exit(1);
}

if (!existsSync(INPUT)) {
  console.error(`Input video not found: ${INPUT}`);
  process.exit(1);
}

// Ensure output directory exists and is clean
if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log(`Extracting frames from: ${INPUT}`);
console.log(`Output directory: ${OUTPUT_DIR}`);
console.log(`Settings: ${FPS}fps, ${WIDTH}px wide, ${FORMAT} format`);
console.log('');

const cmd = [
  `"${ffmpegPath}"`,
  `-i "${INPUT}"`,
  `-vf "fps=${FPS},scale=${WIDTH}:-1"`,
  `-q:v 80`,           // webp quality
  `"${resolve(OUTPUT_DIR, `frame_%03d.${FORMAT}`)}"`,
  '-y',                // overwrite
].join(' ');

console.log(`Running: ${cmd}`);
console.log('');

try {
  execSync(cmd, { stdio: 'inherit', cwd: projectRoot });
} catch (err) {
  console.error('Frame extraction failed:', err.message);
  process.exit(1);
}

const frames = readdirSync(OUTPUT_DIR).filter(f => f.endsWith(`.${FORMAT}`));
console.log(`\n✅ Done! Extracted ${frames.length} frames.`);
console.log(`First: ${frames[0]}, Last: ${frames[frames.length - 1]}`);
