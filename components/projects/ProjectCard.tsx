import Link from "next/link"
import { GitBranch, ExternalLink, Clock, CheckCircle, Lightbulb } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Project, ProjectStatus } from "@/types"

const statusConfig: Record<
  ProjectStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  planned: {
    label: "规划中",
    icon: Lightbulb,
    className: "bg-zinc-800 text-zinc-400 border-zinc-700",
  },
  "in-progress": {
    label: "进行中",
    icon: Clock,
    className: "bg-cyan-950 text-cyan-400 border-cyan-800",
  },
  completed: {
    label: "已完成",
    icon: CheckCircle,
    className: "bg-emerald-950 text-emerald-400 border-emerald-800",
  },
}

/* 根据 tag 内容给不同颜色 */
const tagColor = (tag: string) => {
  const map: Record<string, string> = {
    RAG: "bg-cyan-950/60 text-cyan-300 border-cyan-800/50",
    Agent: "bg-violet-950/60 text-violet-300 border-violet-800/50",
    "Fine-tuning": "bg-orange-950/60 text-orange-300 border-orange-800/50",
    LoRA: "bg-orange-950/60 text-orange-300 border-orange-800/50",
    PEFT: "bg-orange-950/60 text-orange-300 border-orange-800/50",
    多模态: "bg-pink-950/60 text-pink-300 border-pink-800/50",
    Vision: "bg-pink-950/60 text-pink-300 border-pink-800/50",
  }
  return map[tag] ?? "bg-zinc-800/60 text-zinc-300 border-zinc-700/50"
}

export function ProjectCard({ project }: { project: Project }) {
  const status = statusConfig[project.status]
  const StatusIcon = status.icon

  return (
    <div className="group relative rounded-xl bg-card border border-white/8 p-6 flex flex-col gap-4 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-950/20">
      {/* 顶部：状态徽章 */}
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border font-medium",
            status.className
          )}
        >
          <StatusIcon className="w-3 h-3" />
          {status.label}
        </span>

        {/* 链接图标 */}
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.githubUrl && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub 仓库"
            >
              <GitBranch className="w-4 h-4" />
            </Link>
          )}
          {project.demoUrl && (
            <Link
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="演示地址"
            >
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>

      {/* 项目名称 + 描述 */}
      <div className="flex-1">
        <h3 className="font-semibold text-foreground mb-2 group-hover:text-cyan-400 transition-colors">
          {project.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* 技术标签 */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "text-xs px-2 py-0.5 rounded-md border font-mono",
              tagColor(tag)
            )}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
