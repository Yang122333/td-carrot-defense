// === 所有 SVG 素材合集 ===

// --- ant ---
const SVG_ANT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 24" width="28" height="24">
  <defs>
    <radialGradient id="antGrad" cx="45%" cy="40%">
      <stop offset="0%" stop-color="#EF5350"/>
      <stop offset="100%" stop-color="#C62828"/>
    </radialGradient>
  </defs>
  <!-- Antennae -->
  <path d="M10 5 Q8 1 5 0" fill="none" stroke="#B71C1C" stroke-width="0.8" stroke-linecap="round"/>
  <circle cx="5" cy="0" r="0.8" fill="#EF5350"/>
  <path d="M13 5 Q14 1 17 0" fill="none" stroke="#B71C1C" stroke-width="0.8" stroke-linecap="round"/>
  <circle cx="17" cy="0" r="0.8" fill="#EF5350"/>
  <!-- Head with headband -->
  <ellipse cx="11" cy="8" rx="6" ry="5.5" fill="url(#antGrad)"/>
  <!-- Headband -->
  <path d="M5 6 Q11 4 17 6" fill="none" stroke="#FFD54F" stroke-width="1.5"/>
  <path d="M16 5.5 L18 3 L17 6" fill="#FFD54F"/>
  <!-- Sneaky eyes -->
  <ellipse cx="8.5" cy="8" rx="2" ry="2.2" fill="white"/>
  <ellipse cx="13.5" cy="8" rx="2" ry="2.2" fill="white"/>
  <circle cx="9" cy="8.2" r="1.3" fill="#333"/>
  <circle cx="14" cy="8.2" r="1.3" fill="#333"/>
  <!-- Sly eyebrows -->
  <line x1="6" y1="5.5" x2="10" y2="6.5" stroke="#7f0000" stroke-width="0.8" stroke-linecap="round"/>
  <line x1="12" y1="6.5" x2="16" y2="5.5" stroke="#7f0000" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Sneaky grin -->
  <path d="M8 11 Q11 13 14 11" fill="none" stroke="#7f0000" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Body (thorax) -->
  <ellipse cx="14" cy="14" rx="4" ry="3.5" fill="#D32F2F"/>
  <!-- Abdomen -->
  <ellipse cx="18" cy="18" rx="5" ry="4" fill="#C62828"/>
  <!-- Six legs -->
  <line x1="11" y1="14" x2="7" y2="18" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
  <line x1="13" y1="16" x2="9" y2="20" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
  <line x1="15" y1="16" x2="12" y2="21" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
  <line x1="17" y1="14" x2="21" y2="18" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
  <line x1="19" y1="16" x2="23" y2="19" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
  <line x1="20" y1="18" x2="24" y2="22" stroke="#B71C1C" stroke-width="1" stroke-linecap="round"/>
</svg>`;

// --- beetle ---
const SVG_BEETLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 32" width="40" height="32">
  <defs>
    <radialGradient id="shellGrad" cx="45%" cy="35%">
      <stop offset="0%" stop-color="#616161"/>
      <stop offset="50%" stop-color="#333"/>
      <stop offset="100%" stop-color="#1A1A1A"/>
    </radialGradient>
    <linearGradient id="metalShine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="white" stop-opacity="0.4"/>
      <stop offset="50%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <!-- Shadow -->
  <ellipse cx="20" cy="30" rx="16" ry="2" fill="#000" opacity="0.15"/>
  <!-- Legs (6 stubby) -->
  <rect x="6" y="24" width="3" height="5" rx="1.5" fill="#424242"/>
  <rect x="13" y="25" width="3" height="5" rx="1.5" fill="#424242"/>
  <rect x="24" y="25" width="3" height="5" rx="1.5" fill="#424242"/>
  <rect x="31" y="24" width="3" height="5" rx="1.5" fill="#424242"/>
  <!-- Body underneath -->
  <ellipse cx="20" cy="22" rx="16" ry="8" fill="#5D4037"/>
  <!-- Hard shell (metallic) -->
  <ellipse cx="20" cy="18" rx="17" ry="12" fill="url(#shellGrad)"/>
  <!-- Shell dividing line -->
  <line x1="20" y1="6" x2="20" y2="30" stroke="#1A1A1A" stroke-width="1"/>
  <!-- Metallic highlight -->
  <ellipse cx="20" cy="14" rx="15" ry="9" fill="url(#metalShine)"/>
  <!-- Gold edge trim -->
  <ellipse cx="20" cy="18" rx="17" ry="12" fill="none" stroke="#FFD54F" stroke-width="0.5" opacity="0.4"/>
  <!-- Head peeking out -->
  <ellipse cx="20" cy="8" rx="7" ry="5" fill="#424242"/>
  <!-- Serious eyes -->
  <ellipse cx="17" cy="8" rx="2" ry="2.5" fill="white"/>
  <ellipse cx="23" cy="8" rx="2" ry="2.5" fill="white"/>
  <circle cx="17.3" cy="8.5" r="1.5" fill="#333"/>
  <circle cx="23.3" cy="8.5" r="1.5" fill="#333"/>
  <!-- Stern eyebrows -->
  <line x1="14" y1="5" x2="19" y2="6" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="21" y1="6" x2="26" y2="5" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Flat mouth -->
  <line x1="17" y1="11" x2="23" y2="11" stroke="#222" stroke-width="1" stroke-linecap="round"/>
  <!-- Antennae -->
  <path d="M16 4 Q14 1 12 0" fill="none" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>
  <path d="M24 4 Q26 1 28 0" fill="none" stroke="#555" stroke-width="0.8" stroke-linecap="round"/>
</svg>`;

// --- btn-nextwave ---
const SVG_BTN_NEXTWAVE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 30" width="80" height="30">
  <defs>
    <linearGradient id="btnNextGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FFB74D"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
  </defs>
  <!-- Shadow -->
  <rect x="2" y="3" width="76" height="26" rx="8" fill="#BF360C" opacity="0.3"/>
  <!-- Body -->
  <rect x="1" y="2" width="78" height="26" rx="8" fill="url(#btnNextGrad)"/>
  <rect x="1" y="2" width="78" height="26" rx="8" fill="none" stroke="#BF360C" stroke-width="1.5"/>
  <!-- Highlight -->
  <rect x="5" y="4" width="70" height="10" rx="6" fill="white" opacity="0.15"/>
  <!-- Text -->
  <text x="40" y="20" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="white">下一波</text>
</svg>`;

// --- btn-start ---
const SVG_BTN_START = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 50" width="160" height="50">
  <defs>
    <linearGradient id="btnStartGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#66BB6A"/>
      <stop offset="100%" stop-color="#2E7D32"/>
    </linearGradient>
  </defs>
  <!-- Button shadow -->
  <rect x="3" y="5" width="154" height="44" rx="14" fill="#1B5E20" opacity="0.3"/>
  <!-- Button body -->
  <rect x="2" y="3" width="156" height="44" rx="14" fill="url(#btnStartGrad)"/>
  <!-- Button border -->
  <rect x="2" y="3" width="156" height="44" rx="14" fill="none" stroke="#1B5E20" stroke-width="2"/>
  <!-- Inner highlight -->
  <rect x="8" y="6" width="144" height="18" rx="10" fill="white" opacity="0.15"/>
  <!-- Text -->
  <text x="80" y="31" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="white">开始游戏</text>
  <!-- Text shadow -->
  <text x="80" y="32" text-anchor="middle" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#1B5E20" opacity="0.2">开始游戏</text>
</svg>`;

// --- bugking ---
const SVG_BUGKING = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 48" width="56" height="48">
  <defs>
    <radialGradient id="bossGrad" cx="45%" cy="40%">
      <stop offset="0%" stop-color="#CE93D8"/>
      <stop offset="50%" stop-color="#9C27B0"/>
      <stop offset="100%" stop-color="#6A1B9A"/>
    </radialGradient>
    <filter id="bossGlow">
      <feGaussianBlur stdDeviation="2" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Outer glow -->
  <ellipse cx="28" cy="30" rx="26" ry="18" fill="#FFD54F" opacity="0.12"/>
  <!-- Body segments -->
  <ellipse cx="44" cy="34" rx="8" ry="9" fill="#8E24AA" filter="url(#bossGlow)"/>
  <ellipse cx="36" cy="32" rx="9" ry="10" fill="#9C27B0"/>
  <ellipse cx="26" cy="30" rx="10" ry="11" fill="url(#bossGrad)"/>
  <!-- Gold belly highlights -->
  <ellipse cx="26" cy="34" rx="6" ry="5" fill="#FFD54F" opacity="0.25"/>
  <ellipse cx="36" cy="36" rx="5" ry="4" fill="#FFD54F" opacity="0.2"/>
  <ellipse cx="44" cy="38" rx="4" ry="3" fill="#FFD54F" opacity="0.15"/>
  <!-- Head -->
  <ellipse cx="15" cy="26" rx="12" ry="12" fill="url(#bossGrad)" filter="url(#bossGlow)"/>
  <!-- Gold accents on body -->
  <ellipse cx="15" cy="30" rx="7" ry="4" fill="#FFD54F" opacity="0.2"/>
  <!-- Crown (tilted) -->
  <g transform="translate(10, 10) rotate(-15)">
    <path d="M-3 6 L-1 0 L3 4 L7 -1 L11 4 L15 0 L17 6 Z" fill="#FFD54F"/>
    <path d="M-3 6 L17 6 L17 9 L-3 9 Z" fill="#FFC107"/>
    <circle cx="3" cy="3" r="1" fill="#E53935"/>
    <circle cx="7" cy="1" r="1" fill="#42A5F5"/>
    <circle cx="11" cy="3" r="1" fill="#66BB6A"/>
  </g>
  <!-- Big dumb eyes -->
  <ellipse cx="11" cy="24" rx="4" ry="4.5" fill="white"/>
  <ellipse cx="21" cy="24" rx="4" ry="4.5" fill="white"/>
  <circle cx="12" cy="24.5" r="2.5" fill="#4A148C"/>
  <circle cx="22" cy="24.5" r="2.5" fill="#4A148C"/>
  <circle cx="11" cy="23.5" r="1" fill="white"/>
  <circle cx="21" cy="23.5" r="1" fill="white"/>
  <!-- Arrogant eyebrows -->
  <path d="M6 19 Q9 17 14 19.5" fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M18 19.5 Q23 17 26 19" fill="none" stroke="#4A148C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Big goofy grin -->
  <path d="M9 30 Q15 36 22 30" fill="#4A148C"/>
  <path d="M11 30 Q15 33 20 30" fill="#CE93D8"/>
  <!-- Teeth -->
  <rect x="12" y="30" width="2.5" height="2" rx="0.5" fill="white"/>
  <rect x="16" y="30" width="2.5" height="2" rx="0.5" fill="white"/>
  <!-- Small legs -->
  <circle cx="20" cy="42" r="2" fill="#7B1FA2"/>
  <circle cx="28" cy="43" r="2" fill="#7B1FA2"/>
  <circle cx="36" cy="43" r="2" fill="#7B1FA2"/>
  <circle cx="44" cy="42" r="2" fill="#7B1FA2"/>
  <!-- Sparkle effects -->
  <circle cx="4" cy="16" r="1" fill="#FFD54F" opacity="0.6"/>
  <circle cx="48" cy="26" r="1.2" fill="#FFD54F" opacity="0.5"/>
  <circle cx="30" cy="18" r="0.8" fill="#FFF9C4" opacity="0.7"/>
</svg>`;

// --- bullet-corn ---
const SVG_BULLET_CORN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8">
  <defs>
    <radialGradient id="cornBullet" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="100%" stop-color="#FFC107"/>
    </radialGradient>
  </defs>
  <circle cx="4" cy="4" r="3.5" fill="url(#cornBullet)"/>
  <circle cx="3" cy="3" r="1" fill="white" opacity="0.5"/>
</svg>`;

// --- bullet-fire ---
const SVG_BULLET_FIRE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10">
  <defs>
    <radialGradient id="fireGrad" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="40%" stop-color="#FF9800"/>
      <stop offset="100%" stop-color="#E65100"/>
    </radialGradient>
  </defs>
  <!-- Fire ball -->
  <circle cx="5" cy="5" r="4" fill="url(#fireGrad)"/>
  <!-- Inner flame shapes -->
  <ellipse cx="5" cy="4" rx="2" ry="3" fill="#FFD54F" opacity="0.6"/>
  <ellipse cx="5" cy="3.5" rx="1" ry="2" fill="#FFF9C4" opacity="0.7"/>
  <!-- Outer flame licks -->
  <ellipse cx="3" cy="3" rx="1" ry="1.5" fill="#FF6F00" opacity="0.5" transform="rotate(-20 3 3)"/>
  <ellipse cx="7" cy="3" rx="1" ry="1.5" fill="#FF6F00" opacity="0.5" transform="rotate(20 7 3)"/>
</svg>`;

// --- bullet-ice ---
const SVG_BULLET_ICE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8" width="8" height="8">
  <defs>
    <radialGradient id="iceBullet" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#E1F5FE"/>
      <stop offset="100%" stop-color="#1E88E5"/>
    </radialGradient>
  </defs>
  <!-- Ice crystal shape -->
  <polygon points="4,0.5 5.5,3 7.5,4 5.5,5 4,7.5 2.5,5 0.5,4 2.5,3" fill="url(#iceBullet)"/>
  <circle cx="3.5" cy="3" r="0.8" fill="white" opacity="0.6"/>
</svg>`;

// --- carrot ---
const SVG_CARROT = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48" height="48">
  <defs>
    <radialGradient id="carrotGlow" cx="50%" cy="50%">
      <stop offset="0%" stop-color="#FFD54F" stop-opacity="0.4"/>
      <stop offset="100%" stop-color="#FFD54F" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="carrotBody" cx="45%" cy="35%">
      <stop offset="0%" stop-color="#FFB74D"/>
      <stop offset="100%" stop-color="#E65100"/>
    </radialGradient>
  </defs>
  <!-- Glow aura -->
  <circle cx="24" cy="24" r="22" fill="url(#carrotGlow)"/>
  <!-- Green leaves -->
  <ellipse cx="18" cy="10" rx="5" ry="8" fill="#66BB6A" transform="rotate(-20 18 10)"/>
  <ellipse cx="24" cy="8" rx="4" ry="9" fill="#4CAF50"/>
  <ellipse cx="30" cy="10" rx="5" ry="8" fill="#66BB6A" transform="rotate(20 30 10)"/>
  <ellipse cx="21" cy="9" rx="3" ry="7" fill="#81C784" transform="rotate(-10 21 9)"/>
  <ellipse cx="27" cy="9" rx="3" ry="7" fill="#81C784" transform="rotate(10 27 9)"/>
  <!-- Carrot body -->
  <path d="M14 18 Q13 30 24 44 Q35 30 34 18 Q34 14 24 14 Q14 14 14 18Z" fill="url(#carrotBody)"/>
  <!-- Highlight -->
  <path d="M18 18 Q17 26 22 36" fill="none" stroke="#FFCC80" stroke-width="2" opacity="0.5" stroke-linecap="round"/>
  <!-- Horizontal lines (carrot texture) -->
  <line x1="16" y1="22" x2="32" y2="22" stroke="#E65100" stroke-width="0.5" opacity="0.3"/>
  <line x1="17" y1="27" x2="31" y2="27" stroke="#E65100" stroke-width="0.5" opacity="0.3"/>
  <line x1="19" y1="32" x2="29" y2="32" stroke="#E65100" stroke-width="0.5" opacity="0.3"/>
  <!-- Cute face -->
  <ellipse cx="20" cy="23" rx="2" ry="2.5" fill="white"/>
  <ellipse cx="28" cy="23" rx="2" ry="2.5" fill="white"/>
  <circle cx="20.5" cy="23.5" r="1.3" fill="#5D4037"/>
  <circle cx="28.5" cy="23.5" r="1.3" fill="#5D4037"/>
  <circle cx="20" cy="22.8" r="0.5" fill="white"/>
  <circle cx="28" cy="22.8" r="0.5" fill="white"/>
  <!-- Happy mouth -->
  <path d="M21 28 Q24 31 27 28" fill="none" stroke="#BF360C" stroke-width="1" stroke-linecap="round"/>
  <!-- Blush -->
  <circle cx="17" cy="26" r="2" fill="#FF8A80" opacity="0.35"/>
  <circle cx="31" cy="26" r="2" fill="#FF8A80" opacity="0.35"/>
  <!-- Sparkles -->
  <circle cx="8" cy="15" r="1.2" fill="#FFD54F" opacity="0.7"/>
  <circle cx="40" cy="13" r="1" fill="#FFD54F" opacity="0.6"/>
  <circle cx="38" cy="38" r="0.8" fill="#FFF9C4" opacity="0.8"/>
</svg>`;

// --- caterpillar ---
const SVG_CATERPILLAR = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 20" width="32" height="20">
  <defs>
    <radialGradient id="bugGrad" cx="50%" cy="40%">
      <stop offset="0%" stop-color="#A5D6A7"/>
      <stop offset="100%" stop-color="#43A047"/>
    </radialGradient>
  </defs>
  <!-- Antennae -->
  <path d="M7 6 Q5 2 3 1" fill="none" stroke="#388E3C" stroke-width="1" stroke-linecap="round"/>
  <circle cx="3" cy="1" r="1" fill="#66BB6A"/>
  <path d="M9 6 Q8 2 10 1" fill="none" stroke="#388E3C" stroke-width="1" stroke-linecap="round"/>
  <circle cx="10" cy="1" r="1" fill="#66BB6A"/>
  <!-- Body segments (caterpillar) -->
  <ellipse cx="26" cy="14" rx="4" ry="4.5" fill="#66BB6A"/>
  <ellipse cx="21" cy="13" rx="4.5" ry="5" fill="#4CAF50"/>
  <ellipse cx="15" cy="12" rx="5" ry="5.5" fill="#43A047"/>
  <!-- Head (biggest) -->
  <ellipse cx="8" cy="11" rx="6" ry="6.5" fill="url(#bugGrad)"/>
  <!-- Big cute eyes -->
  <ellipse cx="5.5" cy="10" rx="2.5" ry="3" fill="white"/>
  <ellipse cx="11" cy="10" rx="2.5" ry="3" fill="white"/>
  <circle cx="6" cy="10.5" r="1.8" fill="#333"/>
  <circle cx="11.5" cy="10.5" r="1.8" fill="#333"/>
  <!-- Eye sparkles -->
  <circle cx="5.2" cy="9.5" r="0.6" fill="white"/>
  <circle cx="10.7" cy="9.5" r="0.6" fill="white"/>
  <!-- Cute mouth -->
  <path d="M6 14 Q8 16 10 14" fill="none" stroke="#2E7D32" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Cheek blush -->
  <circle cx="4" cy="13" r="1.5" fill="#F48FB1" opacity="0.3"/>
  <circle cx="12.5" cy="13" r="1.5" fill="#F48FB1" opacity="0.3"/>
  <!-- Little feet -->
  <circle cx="14" cy="18" r="1" fill="#388E3C"/>
  <circle cx="20" cy="18.5" r="1" fill="#388E3C"/>
  <circle cx="26" cy="19" r="1" fill="#388E3C"/>
</svg>`;

// --- chili-lv1 ---
const SVG_CHILI_LV1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
  <defs>
    <radialGradient id="chiliGrad" cx="45%" cy="40%">
      <stop offset="0%" stop-color="#FF6659"/>
      <stop offset="100%" stop-color="#D32F2F"/>
    </radialGradient>
  </defs>
  <!-- Fire on top -->
  <ellipse cx="22" cy="6" rx="4" ry="5" fill="#FF9800"/>
  <ellipse cx="22" cy="5" rx="3" ry="4" fill="#FFD54F"/>
  <ellipse cx="22" cy="4" rx="1.5" ry="2.5" fill="#FFF9C4"/>
  <!-- Green stem -->
  <rect x="19" y="9" width="6" height="5" rx="2" fill="#4CAF50"/>
  <rect x="20" y="8" width="4" height="3" rx="1" fill="#66BB6A"/>
  <!-- Round chili body -->
  <ellipse cx="22" cy="27" rx="14" ry="16" fill="url(#chiliGrad)"/>
  <!-- Blush cheeks -->
  <circle cx="13" cy="27" r="3.5" fill="#FF8A80" opacity="0.5"/>
  <circle cx="31" cy="27" r="3.5" fill="#FF8A80" opacity="0.5"/>
  <!-- Eyes: strained/red-faced -->
  <ellipse cx="17" cy="23" rx="3" ry="3.5" fill="white"/>
  <ellipse cx="27" cy="23" rx="3" ry="3.5" fill="white"/>
  <circle cx="17.5" cy="23.5" r="2" fill="#333"/>
  <circle cx="27.5" cy="23.5" r="2" fill="#333"/>
  <circle cx="16.5" cy="22.5" r="0.7" fill="white"/>
  <circle cx="26.5" cy="22.5" r="0.7" fill="white"/>
  <!-- Angry-ish eyebrows -->
  <line x1="13" y1="19" x2="19" y2="20" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round"/>
  <line x1="25" y1="20" x2="31" y2="19" stroke="#B71C1C" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Open mouth (ready to fire) -->
  <ellipse cx="22" cy="31" rx="5" ry="4" fill="#B71C1C"/>
  <ellipse cx="22" cy="30" rx="3" ry="2" fill="#D32F2F"/>
</svg>`;

// --- chili-lv2 ---
const SVG_CHILI_LV2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44" width="44" height="44">
  <defs>
    <radialGradient id="devilChili" cx="45%" cy="40%">
      <stop offset="0%" stop-color="#E53935"/>
      <stop offset="100%" stop-color="#8B0000"/>
    </radialGradient>
  </defs>
  <!-- Bigger fire on top -->
  <ellipse cx="22" cy="5" rx="6" ry="6" fill="#FF6F00"/>
  <ellipse cx="19" cy="4" rx="3" ry="5" fill="#FF9800"/>
  <ellipse cx="25" cy="3" rx="3" ry="5" fill="#FF9800"/>
  <ellipse cx="22" cy="3" rx="3.5" ry="4.5" fill="#FFD54F"/>
  <ellipse cx="22" cy="2" rx="2" ry="3" fill="#FFF9C4"/>
  <!-- Green stem -->
  <rect x="19" y="9" width="6" height="5" rx="2" fill="#2E7D32"/>
  <rect x="20" y="8" width="4" height="3" rx="1" fill="#4CAF50"/>
  <!-- Devil chili body -->
  <ellipse cx="22" cy="27" rx="14" ry="16" fill="url(#devilChili)"/>
  <!-- Dark veins -->
  <path d="M14 20 Q16 27 14 34" fill="none" stroke="#6D0000" stroke-width="0.7" opacity="0.4"/>
  <path d="M30 20 Q28 27 30 34" fill="none" stroke="#6D0000" stroke-width="0.7" opacity="0.4"/>
  <!-- Intense blush -->
  <circle cx="13" cy="27" r="4" fill="#FF5252" opacity="0.5"/>
  <circle cx="31" cy="27" r="4" fill="#FF5252" opacity="0.5"/>
  <!-- Angry eyes -->
  <ellipse cx="17" cy="23" rx="3" ry="3.5" fill="white"/>
  <ellipse cx="27" cy="23" rx="3" ry="3.5" fill="white"/>
  <circle cx="17.5" cy="23.5" r="2" fill="#C62828"/>
  <circle cx="27.5" cy="23.5" r="2" fill="#C62828"/>
  <circle cx="16.5" cy="22.5" r="0.7" fill="white"/>
  <circle cx="26.5" cy="22.5" r="0.7" fill="white"/>
  <!-- Fierce V-shaped eyebrows -->
  <line x1="12" y1="17.5" x2="19" y2="20" stroke="#4A0000" stroke-width="2" stroke-linecap="round"/>
  <line x1="25" y1="20" x2="32" y2="17.5" stroke="#4A0000" stroke-width="2" stroke-linecap="round"/>
  <!-- Roaring mouth -->
  <ellipse cx="22" cy="32" rx="6" ry="5" fill="#4A0000"/>
  <ellipse cx="22" cy="31" rx="4" ry="3" fill="#8B0000"/>
  <!-- Teeth -->
  <rect x="18" y="29" width="3" height="2" rx="1" fill="white"/>
  <rect x="23" y="29" width="3" height="2" rx="1" fill="white"/>
</svg>`;

// --- corn-lv1 ---
const SVG_CORN_LV1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <!-- Body: round corn cob -->
  <ellipse cx="20" cy="24" rx="12" ry="14" fill="#FFD700"/>
  <ellipse cx="20" cy="24" rx="12" ry="14" fill="url(#cornGrad)"/>
  <defs>
    <radialGradient id="cornGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#FFF176"/>
      <stop offset="100%" stop-color="#FFB300"/>
    </radialGradient>
  </defs>
  <!-- Corn kernel rows -->
  <circle cx="15" cy="20" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="20" cy="19" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="25" cy="20" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="14" cy="25" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="19" cy="24" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="24" cy="24" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="15" cy="30" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="20" cy="29" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="25" cy="30" r="2" fill="#FFC107" opacity="0.6"/>
  <!-- Green beret hat -->
  <ellipse cx="20" cy="11" rx="11" ry="5" fill="#4CAF50"/>
  <ellipse cx="20" cy="10" rx="9" ry="4" fill="#66BB6A"/>
  <circle cx="20" cy="7" r="2" fill="#388E3C"/>
  <!-- Eyes: serious expression -->
  <ellipse cx="16" cy="18" rx="2.5" ry="3" fill="white"/>
  <ellipse cx="24" cy="18" rx="2.5" ry="3" fill="white"/>
  <circle cx="16.5" cy="18.5" r="1.5" fill="#333"/>
  <circle cx="24.5" cy="18.5" r="1.5" fill="#333"/>
  <!-- Eyebrows: determined -->
  <line x1="13" y1="14.5" x2="18" y2="15.5" stroke="#5D4037" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="22" y1="15.5" x2="27" y2="14.5" stroke="#5D4037" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Mouth: small determined -->
  <path d="M17 23 Q20 25 23 23" fill="none" stroke="#5D4037" stroke-width="1" stroke-linecap="round"/>
  <!-- Left arm holding corn kernel -->
  <path d="M8 22 Q5 20 4 18" fill="none" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="4" cy="17" r="2.5" fill="#FFD700"/>
  <circle cx="4" cy="17" r="1.5" fill="#FFF176"/>
  <!-- Right arm -->
  <path d="M32 22 Q35 24 36 26" fill="none" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

// --- corn-lv2 ---
const SVG_CORN_LV2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <radialGradient id="cornGrad2" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#FFF176"/>
      <stop offset="100%" stop-color="#FFB300"/>
    </radialGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="1.5" result="blur"/>
      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <!-- Glow aura -->
  <ellipse cx="20" cy="24" rx="15" ry="17" fill="#FFD700" opacity="0.15"/>
  <!-- Body -->
  <ellipse cx="20" cy="24" rx="12" ry="14" fill="url(#cornGrad2)"/>
  <!-- Corn kernel rows -->
  <circle cx="15" cy="20" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="20" cy="19" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="25" cy="20" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="14" cy="25" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="19" cy="24" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="24" cy="24" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="15" cy="30" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="20" cy="29" r="2" fill="#FFC107" opacity="0.6"/>
  <circle cx="25" cy="30" r="2" fill="#FFC107" opacity="0.6"/>
  <!-- Green beret hat -->
  <ellipse cx="20" cy="11" rx="11" ry="5" fill="#4CAF50"/>
  <ellipse cx="20" cy="10" rx="9" ry="4" fill="#66BB6A"/>
  <circle cx="20" cy="7" r="2" fill="#388E3C"/>
  <!-- Sunglasses -->
  <rect x="11" y="15.5" width="8" height="5" rx="2" fill="#222"/>
  <rect x="21" y="15.5" width="8" height="5" rx="2" fill="#222"/>
  <line x1="19" y1="17.5" x2="21" y2="17.5" stroke="#222" stroke-width="1"/>
  <line x1="11" y1="17.5" x2="8" y2="16" stroke="#222" stroke-width="1"/>
  <line x1="29" y1="17.5" x2="32" y2="16" stroke="#222" stroke-width="1"/>
  <!-- Lens shine -->
  <rect x="12.5" y="16.5" width="2" height="1" rx="0.5" fill="white" opacity="0.5"/>
  <rect x="22.5" y="16.5" width="2" height="1" rx="0.5" fill="white" opacity="0.5"/>
  <!-- Mouth: confident smirk -->
  <path d="M17 24 Q20 26 23 24" fill="none" stroke="#5D4037" stroke-width="1" stroke-linecap="round"/>
  <!-- Left arm holding corn kernel -->
  <path d="M8 22 Q5 20 4 18" fill="none" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
  <circle cx="4" cy="17" r="2.5" fill="#FFD700" filter="url(#glow)"/>
  <circle cx="4" cy="17" r="1.5" fill="#FFF176"/>
  <!-- Right arm -->
  <path d="M32 22 Q35 24 36 26" fill="none" stroke="#FFB300" stroke-width="2.5" stroke-linecap="round"/>
</svg>`;

// --- entrance ---
const SVG_ENTRANCE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
  <!-- Wooden sign post -->
  <rect x="14" y="18" width="4" height="14" rx="1" fill="#8D6E63"/>
  <rect x="15" y="19" width="1.5" height="11" rx="0.5" fill="#A1887F" opacity="0.4"/>
  <!-- Wooden sign board -->
  <rect x="2" y="2" width="28" height="18" rx="3" fill="#A1887F"/>
  <rect x="2" y="2" width="28" height="18" rx="3" fill="none" stroke="#6D4C41" stroke-width="1.5"/>
  <!-- Wood grain -->
  <line x1="4" y1="7" x2="28" y2="7" stroke="#8D6E63" stroke-width="0.5" opacity="0.4"/>
  <line x1="4" y1="12" x2="28" y2="12" stroke="#8D6E63" stroke-width="0.5" opacity="0.4"/>
  <!-- Text "虫" -->
  <text x="16" y="16" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="bold" fill="#4E342E">虫</text>
  <!-- Small arrow pointing right -->
  <path d="M26 28 L30 25 L26 22" fill="none" stroke="#F44336" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

// --- icepea-lv1 ---
const SVG_ICEPEA_LV1 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <radialGradient id="iceGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#E1F5FE"/>
      <stop offset="100%" stop-color="#42A5F5"/>
    </radialGradient>
  </defs>
  <!-- Cold mist particles -->
  <circle cx="6" cy="12" r="2" fill="#B3E5FC" opacity="0.4"/>
  <circle cx="34" cy="10" r="1.5" fill="#B3E5FC" opacity="0.3"/>
  <circle cx="8" cy="6" r="1" fill="#E1F5FE" opacity="0.5"/>
  <circle cx="33" cy="16" r="1.5" fill="#E1F5FE" opacity="0.3"/>
  <!-- Pea pod body -->
  <ellipse cx="20" cy="22" rx="14" ry="15" fill="url(#iceGrad)"/>
  <!-- Pod segments -->
  <ellipse cx="14" cy="25" rx="5" ry="6" fill="#64B5F6" opacity="0.3"/>
  <ellipse cx="20" cy="23" rx="5" ry="7" fill="#64B5F6" opacity="0.25"/>
  <ellipse cx="26" cy="25" rx="5" ry="6" fill="#64B5F6" opacity="0.3"/>
  <!-- Ice crystal highlight -->
  <ellipse cx="16" cy="18" rx="3" ry="2" fill="white" opacity="0.35"/>
  <!-- Eyes: cool/aloof expression -->
  <ellipse cx="15" cy="20" rx="2.5" ry="2" fill="white"/>
  <ellipse cx="25" cy="20" rx="2.5" ry="2" fill="white"/>
  <circle cx="15.5" cy="20.5" r="1.2" fill="#1565C0"/>
  <circle cx="25.5" cy="20.5" r="1.2" fill="#1565C0"/>
  <!-- Half-lidded eyes (cool look) -->
  <line x1="12" y1="19" x2="18" y2="18.5" stroke="#1565C0" stroke-width="0.8"/>
  <line x1="22" y1="18.5" x2="28" y2="19" stroke="#1565C0" stroke-width="0.8"/>
  <!-- Slight smirk -->
  <path d="M17 25 Q20 26.5 23 25" fill="none" stroke="#1565C0" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Top leaf/stem -->
  <ellipse cx="18" cy="8" rx="4" ry="3" fill="#66BB6A" transform="rotate(-15 18 8)"/>
  <ellipse cx="23" cy="8" rx="4" ry="3" fill="#4CAF50" transform="rotate(15 23 8)"/>
  <line x1="20" y1="12" x2="20" y2="7" stroke="#388E3C" stroke-width="1.5"/>
</svg>`;

// --- icepea-lv2 ---
const SVG_ICEPEA_LV2 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40">
  <defs>
    <radialGradient id="iceGrad2" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#E1F5FE"/>
      <stop offset="100%" stop-color="#1E88E5"/>
    </radialGradient>
  </defs>
  <!-- More cold mist particles -->
  <circle cx="5" cy="10" r="2" fill="#B3E5FC" opacity="0.5"/>
  <circle cx="35" cy="8" r="2" fill="#B3E5FC" opacity="0.4"/>
  <circle cx="3" cy="18" r="1.5" fill="#E1F5FE" opacity="0.4"/>
  <circle cx="37" cy="15" r="1.5" fill="#E1F5FE" opacity="0.4"/>
  <circle cx="8" cy="4" r="1.5" fill="#B3E5FC" opacity="0.3"/>
  <circle cx="32" cy="4" r="1" fill="#E1F5FE" opacity="0.35"/>
  <!-- Pea pod body -->
  <ellipse cx="20" cy="22" rx="14" ry="15" fill="url(#iceGrad2)"/>
  <!-- Frost pattern lines -->
  <path d="M12 15 L15 18 L12 21" fill="none" stroke="white" stroke-width="0.7" opacity="0.5"/>
  <path d="M28 15 L25 18 L28 21" fill="none" stroke="white" stroke-width="0.7" opacity="0.5"/>
  <path d="M18 30 L20 33 L22 30" fill="none" stroke="white" stroke-width="0.7" opacity="0.5"/>
  <!-- Ice crystal star decorations -->
  <path d="M10 28 L11 26 L12 28 L10 27 L12 27 Z" fill="white" opacity="0.4"/>
  <path d="M28 28 L29 26 L30 28 L28 27 L30 27 Z" fill="white" opacity="0.4"/>
  <!-- Pod segments -->
  <ellipse cx="14" cy="25" rx="5" ry="6" fill="#42A5F5" opacity="0.25"/>
  <ellipse cx="20" cy="23" rx="5" ry="7" fill="#42A5F5" opacity="0.2"/>
  <ellipse cx="26" cy="25" rx="5" ry="6" fill="#42A5F5" opacity="0.25"/>
  <!-- Eyes: cooler expression -->
  <ellipse cx="15" cy="20" rx="2.5" ry="2" fill="white"/>
  <ellipse cx="25" cy="20" rx="2.5" ry="2" fill="white"/>
  <circle cx="15.5" cy="20.5" r="1.2" fill="#0D47A1"/>
  <circle cx="25.5" cy="20.5" r="1.2" fill="#0D47A1"/>
  <!-- Heavy-lidded eyes -->
  <line x1="12" y1="19" x2="18" y2="18" stroke="#0D47A1" stroke-width="1"/>
  <line x1="22" y1="18" x2="28" y2="19" stroke="#0D47A1" stroke-width="1"/>
  <!-- Smirk -->
  <path d="M17 25 Q20 26.5 23 25" fill="none" stroke="#0D47A1" stroke-width="0.8" stroke-linecap="round"/>
  <!-- Top leaf/stem -->
  <ellipse cx="18" cy="8" rx="4" ry="3" fill="#66BB6A" transform="rotate(-15 18 8)"/>
  <ellipse cx="23" cy="8" rx="4" ry="3" fill="#4CAF50" transform="rotate(15 23 8)"/>
  <line x1="20" y1="12" x2="20" y2="7" stroke="#388E3C" stroke-width="1.5"/>
</svg>`;

// --- icon-coin ---
const SVG_ICON_COIN = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <defs>
    <radialGradient id="coinGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#FFF9C4"/>
      <stop offset="50%" stop-color="#FFD54F"/>
      <stop offset="100%" stop-color="#FF8F00"/>
    </radialGradient>
  </defs>
  <!-- Coin body -->
  <circle cx="8" cy="8" r="7" fill="url(#coinGrad)"/>
  <circle cx="8" cy="8" r="7" fill="none" stroke="#E65100" stroke-width="0.8"/>
  <!-- Inner ring -->
  <circle cx="8" cy="8" r="5" fill="none" stroke="#FF8F00" stroke-width="0.5" opacity="0.5"/>
  <!-- $ symbol -->
  <text x="8" y="11.5" text-anchor="middle" font-family="Arial" font-size="9" font-weight="bold" fill="#BF360C">¢</text>
  <!-- Shine -->
  <ellipse cx="5.5" cy="5.5" rx="2" ry="1.5" fill="white" opacity="0.35" transform="rotate(-30 5.5 5.5)"/>
</svg>`;

// --- icon-heart ---
const SVG_ICON_HEART = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
  <defs>
    <radialGradient id="heartGrad" cx="40%" cy="35%">
      <stop offset="0%" stop-color="#EF9A9A"/>
      <stop offset="100%" stop-color="#D32F2F"/>
    </radialGradient>
  </defs>
  <!-- Heart shape -->
  <path d="M8 14 Q1 9 1 5.5 Q1 2 4.5 2 Q7 2 8 4.5 Q9 2 11.5 2 Q15 2 15 5.5 Q15 9 8 14Z" fill="url(#heartGrad)"/>
  <!-- Shine -->
  <ellipse cx="5" cy="5" rx="1.8" ry="1.2" fill="white" opacity="0.4" transform="rotate(-25 5 5)"/>
</svg>`;

// --- mushroom ---
const SVG_MUSHROOM = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36">
  <defs>
    <radialGradient id="mushGrad" cx="45%" cy="40%">
      <stop offset="0%" stop-color="#CE93D8"/>
      <stop offset="100%" stop-color="#7B1FA2"/>
    </radialGradient>
  </defs>
  <!-- Mushroom stem -->
  <rect x="13" y="22" width="10" height="10" rx="3" fill="#E1BEE7"/>
  <rect x="14" y="23" width="3" height="6" rx="1" fill="#F3E5F5" opacity="0.4"/>
  <!-- Mushroom cap -->
  <ellipse cx="18" cy="18" rx="15" ry="11" fill="url(#mushGrad)"/>
  <!-- White spots -->
  <circle cx="10" cy="15" r="2.5" fill="white" opacity="0.8"/>
  <circle cx="22" cy="13" r="3" fill="white" opacity="0.8"/>
  <circle cx="15" cy="10" r="2" fill="white" opacity="0.7"/>
  <circle cx="26" cy="17" r="1.8" fill="white" opacity="0.7"/>
  <!-- Sleepy eyes (closed) -->
  <path d="M11 20 Q13 22 15 20" fill="none" stroke="#4A148C" stroke-width="1.2" stroke-linecap="round"/>
  <path d="M21 20 Q23 22 25 20" fill="none" stroke="#4A148C" stroke-width="1.2" stroke-linecap="round"/>
  <!-- Sleepy blush -->
  <circle cx="10" cy="22" r="2" fill="#F48FB1" opacity="0.4"/>
  <circle cx="26" cy="22" r="2" fill="#F48FB1" opacity="0.4"/>
  <!-- Tiny mouth -->
  <ellipse cx="18" cy="23" rx="1.5" ry="1" fill="#4A148C" opacity="0.5"/>
  <!-- Zzz -->
  <text x="28" y="10" font-family="Arial" font-size="5" font-weight="bold" fill="#7B1FA2" opacity="0.6">z</text>
  <text x="31" y="7" font-family="Arial" font-size="4" font-weight="bold" fill="#7B1FA2" opacity="0.4">z</text>
  <text x="33" y="4" font-family="Arial" font-size="3" font-weight="bold" fill="#7B1FA2" opacity="0.3">z</text>
</svg>`;

// --- title ---
const SVG_TITLE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 60" width="300" height="60">
  <defs>
    <linearGradient id="titleGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FF8F00"/>
      <stop offset="50%" stop-color="#F57F17"/>
      <stop offset="100%" stop-color="#E65100"/>
    </linearGradient>
    <filter id="titleShadow">
      <feDropShadow dx="2" dy="2" stdDeviation="1" flood-color="#5D4037" flood-opacity="0.4"/>
    </filter>
  </defs>
  <!-- Background decorative elements -->
  <!-- Left carrot -->
  <g transform="translate(10, 15) rotate(-15)">
    <path d="M5 8 L10 25 L15 8Z" fill="#FF9800"/>
    <ellipse cx="8" cy="6" rx="4" ry="3" fill="#66BB6A"/>
    <ellipse cx="12" cy="5" rx="3" ry="2.5" fill="#4CAF50"/>
  </g>
  <!-- Right carrot -->
  <g transform="translate(270, 15) rotate(15)">
    <path d="M5 8 L10 25 L15 8Z" fill="#FF9800"/>
    <ellipse cx="8" cy="6" rx="4" ry="3" fill="#66BB6A"/>
    <ellipse cx="12" cy="5" rx="3" ry="2.5" fill="#4CAF50"/>
  </g>
  <!-- Small bugs -->
  <circle cx="45" cy="48" r="3" fill="#66BB6A"/>
  <circle cx="42" cy="47" r="2" fill="#81C784"/>
  <circle cx="255" cy="48" r="3" fill="#EF5350"/>
  <circle cx="258" cy="47" r="2" fill="#EF9A9A"/>
  <!-- Title text outline -->
  <text x="150" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" stroke="#5D4037" stroke-width="4" fill="none" stroke-linejoin="round">萝卜保卫战</text>
  <!-- Title text fill -->
  <text x="150" y="43" text-anchor="middle" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="url(#titleGrad)" filter="url(#titleShadow)">萝卜保卫战</text>
  <!-- Sparkle decorations -->
  <circle cx="55" cy="12" r="2" fill="#FFD54F" opacity="0.8"/>
  <circle cx="240" cy="10" r="1.5" fill="#FFD54F" opacity="0.7"/>
  <circle cx="100" cy="8" r="1" fill="#FFF9C4" opacity="0.9"/>
  <circle cx="200" cy="8" r="1.2" fill="#FFF9C4" opacity="0.8"/>
  <!-- Subtitle sparkle line -->
  <line x1="80" y1="52" x2="110" y2="52" stroke="#FFB74D" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
  <line x1="190" y1="52" x2="220" y2="52" stroke="#FFB74D" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
  <circle cx="150" cy="52" r="2" fill="#FFD54F" opacity="0.6"/>
</svg>`;
