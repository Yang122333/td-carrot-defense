/**
 * UI Assets Generator — 《萝卜保卫战》
 * 用 SVG + Sharp 程序化生成所有 UI 素材
 * 风格：《保卫萝卜》糖果风 — 渐变光泽 + 圆角 + 描边 + 阴影
 */

import { createRequire } from 'module';
import { writeFile } from 'fs/promises';
import { join } from 'path';

const require = createRequire('/opt/homebrew/lib/node_modules/openclaw/');
const sharp = require('sharp');

const OUT = './td-assets-v3';

// ─── SVG helper ──────────────────────────────────────────────────────────────

async function saveSVG(filename, svgStr, targetW, targetH) {
  const buf = Buffer.from(svgStr);
  await sharp(buf)
    .resize(targetW, targetH, { fit: 'fill' })
    .png()
    .toFile(join(OUT, filename));
  console.log(`✅  ${filename} (${targetW}x${targetH})`);
}

// ─── BUTTONS ─────────────────────────────────────────────────────────────────

/**
 * 糖果风圆角按钮
 * @param {object} opts
 */
function candyButton({ w = 512, h = 200, r = 80,
  topColor, midColor, botColor,
  strokeColor, strokeW = 12,
  shadowColor = 'rgba(0,0,0,0.35)',
  highlightOpacity = 0.55,
  label = '', labelSize = 90, labelColor = '#fff',
  icon = '' }) {

  const gradH = h * 0.55; // 高光覆盖上半部分
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <!-- 主体渐变：上亮下暗 -->
    <linearGradient id="btnGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="${topColor}"/>
      <stop offset="50%"  stop-color="${midColor}"/>
      <stop offset="100%" stop-color="${botColor}"/>
    </linearGradient>
    <!-- 高光渐变 -->
    <linearGradient id="hlGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="white" stop-opacity="${highlightOpacity}"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
    <!-- 底部阴影 filter -->
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="${shadowColor}"/>
    </filter>
    <!-- 描边的圆角矩形裁剪 -->
    <clipPath id="btnClip">
      <rect x="${strokeW/2}" y="${strokeW/2}"
            width="${w - strokeW}" height="${h - strokeW}"
            rx="${r}" ry="${r}"/>
    </clipPath>
  </defs>

  <!-- 阴影层 -->
  <rect x="${strokeW/2}" y="${strokeW/2 + 6}"
        width="${w - strokeW}" height="${h - strokeW}"
        rx="${r}" ry="${r}"
        fill="${shadowColor}" filter="url(#shadow)"/>

  <!-- 描边 -->
  <rect x="${strokeW/2}" y="${strokeW/2}"
        width="${w - strokeW}" height="${h - strokeW}"
        rx="${r}" ry="${r}"
        fill="url(#btnGrad)"
        stroke="${strokeColor}" stroke-width="${strokeW}"/>

  <!-- 高光玻璃层（上半） -->
  <rect x="${strokeW}" y="${strokeW}"
        width="${w - strokeW*2}" height="${gradH}"
        rx="${r * 0.7}" ry="${r * 0.7}"
        fill="url(#hlGrad)"
        clip-path="url(#btnClip)"/>

  ${icon}

  <!-- 文字 -->
  ${label ? `<text x="${w/2}" y="${h/2 + labelSize*0.38}"
        font-family="'PingFang SC', 'Microsoft YaHei', sans-serif"
        font-size="${labelSize}" font-weight="900"
        fill="${labelColor}"
        text-anchor="middle"
        paint-order="stroke"
        stroke="#00000055" stroke-width="6">${label}</text>` : ''}
</svg>`;
}

/**
 * 圆形图标（金币/爱心底座）
 */
function circleIcon({ w = 512, h = 512, r = 230,
  topColor, botColor, strokeColor, strokeW = 16,
  inner = '' }) {
  const cx = w / 2, cy = h / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
  <defs>
    <radialGradient id="circGrad" cx="38%" cy="32%" r="65%">
      <stop offset="0%"   stop-color="${topColor}"/>
      <stop offset="100%" stop-color="${botColor}"/>
    </radialGradient>
    <radialGradient id="hlCirc" cx="35%" cy="25%" r="50%">
      <stop offset="0%"   stop-color="white" stop-opacity="0.7"/>
      <stop offset="60%"  stop-color="white" stop-opacity="0"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="rgba(0,0,0,0.4)"/>
    </filter>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="${r + strokeW}"
          fill="${strokeColor}" filter="url(#shadow)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}"
          fill="url(#circGrad)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}"
          fill="url(#hlCirc)"/>
  ${inner}
</svg>`;
}

// ─── ASSET DEFINITIONS ───────────────────────────────────────────────────────

async function genBtnStart() {
  const svg = candyButton({
    w: 512, h: 180, r: 70,
    topColor: '#6EE060', midColor: '#3CB828', botColor: '#1F8010',
    strokeColor: '#156B09', strokeW: 14,
    label: '开始游戏', labelSize: 88, labelColor: '#FFFDE0',
    shadowColor: 'rgba(20,100,5,0.5)',
  });
  await saveSVG('btn-start-v2.png', svg, 192, 64);
}

async function genBtnNextwave() {
  // 橙色 + 右箭头
  const arrow = `<text x="390" y="106" font-size="80" fill="white" font-family="sans-serif" opacity="0.9">▶</text>`;
  const svg = candyButton({
    w: 512, h: 180, r: 70,
    topColor: '#FFB74D', midColor: '#F57C00', botColor: '#BF5000',
    strokeColor: '#8D3A00', strokeW: 14,
    label: '下一波', labelSize: 78, labelColor: '#FFF8E1',
    shadowColor: 'rgba(100,40,0,0.5)',
    icon: arrow,
  });
  await saveSVG('btn-nextwave-v2.png', svg, 128, 36);
}

async function genBtnUpgrade() {
  // 绿色 + 上箭头
  const arrow = `<text x="60" y="118" font-size="90" fill="rgba(255,255,255,0.8)" font-family="sans-serif">▲</text>`;
  const svg = candyButton({
    w: 512, h: 220, r: 75,
    topColor: '#81C784', midColor: '#388E3C', botColor: '#1B5E20',
    strokeColor: '#0D4010', strokeW: 14,
    label: '升级', labelSize: 88, labelColor: '#F1F8E9',
    shadowColor: 'rgba(10,60,10,0.5)',
    icon: arrow,
  });
  await saveSVG('btn-upgrade.png', svg, 64, 28);
}

async function genBtnSell() {
  // 红色 + 金币符号
  const coin = `<text x="60" y="125" font-size="90" fill="#FFD700" font-family="sans-serif">¥</text>`;
  const svg = candyButton({
    w: 512, h: 220, r: 75,
    topColor: '#EF9A9A', midColor: '#E53935', botColor: '#B71C1C',
    strokeColor: '#7F0000', strokeW: 14,
    label: '出售', labelSize: 88, labelColor: '#FFF',
    shadowColor: 'rgba(100,0,0,0.5)',
    icon: coin,
  });
  await saveSVG('btn-sell.png', svg, 64, 28);
}

async function genIconCoin() {
  const inner = `
    <!-- 金币面值 $ 符号 -->
    <text x="256" y="330" font-size="260" font-weight="900"
          font-family="Georgia, serif"
          fill="#7A4F00"
          text-anchor="middle"
          opacity="0.85">$</text>
    <!-- 内圈高光圆弧 -->
    <path d="M 140 160 A 130 130 0 0 1 370 160"
          fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="22" stroke-linecap="round"/>
  `;
  const svg = circleIcon({
    topColor: '#FFE57F', botColor: '#E6A000',
    strokeColor: '#B8860B',
    inner,
  });
  await saveSVG('icon-coin-v2.png', svg, 32, 32);
}

async function genIconHeart() {
  // 用路径画爱心
  const heart = `
    <path d="M256 380
             C256 380 100 270 100 165
             C100 110 140 80 180 80
             C210 80 240 100 256 125
             C272 100 302 80 332 80
             C372 80 412 110 412 165
             C412 270 256 380 256 380 Z"
          fill="#FF1744"/>
    <!-- 高光 -->
    <ellipse cx="195" cy="145" rx="38" ry="26"
             fill="rgba(255,255,255,0.45)" transform="rotate(-30,195,145)"/>
  `;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <defs>
    <filter id="shadow">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="rgba(150,0,0,0.5)"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <!-- 描边爱心（稍大一点） -->
    <path d="M256 396
             C256 396 88 276 88 158
             C88 98 132 66 175 66
             C210 66 242 88 256 116
             C270 88 302 66 337 66
             C380 66 424 98 424 158
             C424 276 256 396 256 396 Z"
          fill="#880000"/>
    ${heart}
  </g>
</svg>`;
  await saveSVG('icon-heart-v2.png', svg, 32, 32);
}

async function genHudBgTop() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="40">
  <defs>
    <linearGradient id="hudGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1A2A1A" stop-opacity="0.92"/>
      <stop offset="100%" stop-color="#0D1A0D" stop-opacity="0.82"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="768" height="40"
        rx="10" ry="10" fill="url(#hudGrad)"/>
  <!-- 顶部高光线 -->
  <rect x="10" y="2" width="748" height="3"
        rx="2" fill="rgba(255,255,255,0.12)"/>
</svg>`;
  await saveSVG('hud-bg-top.png', svg, 768, 40);
}

async function genHudBgBottom() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="64">
  <defs>
    <linearGradient id="hudGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1A3010" stop-opacity="0.90"/>
      <stop offset="100%" stop-color="#0A1808" stop-opacity="0.95"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="768" height="64"
        rx="12" ry="12" fill="url(#hudGrad)"/>
  <!-- 顶部高光线 -->
  <rect x="10" y="3" width="748" height="3"
        rx="2" fill="rgba(150,255,100,0.18)"/>
  <!-- 金色顶边线 -->
  <rect x="0" y="0" width="768" height="3"
        rx="1" fill="rgba(200,160,0,0.5)"/>
</svg>`;
  await saveSVG('hud-bg-bottom.png', svg, 768, 64);
}

async function genPanelWin() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400">
  <defs>
    <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#FFFDE7"/>
      <stop offset="100%" stop-color="#FFF8C5"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#FFD740"/>
      <stop offset="50%"  stop-color="#FFA000"/>
      <stop offset="100%" stop-color="#FF6F00"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="rgba(0,0,0,0.4)"/>
    </filter>
  </defs>

  <!-- 外层阴影 -->
  <rect x="20" y="20" width="560" height="360" rx="36" ry="36"
        fill="rgba(0,0,0,0.3)" filter="url(#shadow)"/>

  <!-- 金色描边 -->
  <rect x="10" y="10" width="580" height="380" rx="40" ry="40"
        fill="url(#borderGrad)"/>

  <!-- 内层面板 -->
  <rect x="22" y="22" width="556" height="356" rx="30" ry="30"
        fill="url(#panelGrad)"/>

  <!-- 顶部高光 -->
  <rect x="30" y="28" width="540" height="60" rx="22" ry="22"
        fill="rgba(255,255,255,0.5)"/>

  <!-- 星星装饰 -->
  <text x="80"  y="120" font-size="80" text-anchor="middle">⭐</text>
  <text x="300" y="90"  font-size="100" text-anchor="middle">⭐</text>
  <text x="520" y="120" font-size="80"  text-anchor="middle">⭐</text>

  <!-- 胜利文字 -->
  <text x="300" y="240"
        font-family="'PingFang SC','Microsoft YaHei',sans-serif"
        font-size="90" font-weight="900"
        fill="#E65100"
        text-anchor="middle"
        paint-order="stroke"
        stroke="#FFF176" stroke-width="8">胜利！</text>

  <!-- 底部小字 -->
  <text x="300" y="330"
        font-family="'PingFang SC','Microsoft YaHei',sans-serif"
        font-size="40" fill="#8D6E63"
        text-anchor="middle">萝卜保住了！</text>
</svg>`;
  await saveSVG('panel-win.png', svg, 300, 200);
}

async function genPanelLose() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400">
  <defs>
    <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#37474F"/>
      <stop offset="100%" stop-color="#1C2B30"/>
    </linearGradient>
    <linearGradient id="borderGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#90A4AE"/>
      <stop offset="100%" stop-color="#546E7A"/>
    </linearGradient>
    <filter id="shadow">
      <feDropShadow dx="0" dy="10" stdDeviation="18" flood-color="rgba(0,0,0,0.5)"/>
    </filter>
  </defs>

  <!-- 外层阴影 -->
  <rect x="20" y="20" width="360" height="360" rx="36" ry="36"
        fill="rgba(0,0,0,0.4)" filter="url(#shadow)"/>

  <!-- 银色描边 -->
  <rect x="10" y="10" width="380" height="380" rx="40" ry="40"
        fill="url(#borderGrad)"/>

  <!-- 内层深色面板 -->
  <rect x="22" y="22" width="356" height="356" rx="30" ry="30"
        fill="url(#panelGrad)"/>

  <!-- 顶部微光 -->
  <rect x="30" y="28" width="340" height="50" rx="22" ry="22"
        fill="rgba(255,255,255,0.07)"/>

  <!-- 失败图标 -->
  <text x="200" y="195" font-size="120" text-anchor="middle">💀</text>

  <!-- 失败文字 -->
  <text x="200" y="285"
        font-family="'PingFang SC','Microsoft YaHei',sans-serif"
        font-size="80" font-weight="900"
        fill="#EF9A9A"
        text-anchor="middle"
        paint-order="stroke"
        stroke="#B71C1C" stroke-width="6">失败</text>

  <text x="200" y="348"
        font-family="'PingFang SC','Microsoft YaHei',sans-serif"
        font-size="36" fill="#90A4AE"
        text-anchor="middle">萝卜被吃掉了...</text>
</svg>`;
  await saveSVG('panel-lose.png', svg, 200, 200);
}

async function genPanelUpgrade() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="256">
  <defs>
    <linearGradient id="panelGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#1A2810" stop-opacity="0.96"/>
      <stop offset="100%" stop-color="#0D1808" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="goldBorder" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%"   stop-color="#FFD740"/>
      <stop offset="100%" stop-color="#FF8F00"/>
    </linearGradient>
  </defs>

  <!-- 金色边框 -->
  <rect x="4" y="4" width="504" height="248" rx="36" ry="36"
        fill="url(#goldBorder)"/>

  <!-- 深色内层 -->
  <rect x="14" y="14" width="484" height="228" rx="28" ry="28"
        fill="url(#panelGrad)"/>

  <!-- 顶部微光 -->
  <rect x="22" y="18" width="468" height="36" rx="18" ry="18"
        fill="rgba(255,255,255,0.06)"/>

  <!-- 金色顶线 -->
  <rect x="14" y="14" width="484" height="4"
        rx="2" fill="rgba(255,220,80,0.3)"/>
</svg>`;
  await saveSVG('panel-upgrade.png', svg, 160, 80);
}

async function genTowerSlot() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512">
  <defs>
    <!-- 凹槽底色：浅绿 -->
    <radialGradient id="slotGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%"   stop-color="#C8E6C9"/>
      <stop offset="70%"  stop-color="#A5D6A7"/>
      <stop offset="100%" stop-color="#81C784"/>
    </radialGradient>
    <!-- 内阴影模拟：深边缘 -->
    <radialGradient id="innerShadow" cx="50%" cy="50%" r="50%">
      <stop offset="60%"  stop-color="transparent"/>
      <stop offset="100%" stop-color="rgba(0,60,0,0.35)"/>
    </radialGradient>
    <!-- 高光 -->
    <radialGradient id="hlGrad" cx="38%" cy="30%" r="45%">
      <stop offset="0%"   stop-color="rgba(255,255,255,0.6)"/>
      <stop offset="100%" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
    <filter id="inset" x="-5%" y="-5%" width="110%" height="110%">
      <feGaussianBlur stdDeviation="18" result="blur"/>
    </filter>
  </defs>

  <!-- 外圈描边 -->
  <circle cx="256" cy="256" r="245" fill="#4CAF50" opacity="0.6"/>

  <!-- 主体凹槽 -->
  <circle cx="256" cy="256" r="228" fill="url(#slotGrad)"/>

  <!-- 内阴影层 -->
  <circle cx="256" cy="256" r="228" fill="url(#innerShadow)"/>

  <!-- 高光 -->
  <circle cx="256" cy="256" r="228" fill="url(#hlGrad)"/>

  <!-- 中心十字虚线提示 -->
  <line x1="256" y1="140" x2="256" y2="372"
        stroke="rgba(0,100,0,0.2)" stroke-width="8" stroke-dasharray="16,14"/>
  <line x1="140" y1="256" x2="372" y2="256"
        stroke="rgba(0,100,0,0.2)" stroke-width="8" stroke-dasharray="16,14"/>

  <!-- 中心圆点 -->
  <circle cx="256" cy="256" r="22" fill="rgba(0,100,0,0.18)"/>
</svg>`;
  await saveSVG('tower-slot.png', svg, 64, 64);
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────

console.log('🎨 开始生成 UI 素材...\n');

const tasks = [
  ['btn-start-v2.png',    genBtnStart],
  ['btn-nextwave-v2.png', genBtnNextwave],
  ['btn-upgrade.png',     genBtnUpgrade],
  ['btn-sell.png',        genBtnSell],
  ['icon-coin-v2.png',    genIconCoin],
  ['icon-heart-v2.png',   genIconHeart],
  ['hud-bg-top.png',      genHudBgTop],
  ['hud-bg-bottom.png',   genHudBgBottom],
  ['panel-win.png',       genPanelWin],
  ['panel-lose.png',      genPanelLose],
  ['panel-upgrade.png',   genPanelUpgrade],
  ['tower-slot.png',      genTowerSlot],
];

for (const [name, fn] of tasks) {
  try {
    await fn();
  } catch (e) {
    console.error(`❌  ${name}: ${e.message}`);
  }
}

console.log('\n✨ 全部完成！');
