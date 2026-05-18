# LLM Learning Hub · 大模型开发学习门户

一个记录我大模型开发学习历程的个人作品集网站，涵盖项目展示、学习路径追踪、企业级架构指南与技术资料库。

🔗 **在线访问**：[llm-learning-hub.vercel.app](https://llm-learning-hub.vercel.app)（部署后更新此链接）

---

## 网站功能

| 模块 | 内容 |
|---|---|
| **首页** | 技术方向概览、精选项目、学习进度预览 |
| **项目展示** | RAG / Agent / 全栈项目的技术说明与进展 |
| **学习路径** | 大模型三大方向定位 + 4 阶段技能打卡时间线 |
| **架构指南** | 8 篇企业级大模型开发标准架构文档（含顶级论文溯源） |
| **资料库** | 精选论文、课程、框架文档与工具 |
| **关于** | 个人背景与联系方式 |

---

## 架构指南目录

网站收录了以下 8 篇工业级开发架构指南，提炼自一线大厂标准实践：

**方向一：应用层开发**
- Prompt Engineering 5 步标准架构
- 高级 RAG 系统 7 步标准架构
- LLM Workflow 工作流 5 步标准架构
- Agentic 自主智能体 6 步标准架构

**方向二：工程化平台层**
- 模型推理加速与高并发部署 5 步架构
- 评测监控与低代码 LLMOps 平台 5 步架构

**方向三：算法与微调层**
- 大模型算法与微调（LoRA / QLoRA / DPO）5 步架构

---

## 技术栈

| 技术 | 用途 |
|---|---|
| **Next.js 16** (App Router) | 核心框架，全站 SSG 静态生成 |
| **React 19** | UI 组件 |
| **Tailwind CSS v4** | 样式系统 |
| **Framer Motion** | 页面动画 |
| **shadcn/ui** | UI 组件库 |
| **gray-matter** | Markdown frontmatter 解析 |
| **marked** | Markdown 转 HTML 渲染 |

---

## 本地运行

```bash
# 克隆仓库
git clone https://github.com/Rincardo/llm-learning-hub.git
cd llm-learning-hub

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看。

---

## 项目结构

```
llm-learning-hub/
├── app/                    # Next.js App Router 页面
│   ├── page.tsx            # 首页
│   ├── projects/           # 项目展示页
│   ├── learning-path/      # 学习路径页
│   ├── guides/             # 架构指南列表 & 详情页
│   ├── resources/          # 资料库
│   └── about/              # 关于页
├── components/             # 可复用 UI 组件
├── content/guides/         # 架构指南 Markdown 文件
├── data/                   # 项目、资料、学习路径 JSON 数据
├── lib/                    # 工具函数（guides 解析等）
└── types/                  # TypeScript 类型定义
```

---

## 更新内容

网站数据均存放在 `data/` 和 `content/guides/` 目录下，修改后推送即可自动部署：

```bash
git add .
git commit -m "更新学习进度"
git push
# Vercel 检测到推送后自动重新部署，约 1 分钟后生效
```

---

## 联系方式

- 邮箱：1033464622@qq.com
- GitHub：[@Rincardo](https://github.com/Rincardo)
