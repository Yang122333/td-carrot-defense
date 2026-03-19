/**
 * Stable Horde 图像生成脚本
 * 完全免费，无需 API key（匿名用 0000000000）
 *
 * 用法：
 *   node horde-generate.mjs "prompt text" output.png [--width 512] [--height 512] [--model stable_diffusion]
 */

import { createRequire } from 'module';
import { writeFile, readFile } from 'fs/promises';
import { join, resolve } from 'path';

const require = createRequire('/opt/homebrew/lib/node_modules/openclaw/');
const sharp = require('sharp');

const HORDE_URL = 'https://stablehorde.net/api/v2';
const API_KEY = '0000000000'; // 匿名免费

// ─── 参数解析 ─────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
if (args.length < 2) {
  console.error('用法: node horde-generate.mjs "prompt" output.png [--width N] [--height N] [--model NAME] [--negative "..."] [--steps N]');
  process.exit(1);
}

const prompt = args[0];
const outputPath = args[1];

let width = 512, height = 512, steps = 25, negative = 'blurry, low quality, ugly, deformed, text, watermark';
let model = 'Deliberate';

for (let i = 2; i < args.length; i++) {
  if (args[i] === '--width')    width    = parseInt(args[++i]);
  if (args[i] === '--height')   height   = parseInt(args[++i]);
  if (args[i] === '--steps')    steps    = parseInt(args[++i]);
  if (args[i] === '--model')    model    = args[++i];
  if (args[i] === '--negative') negative = args[++i];
}

// Stable Horde 要求尺寸为 64 的倍数
const snapTo64 = n => Math.round(n / 64) * 64 || 64;
const reqW = snapTo64(width);
const reqH = snapTo64(height);

// ─── 提交任务 ─────────────────────────────────────────────────────────────────
console.log(`Model: ${model}`);
console.log(`Prompt: ${prompt}`);
console.log(`Output: ${outputPath} (${width}x${height})`);

const submitResp = await fetch(`${HORDE_URL}/generate/async`, {
  method: 'POST',
  headers: { 'apikey': API_KEY, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    prompt: `${prompt} ### ${negative}`,
    params: {
      width: reqW,
      height: reqH,
      steps,
      n: 1,
      sampler_name: 'k_euler_a',
      cfg_scale: 7.5,
      karras: true,
    },
    models: [model],
    nsfw: false,
    censor_nsfw: false,
    slow_workers: true,  // 允许慢速 worker，提高成功率
    shared: false,
  }),
});

if (!submitResp.ok) {
  const err = await submitResp.text();
  console.error(`❌ 提交失败 (${submitResp.status}): ${err}`);
  process.exit(1);
}

const { id: jobId } = await submitResp.json();
console.log(`Job ID: ${jobId}`);

// ─── 轮询状态 ─────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));
let done = false;
let attempts = 0;

while (!done && attempts < 60) {
  await sleep(5000);
  attempts++;

  const checkResp = await fetch(`${HORDE_URL}/generate/check/${jobId}`);
  const check = await checkResp.json();

  process.stdout.write(`\r等待中... 队列位置: ${check.queue_position ?? '?'} | 预计剩余: ${check.wait_time ?? '?'}s  `);

  if (check.done) {
    done = true;
    process.stdout.write('\n');
  }

  if (check.faulted) {
    console.error('\n❌ 任务出错 (faulted)');
    process.exit(1);
  }
}

if (!done) {
  console.error('\n❌ 超时：任务未在 5 分钟内完成');
  process.exit(1);
}

// ─── 获取结果 ─────────────────────────────────────────────────────────────────
const statusResp = await fetch(`${HORDE_URL}/generate/status/${jobId}`);
const status = await statusResp.json();
const gen = status.generations?.[0];

if (!gen) {
  console.error('❌ 无生成结果');
  process.exit(1);
}

// 下载图像（返回 webp URL）
const imgResp = await fetch(gen.img);
if (!imgResp.ok) {
  console.error(`❌ 下载图像失败: ${imgResp.status}`);
  process.exit(1);
}

const imgBuf = Buffer.from(await imgResp.arrayBuffer());

// 转换为 PNG，缩放到目标尺寸
await sharp(imgBuf)
  .resize(width, height, { fit: 'fill' })
  .png()
  .toFile(outputPath);

const { size } = await import('fs').then(m => m.promises.stat(outputPath));
console.log(`✅ Saved: ${outputPath} (${Math.round(size / 1024)}KB)`);
