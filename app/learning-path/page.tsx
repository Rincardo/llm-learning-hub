import { Target, Wrench, FlaskConical, BookOpen } from "lucide-react"
import Link from "next/link"
import { PathTimeline } from "@/components/learning-path/PathTimeline"
import { AnimateIn } from "@/components/ui/AnimateIn"
import pathData from "@/data/learning-path.json"
import type { LearningPath, Direction } from "@/types"

export const metadata = {
  title: "学习路径 · LLM Learning Hub",
  description: "大模型开发三大方向解析 + 系统学习路径：从 Prompt Engineering 到 RAG、Agent，清晰记录每个阶段的具体技能与进展。",
}

const directionGuides: Record<number, { label: string; slug: string }[]> = {
  1: [
    { label: "Prompt Engineering", slug: "prompt-engineering" },
    { label: "高级 RAG 架构", slug: "rag" },
    { label: "Workflow 工作流", slug: "workflow" },
    { label: "Agentic 智能体", slug: "agentic" },
  ],
  2: [
    { label: "推理加速部署", slug: "inference-serving" },
    { label: "评测与 LLMOps 平台", slug: "evaluation-platform" },
  ],
  3: [
    { label: "算法与微调", slug: "algorithm-tuning" },
  ],
}

const stageGuides: Record<number, { label: string; slug: string }[]> = {
  1: [{ label: "Prompt Engineering 架构指南", slug: "prompt-engineering" }],
  2: [{ label: "高级 RAG 系统架构指南", slug: "rag" }],
  3: [
    { label: "Agentic 智能体架构指南", slug: "agentic" },
    { label: "Workflow 工作流架构指南", slug: "workflow" },
  ],
  4: [
    { label: "推理加速部署架构指南", slug: "inference-serving" },
    { label: "算法与微调架构指南", slug: "algorithm-tuning" },
  ],
}

const directionConfig: Record<
  Direction["color"],
  { border: string; bg: string; text: string; badge: string; chip: string; icon: React.ElementType }
> = {
  cyan: {
    border: "border-cyan-700/50",
    bg: "bg-cyan-950/25",
    text: "text-cyan-400",
    badge: "bg-cyan-950 text-cyan-400 border-cyan-800",
    chip: "bg-cyan-950/60 text-cyan-400 border-cyan-800/60 hover:border-cyan-600",
    icon: Target,
  },
  violet: {
    border: "border-violet-700/40",
    bg: "bg-violet-950/20",
    text: "text-violet-400",
    badge: "bg-violet-950 text-violet-400 border-violet-800",
    chip: "bg-violet-950/60 text-violet-400 border-violet-800/60 hover:border-violet-600",
    icon: Wrench,
  },
  amber: {
    border: "border-amber-700/30",
    bg: "bg-amber-950/15",
    text: "text-amber-400",
    badge: "bg-amber-950 text-amber-400 border-amber-800",
    chip: "bg-amber-950/60 text-amber-400 border-amber-800/60 hover:border-amber-600",
    icon: FlaskConical,
  },
}

export default function LearningPathPage() {
  const { stages, currentStage, directions } = pathData as LearningPath

  const totalItems = stages.flatMap((s) => s.items).length
  const doneItems = stages.flatMap((s) => s.items).filter((i) => i.done).length
  const progressPct = Math.round((doneItems / totalItems) * 100)
  const focusDirection = directions.find((d) => d.isFocus)

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">

      {/* ===== 页头 ===== */}
      <AnimateIn>
        <div className="mb-12">
          <p className="text-xs text-violet-400 font-mono uppercase tracking-widest mb-3">
            Learning Path
          </p>
          <h1 className="text-4xl font-bold mb-4">学习路径</h1>
          <p className="text-muted-foreground leading-relaxed">
            大模型开发分为三大方向，每个方向对应不同的职业定位与技能栈。
            当前主攻<span className="text-cyan-400 font-medium">方向一：应用层开发</span>，
            沿 RAG → Agent 路线深度推进。
          </p>
        </div>
      </AnimateIn>

      {/* ===== 三大方向总览 ===== */}
      <AnimateIn delay={0.05}>
        <section className="mb-14">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-5">
            三大方向定位
          </h2>
          <div className="grid gap-3">
            {(directions as Direction[]).map((dir) => {
              const cfg = directionConfig[dir.color]
              const Icon = cfg.icon
              return (
                <div
                  key={dir.id}
                  className={`relative rounded-xl border p-5 transition-all ${
                    dir.isFocus
                      ? `${cfg.border} ${cfg.bg}`
                      : "border-white/7 bg-card"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        dir.isFocus ? cfg.bg + " border " + cfg.border : "bg-zinc-800 border border-zinc-700"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${dir.isFocus ? cfg.text : "text-zinc-500"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span
                          className={`font-semibold ${dir.isFocus ? cfg.text : "text-muted-foreground"}`}
                        >
                          方向 {dir.id}：{dir.title}
                        </span>
                        <span className="text-xs text-zinc-600 font-mono">{dir.englishTitle}</span>
                        {dir.isFocus && (
                          <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${cfg.badge}`}>
                            当前主攻
                          </span>
                        )}
                        {!dir.isFocus && dir.color === "violet" && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500 font-medium">
                            扩展视野
                          </span>
                        )}
                        {!dir.isFocus && dir.color === "amber" && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full border border-zinc-700 text-zinc-500 font-medium">
                            了解概念
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-500 mb-1">{dir.tagline}</p>
                      <p
                        className={`text-sm ${
                          dir.isFocus ? "text-muted-foreground" : "text-zinc-600"
                        }`}
                      >
                        {dir.description}
                      </p>
                      {/* 相关架构指南链接 */}
                      {directionGuides[dir.id] && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-white/6">
                          <span className="flex items-center gap-1 text-[11px] text-zinc-600 mr-0.5">
                            <BookOpen className="w-3 h-3" />
                            架构指南
                          </span>
                          {directionGuides[dir.id].map(g => (
                            <Link
                              key={g.slug}
                              href={`/guides/${g.slug}`}
                              className={`text-[11px] px-2 py-0.5 rounded border font-medium transition-colors ${cfg.chip}`}
                            >
                              {g.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </AnimateIn>

      {/* ===== 整体进度条 ===== */}
      <AnimateIn delay={0.1}>
        <section className="mb-12">
          <div className="rounded-xl border border-white/8 bg-card p-5">
            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-muted-foreground">
                方向一进度 · 当前阶段 {currentStage}：
                <span className="text-cyan-400 font-medium ml-1">
                  {stages[currentStage - 1]?.title}
                </span>
              </span>
              <span className="font-mono font-semibold text-cyan-400">
                {doneItems} / {totalItems}
              </span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>基础准备</span>
              <span>RAG 深度</span>
              <span>Agent</span>
              <span>工程全景</span>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* ===== 详细路径时间线 ===== */}
      <AnimateIn delay={0.15}>
        <section className="mb-14">
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-8">
            详细学习路径
          </h2>
          <PathTimeline stages={stages} stageGuides={stageGuides} />
        </section>
      </AnimateIn>

      {/* ===== 面试策略建议 ===== */}
      <AnimateIn delay={0.2}>
        <section>
          <h2 className="text-sm font-semibold text-zinc-500 uppercase tracking-widest mb-5">
            求职建议
          </h2>
          <div className="space-y-3">
            {[
              {
                num: "01",
                title: "专注破局",
                content:
                  "死磕方向一的高级 RAG + Agentic 技术栈。能把 Hybrid Search、ReAct、TTFT 等词汇结合具体项目说透，已能打败大多数求职者。",
                color: "text-cyan-400",
              },
              {
                num: "02",
                title: "拓展工程视野",
                content:
                  "跑通一次 LLaMA-Factory 的 LoRA 微调，以及用 vLLM 本地部署开源模型，证明自己具备「全链路」开发思维。",
                color: "text-violet-400",
              },
              {
                num: "03",
                title: "面试话术参考",
                content:
                  "「我核心聚焦应用层，用混合检索解决 RAG 幻觉，用 LangGraph 搭建智能体工作流。同时了解 vLLM 推理原理，清楚何时需要 LoRA SFT 微调。」",
                color: "text-amber-400",
              },
            ].map((tip) => (
              <div
                key={tip.num}
                className="flex gap-4 rounded-xl border border-white/7 bg-card p-5"
              >
                <span className={`font-mono text-sm font-bold shrink-0 mt-0.5 ${tip.color}`}>
                  {tip.num}
                </span>
                <div>
                  <div className="font-medium text-foreground mb-1">{tip.title}</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tip.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

    </div>
  )
}
