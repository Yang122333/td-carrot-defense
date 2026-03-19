#!/usr/bin/env node
// HuggingFace Inference API 图像生成脚本
// 用法: node hf-generate-image.mjs "prompt" output.png [--model MODEL] [--negative "neg prompt"] [--width 512] [--height 512]

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const HF_TOKEN = readFileSync(resolve(import.meta.dirname, '../credentials/hf-token.txt'), 'utf-8').trim()
  || process.env.HF_TOKEN;

if (!HF_TOKEN) { console.error('No HF token found'); process.exit(1); }

// Parse args
const args = process.argv.slice(2);
let prompt = '', output = '', model = 'black-forest-labs/FLUX.1-schnell';
let negative = '', width = 512, height = 512;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--model') { model = args[++i]; continue; }
  if (args[i] === '--negative') { negative = args[++i]; continue; }
  if (args[i] === '--width') { width = parseInt(args[++i]); continue; }
  if (args[i] === '--height') { height = parseInt(args[++i]); continue; }
  if (!prompt) { prompt = args[i]; continue; }
  if (!output) { output = args[i]; continue; }
}

if (!prompt || !output) {
  console.error('Usage: node hf-generate-image.mjs "prompt" output.png [--model MODEL] [--negative "..."] [--width N] [--height N]');
  process.exit(1);
}

console.log(`Model: ${model}`);
console.log(`Prompt: ${prompt}`);
console.log(`Output: ${output} (${width}x${height})`);

const body = { inputs: prompt, parameters: { width, height } };
if (negative) body.parameters.negative_prompt = negative;

const res = await fetch(`https://router.huggingface.co/hf-inference/models/${model}`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${HF_TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(body),
});

if (!res.ok) {
  const err = await res.text();
  console.error(`API error ${res.status}: ${err}`);
  process.exit(1);
}

const buf = Buffer.from(await res.arrayBuffer());
writeFileSync(output, buf);
console.log(`✅ Saved: ${output} (${buf.length} bytes)`);
