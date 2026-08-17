import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const publicDir = join(root, 'public');
const videosDir = join(publicDir, 'videos');
const imagesDir = join(publicDir, 'images');
const sourceMp4 = join(videosDir, 'hero-bg.mp4');

function resolveFfmpeg() {
  try {
    return require('@ffmpeg-installer/ffmpeg').path;
  } catch {
    return 'ffmpeg';
  }
}

function runFfmpeg(ffmpeg, args) {
  const result = spawnSync(ffmpeg, args, { stdio: 'inherit', shell: false });
  return result.status === 0;
}

function main() {
  if (!existsSync(sourceMp4)) {
    console.warn('[optimize-hero-media] hero-bg.mp4 not found, skipping.');
    return;
  }

  const ffmpeg = resolveFfmpeg();
  console.log(`[optimize-hero-media] Using ffmpeg: ${ffmpeg}`);
  const probe = spawnSync(ffmpeg, ['-version'], { stdio: 'ignore' });
  if (probe.status !== 0) {
    console.warn('[optimize-hero-media] ffmpeg unavailable; keep existing video files.');
    return;
  }

  const jobs = [
    {
      out: join(videosDir, 'hero-bg-lite.mp4'),
      args: ['-y', '-i', sourceMp4, '-an', '-vf', 'scale=1280:-2', '-r', '24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-movflags', '+faststart'],
    },
    {
      out: join(videosDir, 'hero-bg-mobile.mp4'),
      args: ['-y', '-i', sourceMp4, '-an', '-vf', 'scale=854:-2', '-r', '24', '-c:v', 'libx264', '-preset', 'slow', '-crf', '28', '-movflags', '+faststart'],
    },
    {
      out: join(videosDir, 'hero-bg.webm'),
      args: ['-y', '-i', sourceMp4, '-an', '-vf', 'scale=1280:-2', '-r', '24', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '34', '-row-mt', '1'],
    },
    {
      out: join(videosDir, 'hero-bg-mobile.webm'),
      args: ['-y', '-i', sourceMp4, '-an', '-vf', 'scale=854:-2', '-r', '24', '-c:v', 'libvpx-vp9', '-b:v', '0', '-crf', '36', '-row-mt', '1'],
    },
  ];

  for (const job of jobs) {
    console.log(`[optimize-hero-media] Writing ${job.out}`);
    if (!runFfmpeg(ffmpeg, [...job.args, job.out])) {
      console.warn(`[optimize-hero-media] Failed: ${job.out}`);
    }
  }

  const posters = [
    [join(imagesDir, 'hero-poster.webp'), 1280],
    [join(imagesDir, 'hero-poster-mobile.webp'), 854],
  ];

  for (const [out, scale] of posters) {
    console.log(`[optimize-hero-media] Writing ${out}`);
    runFfmpeg(ffmpeg, [
      '-y',
      '-ss',
      '00:00:01',
      '-i',
      sourceMp4,
      '-frames:v',
      '1',
      '-vf',
      `scale=${scale}:-2`,
      '-c:v',
      'libwebp',
      '-quality',
      '78',
      out,
    ]);
  }
}

main();
