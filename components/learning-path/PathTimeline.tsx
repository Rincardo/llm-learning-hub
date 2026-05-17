import Link from "next/link"
import { CheckCircle, Circle, Zap, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import type { PathStage } from "@/types"

type GuideLink = { label: string; slug: string }

function KeywordBadge({ word }: { word: string }) {
  return (
    <span className="inline-block px-2 py-0.5 text-[11px] font-mono rounded border border-white/10 bg-white/4 text-zinc-400">
      {word}
    </span>
  )
}

function StageNode({ stage, isLast, guides }: { stage: PathStage; isLast: boolean; guides?: GuideLink[] }) {
  return (
    <div className="flex gap-5 sm:gap-8">
      {/* 左侧轴线 */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center border-2 z-10",
            stage.completed
              ? "bg-emerald-950 border-emerald-500 text-emerald-400"
              : stage.current
              ? "bg-cyan-950 border-cyan-500 text-cyan-400 shadow-[0_0_16px_2px_rgba(34,211,238,0.2)]"
              : "bg-zinc-900 border-zinc-700 text-zinc-500"
          )}
        >
          {stage.completed ? (
            <CheckCircle className="w-5 h-5" />
          ) : stage.current ? (
            <Zap className="w-5 h-5" />
          ) : (
            <span className="text-xs font-mono font-bold">{stage.id}</span>
          )}
        </div>
        {!isLast && (
          <div
            className={cn(
              "w-px flex-1 my-2 min-h-[40px]",
              stage.completed ? "bg-emerald-800/40" : "bg-zinc-800"
            )}
          />
        )}
      </div>

      {/* 右侧内容 */}
      <div className="pb-10 flex-1 min-w-0">
        {/* 阶段标题行 */}
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <span className="text-xs font-mono text-zinc-600">
            {stage.direction}
          </span>
          {stage.current && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800 font-medium">
              当前阶段
            </span>
          )}
          {stage.completed && (
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 font-medium">
              已完成
            </span>
          )}
        </div>
        <h3
          className={cn(
            "font-semibold text-xl mb-1",
            stage.current ? "text-cyan-400" : stage.completed ? "text-emerald-400" : "text-muted-foreground"
          )}
        >
          {stage.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{stage.subtitle}</p>

        {/* 技能清单 */}
        <div
          className={cn(
            "rounded-xl border p-4 mb-3",
            stage.current
              ? "border-cyan-800/40 bg-cyan-950/15"
              : stage.completed
              ? "border-emerald-800/30 bg-emerald-950/10"
              : "border-white/6 bg-card"
          )}
        >
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {stage.items.map((item) => (
              <div key={item.title} className="flex items-start gap-2">
                {item.done ? (
                  <CheckCircle className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-zinc-700 mt-0.5 shrink-0" />
                )}
                <span
                  className={cn(
                    "text-sm leading-snug",
                    item.done ? "text-foreground" : "text-zinc-500"
                  )}
                >
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 面试关键词 */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] text-zinc-600 mr-1">面试词汇</span>
          {stage.keywords.map((kw) => (
            <KeywordBadge key={kw} word={kw} />
          ))}
        </div>

        {/* 参考架构指南 */}
        {guides && guides.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
            <span className="flex items-center gap-1 text-[11px] text-zinc-600">
              <BookOpen className="w-3 h-3" />
              架构指南
            </span>
            {guides.map(g => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className={cn(
                  "text-[11px] px-2 py-0.5 rounded border font-medium transition-colors",
                  stage.current
                    ? "bg-cyan-950/60 text-cyan-400 border-cyan-800/60 hover:border-cyan-600"
                    : stage.completed
                    ? "bg-emerald-950/40 text-emerald-400 border-emerald-800/40 hover:border-emerald-600"
                    : "bg-zinc-900 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-400"
                )}
              >
                {g.label} →
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export function PathTimeline({
  stages,
  stageGuides,
}: {
  stages: PathStage[]
  stageGuides?: Record<number, GuideLink[]>
}) {
  return (
    <div>
      {stages.map((stage, i) => (
        <StageNode
          key={stage.id}
          stage={stage}
          isLast={i === stages.length - 1}
          guides={stageGuides?.[stage.id]}
        />
      ))}
    </div>
  )
}
