import Link from "next/link"
import { ExternalLink, BookOpen, Wrench, FileText, Users, Code } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Resource, ResourceType } from "@/types"

const typeConfig: Record<
  ResourceType,
  { label: string; icon: React.ElementType; color: string }
> = {
  course: {
    label: "课程",
    icon: BookOpen,
    color: "text-sky-400 bg-sky-950/60 border-sky-800/50",
  },
  paper: {
    label: "论文",
    icon: FileText,
    color: "text-violet-400 bg-violet-950/60 border-violet-800/50",
  },
  tool: {
    label: "工具",
    icon: Wrench,
    color: "text-orange-400 bg-orange-950/60 border-orange-800/50",
  },
  community: {
    label: "社区",
    icon: Users,
    color: "text-emerald-400 bg-emerald-950/60 border-emerald-800/50",
  },
  docs: {
    label: "文档",
    icon: Code,
    color: "text-zinc-300 bg-zinc-800/60 border-zinc-700/50",
  },
}

const difficultyLabel: Record<string, { label: string; color: string }> = {
  beginner: { label: "入门", color: "text-emerald-400" },
  intermediate: { label: "进阶", color: "text-yellow-400" },
  advanced: { label: "深入", color: "text-red-400" },
}

const langLabel: Record<string, string> = {
  en: "英文",
  zh: "中文",
  both: "中英",
}

export function ResourceCard({ resource }: { resource: Resource }) {
  const type = typeConfig[resource.type]
  const TypeIcon = type.icon
  const diff = difficultyLabel[resource.difficulty]

  return (
    <Link
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-card border border-white/8 p-5 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-md hover:shadow-cyan-950/20"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        {/* 类型徽章 */}
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium shrink-0",
            type.color
          )}
        >
          <TypeIcon className="w-3 h-3" />
          {type.label}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5" />
      </div>

      <h3 className="font-medium text-sm text-foreground mb-2 leading-snug group-hover:text-cyan-400 transition-colors line-clamp-2">
        {resource.title}
      </h3>

      <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-2">
        {resource.description}
      </p>

      {/* 元信息 */}
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className={diff.color}>{diff.label}</span>
        <span className="text-zinc-700">·</span>
        <span>{langLabel[resource.language]}</span>
        <span className="text-zinc-700">·</span>
        <span className={resource.free ? "text-emerald-500" : "text-zinc-500"}>
          {resource.free ? "免费" : "付费"}
        </span>
      </div>
    </Link>
  )
}
