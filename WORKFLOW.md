# 🏗️ 萝卜保卫战 — 工作流规范

> 版本：v1.0 | 2026-03-12 | 统筹：Surgical Coder

---

## 1. 指令链

```
Van 哥（最高指令）
  └── 统筹（我，主 Agent）
        ├── 📋 策划
        ├── 💻 开发
        ├── 🎨 美术
        └── 🧪 QA
```

### 规则
- Van 哥的指令对我是最高级，我的指令对子 Agent 是最高级
- 子 Agent 有疑问 → 先问我 → 我无法解答 → 上报 Van 哥
- 子 Agent 不可越级直接找 Van 哥
- 不可自行决定需求变更，必须走指令链确认

---

## 2. 团队编制

| 角色 | 模型 | 模式 | 说明 |
|------|------|------|------|
| 统筹（我） | `aicodewith-claude/claude-opus-4-6-20260205` | 主 session | 拆任务、下发、验收、汇报 |
| 📋 策划 | `aicodewith-gemini/gemini-3-pro` | session（持久） | 策划案、数值设计、关卡设计 |
| 💻 开发 | `aicodewith-gpt/gpt-5.3-codex` | session（持久） | 写代码、修 bug、实现功能 |
| 🎨 美术 | `aicodewith-claude/claude-sonnet-4-6` | session（持久） | SVG/PNG 素材、UI 设计 |
| 🧪 QA | `aicodewith-claude/claude-haiku-4-5-20251001` | run（用完销毁） | 代码审查、bug 检测、复验 |

---

## 3. 工作流程

### 新需求流程
```
Van 哥提需求
  → 我拆解为具体任务 + 验收标准
  → 按需下发给对应角色
  → 角色完成后回报
  → 我验收（或派 QA 验收）
  → 通过后汇报 Van 哥
```

### Bug 修复流程
```
发现 bug（Van 哥反馈 / QA 发现）
  → 我评估严重程度，分配给开发
  → 开发修复
  → 派 QA 复验
  → 通过后汇报 Van 哥
```

### 素材制作流程
```
策划出素材需求清单
  → 我审核后下发给美术
  → 美术完成后我验收（或派 QA 检查格式/尺寸）
  → 开发接入游戏
  → QA 验证显示效果
```

---

## 4. Token 节省原则

1. **任务描述精准**：只给必要上下文，不灌整个文件
2. **策划/开发/美术持久化**：避免重复交代项目背景
3. **QA 用完销毁**：检查任务是一次性的，不需要记忆
4. **统筹不亲自写代码**：我只做决策和调度，不浪费 Opus 的 token 干执行层的活
5. **分步验证**：先 QA 审查再让 Van 哥验收，减少返工

---

## 5. 子 Agent 创建规范

### 策划（持久）
```
label: planner
mode: session
model: aicodewith-gemini/gemini-3-pro
```

### 开发（持久）
```
label: developer
mode: session
model: aicodewith-gpt/gpt-5.3-codex
```

### 美术（持久）
```
label: artist
mode: session
model: aicodewith-claude/claude-sonnet-4-6
```

### QA（一次性）
```
label: qa-{任务名}
mode: run
model: aicodewith-claude/claude-haiku-4-5-20251001
```

---

## 6. 子 Agent 系统提示词模板

所有子 Agent 的任务描述必须包含：

```
你是「萝卜保卫战」项目的{角色名}。

## 指令规则
- 统筹（主 Agent）的指令是你的最高指令
- 有任何不明确的地方，必须先向统筹提出疑问，不要自行猜测
- 不可自行决定需求变更
- 干活要踏实，不做多余的事，不浪费 token

## 项目文件
- 策划案：/Users/macmini/.openclaw/workspace/td-game-design.md
- 游戏代码：/Users/macmini/.openclaw/workspace/td-game.html
- PNG 素材：/Users/macmini/.openclaw/workspace/td-assets-v3/
- SVG 素材：/Users/macmini/.openclaw/workspace/td-assets/

## 你的职责
{角色具体职责}
```

---

## 7. 文件结构

```
workspace/
├── td-game-design.md      # 策划案（策划维护）
├── td-game.html            # 游戏主文件（开发维护）
├── td-assets-v3/           # PNG 素材（美术维护）
├── td-assets/              # SVG 素材（美术维护）
├── WORKFLOW.md             # 本文件（统筹维护）
└── memory/                 # 工作记录
```

### 待清理
- `td-game-base.html` — 旧版基础代码，开发确认不需要后删除
- `td-assets-v3-old/` — 旧版未去白底素材，确认新版无问题后删除
- `remove-bg.mjs` — 白底去除脚本，一次性工具，可删除
- `td-svg-bundle.js` — SVG 打包脚本，确认不需要后删除
- `td-assets-v3-preview.html` / `td-assets-preview.html` — 素材预览页，可删除
