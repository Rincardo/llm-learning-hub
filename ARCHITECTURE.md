# 架构文档：LLM Learning Hub

## 技术选型

| 层面 | 选择 | 原因 |
|------|------|------|
| 框架 | Next.js 15（App Router） | SSG 静态生成，SEO 友好，适合展示站 |
| 样式 | Tailwind CSS + shadcn/ui | 快速出效果，暗色主题支持好，组件开箱即用 |
| 内容管理 | 本地 JSON + MDX | 无需后端，直接改文件即可更新内容 |
| 动效 | Framer Motion | 卡片动画、进度条过渡效果 |
| 部署 | Vercel | 与 Next.js 无缝集成，免费额度足够个人项目 |

---

## 目录结构

```
llm-learning-hub/
├── app/                            # Next.js App Router 页面目录
│   ├── layout.tsx                  # 根布局（导航栏、页脚、主题配置）
│   ├── page.tsx                    # 首页：Hero + 项目速览 + 学习路径预览
│   ├── projects/
│   │   ├── page.tsx                # 全部项目卡片列表
│   │   └── [slug]/page.tsx         # 项目详情页（MVP 可直接跳转 GitHub）
│   ├── learning-path/
│   │   └── page.tsx                # 完整学习路径时间线
│   ├── resources/
│   │   └── page.tsx                # 资料库（支持分类筛选）
│   └── about/
│       └── page.tsx                # 个人介绍 + 联系方式
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx              # 顶部导航（含移动端菜单）
│   │   └── Footer.tsx
│   ├── projects/
│   │   └── ProjectCard.tsx         # 项目卡片：名称、技术标签、状态徽章、链接
│   ├── learning-path/
│   │   └── PathTimeline.tsx        # 阶段时间线，标记当前所处位置
│   ├── resources/
│   │   ├── ResourceCard.tsx        # 资料卡片：类型、难度、语言、是否免费
│   │   └── ResourceFilter.tsx      # 分类筛选 Tab（课程/论文/工具/社区）
│   └── ui/                         # shadcn/ui 组件 + 自定义基础 UI
│
├── data/
│   ├── projects.json               # 项目数据（名称、标签、状态、链接等）
│   ├── resources.json              # 资料数据（标题、链接、类型、难度等）
│   └── learning-path.json          # 学习路径数据（阶段列表、当前进度）
│
├── content/                        # MDX 文章（后期博客/学习笔记扩展用）
│   └── .gitkeep
│
├── public/
│   └── og-image.png                # 社交分享预览图（OpenGraph）
│
├── lib/
│   └── utils.ts                    # 工具函数：cn() 样式合并、数据读取函数
│
└── types/
    └── index.ts                    # TypeScript 类型定义（Project、Resource、PathStage）
```

---

## 数据结构示例

### `data/projects.json` — 项目列表
```json
[
  {
    "id": "agentic-rag-masterclass",
    "name": "Agentic RAG Masterclass",
    "description": "基于 Claude API 构建的多模块 RAG + Agent 流水线",
    "tags": ["RAG", "Agent", "Claude API"],
    "status": "in-progress",      // "planned" | "in-progress" | "completed"
    "githubUrl": "https://github.com/...",
    "demoUrl": null,
    "featured": true              // true 则在首页速览中展示
  }
]
```

### `data/resources.json` — 资料库
```json
[
  {
    "id": "attention-is-all-you-need",
    "title": "Attention Is All You Need",
    "url": "https://arxiv.org/abs/1706.03762",
    "type": "paper",              // "course" | "paper" | "tool" | "community" | "docs"
    "category": "foundations",
    "difficulty": "advanced",     // "beginner" | "intermediate" | "advanced"
    "language": "en",             // "en" | "zh"
    "free": true
  }
]
```

### `data/learning-path.json` — 学习路径
```json
{
  "currentStage": 2,              // 当前所处阶段编号，用于在时间线上标记进度
  "stages": [
    {
      "id": 1,
      "title": "基础层",
      "items": ["Transformer 架构", "API 调用", "Prompt Engineering"],
      "completed": true
    }
  ]
}
```

---

## 页面结构

```
首页 (/)
├── HeroSection          — 个人定位介绍 + 两个 CTA 按钮
├── ProjectsPreview      — 展示 3 个 featured 项目卡片
└── PathPreview          — 4 个学习阶段的简要概览

项目列表 (/projects)
└── ProjectCard[]        — 全部项目网格，可按标签/状态筛选

学习路径 (/learning-path)
└── PathTimeline         — 垂直时间线，标注当前阶段位置

资料库 (/resources)
├── ResourceFilter       — Tab 筛选：全部 / 课程 / 论文 / 工具 / 社区
└── ResourceCard[]       — 筛选后的资料列表

关于页 (/about)
└── 静态内容             — 个人简介、学习动机、联系方式
```

---

## 渲染策略

| 路由 | 渲染方式 | 原因 |
|------|----------|------|
| `/` | SSG 静态生成 | 内容固定，无需动态数据 |
| `/projects` | SSG | 数据来自本地 JSON |
| `/projects/[slug]` | SSG + `generateStaticParams` | 构建时预渲染所有项目页 |
| `/learning-path` | SSG | 静态内容 |
| `/resources` | SSG | 静态，筛选在客户端完成 |
| `/about` | SSG | 静态 |

MVP 阶段全部使用静态生成，无需 API 路由或服务端状态。

---

## 样式规范

- **暗色优先** — 以深色主题为默认，浅色主题可选
- **背景色** — zinc/neutral 深灰系
- **强调色** — 青色（cyan）或紫色（violet）高亮
- **卡片样式** — 渐变边框（`border border-white/10` + `bg-gradient-to-br`）
- **字体** — Geist Sans（Next.js 默认），代码片段使用等宽字体

---

## 部署流程

```
本地开发 → 推送到 GitHub main 分支 → Vercel 自动触发构建
                                        └── next build（SSG 静态输出）
                                        └── 静态文件通过 CDN 分发
```

MVP 阶段无需任何环境变量配置。
