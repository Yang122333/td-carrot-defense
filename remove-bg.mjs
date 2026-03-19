// Flood-fill based white background removal
// Start from corners/edges, fill outward to remove connected white regions
import { createRequire } from 'module';
const require = createRequire('/opt/homebrew/lib/node_modules/openclaw/');
const sharp = require('sharp');
import { readdir, mkdir } from 'fs/promises';
import { join } from 'path';

const SRC = './td-assets-v3';
const OUT = './td-assets-v3-clean';

await mkdir(OUT, { recursive: true });

function isWhitish(r, g, b, threshold = 230) {
  return r > threshold && g > threshold && b > threshold;
}

function floodFillRemoveBg(pixels, width, height) {
  const visited = new Uint8Array(width * height);
  const queue = [];
  const THRESHOLD = 220;
  const SOFT_THRESHOLD = 200;
  
  // Seed from all edge pixels that are white-ish
  for (let x = 0; x < width; x++) {
    for (const y of [0, height - 1]) {
      const idx = (y * width + x) * 4;
      if (isWhitish(pixels[idx], pixels[idx+1], pixels[idx+2], THRESHOLD)) {
        queue.push(x + y * width);
        visited[x + y * width] = 1;
      }
    }
  }
  for (let y = 0; y < height; y++) {
    for (const x of [0, width - 1]) {
      const pos = x + y * width;
      if (!visited[pos]) {
        const idx = pos * 4;
        if (isWhitish(pixels[idx], pixels[idx+1], pixels[idx+2], THRESHOLD)) {
          queue.push(pos);
          visited[pos] = 1;
        }
      }
    }
  }
  
  // BFS flood fill
  const dirs = [-1, 1, -width, width, -width-1, -width+1, width-1, width+1];
  let head = 0;
  while (head < queue.length) {
    const pos = queue[head++];
    const x = pos % width, y = Math.floor(pos / width);
    const idx = pos * 4;
    
    // Make transparent
    pixels[idx + 3] = 0;
    
    // Expand to neighbors
    for (const d of dirs) {
      const np = pos + d;
      const nx = np % width, ny = Math.floor(np / width);
      if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
      if (visited[np]) continue;
      
      const ni = np * 4;
      const r = pixels[ni], g = pixels[ni+1], b = pixels[ni+2];
      
      if (isWhitish(r, g, b, THRESHOLD)) {
        visited[np] = 1;
        queue.push(np);
      }
    }
  }
  
  // Second pass: soften edges - partially transparent for near-white pixels adjacent to transparent ones
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const pos = y * width + x;
      const idx = pos * 4;
      if (pixels[idx + 3] === 0) continue; // already transparent
      
      const r = pixels[idx], g = pixels[idx+1], b = pixels[idx+2];
      const lum = (r + g + b) / 3;
      
      if (lum < SOFT_THRESHOLD) continue; // not whitish, skip
      
      // Check if any neighbor is transparent (edge of subject)
      let hasTransparentNeighbor = false;
      for (const d of [-1, 1, -width, width]) {
        const np = pos + d;
        if (np >= 0 && np < width * height && pixels[np * 4 + 3] === 0) {
          hasTransparentNeighbor = true;
          break;
        }
      }
      
      if (hasTransparentNeighbor && lum > SOFT_THRESHOLD) {
        // Feather: fade based on luminance
        const t = (lum - SOFT_THRESHOLD) / (255 - SOFT_THRESHOLD);
        pixels[idx + 3] = Math.floor((1 - t) * 255);
      }
    }
  }
  
  // Third pass: propagate edge feathering (2 more pixel radius)
  for (let pass = 0; pass < 2; pass++) {
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pos = y * width + x;
        const idx = pos * 4;
        if (pixels[idx + 3] === 0 || pixels[idx + 3] === 255) continue;
        
        // This is a semi-transparent edge pixel; check neighbors
        for (const d of [-1, 1, -width, width]) {
          const np = pos + d;
          const ni = np * 4;
          if (np < 0 || np >= width * height) continue;
          if (pixels[ni + 3] !== 255) continue;
          
          const r = pixels[ni], g = pixels[ni+1], b = pixels[ni+2];
          const lum = (r + g + b) / 3;
          if (lum > 230) {
            const t = (lum - 230) / (255 - 230);
            const newAlpha = Math.floor((1 - t * 0.5) * 255);
            pixels[ni + 3] = Math.min(pixels[ni + 3], newAlpha);
          }
        }
      }
    }
  }
}

const files = (await readdir(SRC)).filter(f => f.endsWith('.png'));
console.log(`Processing ${files.length} files with flood-fill...`);

for (const file of files) {
  const src = join(SRC, file);
  const dst = join(OUT, file);
  
  try {
    const img = sharp(src);
    const { width, height } = await img.metadata();
    const raw = await img.ensureAlpha().raw().toBuffer();
    const pixels = Buffer.from(raw);
    
    floodFillRemoveBg(pixels, width, height);
    
    // Also trim the transparent border to reduce file size
    await sharp(pixels, { raw: { width, height, channels: 4 } })
      .png({ compressionLevel: 9 })
      .trim()  
      .toFile(dst);
    
    console.log(`✅ ${file}`);
  } catch (e) {
    console.error(`❌ ${file}: ${e.message}`);
  }
}

console.log('Done!');
