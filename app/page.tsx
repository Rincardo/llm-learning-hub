import Link from "next/link"
import { ArrowRight, BookOpen, FolderOpen, Layers } from "lucide-react"
import { ProjectCard } from "@/components/projects/ProjectCard"
import { AnimateIn } from "@/components/ui/AnimateIn"
import projects from "@/data/projects.json"
import resources from "@/data/resources.json"
import pathData from "@/data/learning-path.json"
import type { Project } from "@/types"

const stageColors = [
  "border-emerald-800/40 bg-emerald-950/20 text-emerald-400",
  "border-cyan-800/40 bg-cyan-950/20 text-cyan-400",
  "border-zinc-700/40 bg-zinc-900/50 text-zinc-400",
  "border-zinc-700/40 bg-zinc-900/50 text-zinc-400",
]

const techTags = [
  "RAG", "Agent", "Transformer", "Claude API", "Prompt Engineering",
  "LangChain", "LlamaIndex", "向量数据库", "Fine-tuning", "LoRA",
  "Chroma", "Ollama", "多模态", "vLLM", "Hugging Face",
]

export default function HomePage() {
  const featured = (projects as Project[]).filter((p) => p.featured)
  const inProgressCount = (projects as Project[]).filter((p) => p.status === "in-progress").length
  const totalProjects = projects.length

  return (
    <>
      {/* ==================== Hero 区 ==================== */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden py-20">
        {/* 背景网格 */}
        <div className="absolute inset-0 bg-grid opacity-60" />
        {/* 径向遮罩 */}
        <div className="absolute inset-0 bg-radial-fade" />
        {/* 左上 + 右下光晕 */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[400px] bg-cyan-500/6 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] bg-violet-500/6 blur-[100px] rounded-full pointer-events-none" />

        <div className="relative z-10 text-center w-full max-w-5xl mx-auto px-4">
          {/* 主标题 */}
          <AnimateIn delay={0}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-5 tracking-tight leading-[1.05]">
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400 bg-clip-text text-transparent">
                LLM Learning
              </span>
              <br />
              <span className="text-foreground">Hub</span>
            </h1>
          </AnimateIn>

          {/* 副标题 */}
          <AnimateIn delay={0.1}>
            <p className="text-xl sm:text-2xl text-muted-foreground mb-3 font-light tracking-wide">
              大模型开发 · 学习路径 · 项目记录 · 资料精选
            </p>
            <p className="text-sm text-zinc-600 mb-10">
              RAG · Agent · Fine-tuning · 向量数据库 · Prompt Engineering
            </p>
          </AnimateIn>

          {/* CTA 按钮 */}
          <AnimateIn delay={0.2}>
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-sm transition-colors whitespace-nowrap shadow-lg shadow-cyan-500/20"
              >
                查看项目 <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/learning-path"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-white/12 hover:border-white/25 hover:bg-white/5 text-foreground font-medium text-sm transition-all whitespace-nowrap"
              >
                学习路径
              </Link>
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl border border-white/12 hover:border-violet-500/40 hover:bg-violet-950/20 text-foreground font-medium text-sm transition-all whitespace-nowrap"
              >
                资料库
              </Link>
            </div>
          </AnimateIn>

          {/* 数据统计条 */}
          <AnimateIn delay={0.3}>
            <div className="inline-flex items-center divide-x divide-white/8 rounded-2xl border border-white/8 bg-white/3 backdrop-blur-sm overflow-hidden mb-12">
              <div className="flex items-center gap-3 px-7 py-4">
                <FolderOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground leading-none">{totalProjects}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">个项目</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-7 py-4">
                <BookOpen className="w-4 h-4 text-violet-400 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground leading-none">{resources.length}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">条精选资料</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-7 py-4">
                <Layers className="w-4 h-4 text-emerald-400 shrink-0" />
                <div className="text-left">
                  <div className="text-lg font-bold text-foreground leading-none">{pathData.stages.length}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">个学习阶段</div>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* 技术标签云 */}
          <AnimateIn delay={0.4}>
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {techTags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs border border-white/8 bg-white/4 text-zinc-500 hover:text-zinc-300 hover:border-white/15 transition-colors cursor-default"
                  style={{ animationDelay: `${i * 0.03}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>

        {/* 底部渐隐 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
      </section>

      {/* ==================== 精选项目区 ==================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
        <AnimateIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-cyan-400 font-mono uppercase tracking-widest mb-2">
                Projects
              </p>
              <h2 className="text-3xl font-bold">精选项目</h2>
              <p className="text-sm text-muted-foreground mt-1">
                {inProgressCount} 个进行中 · 持续更新
              </p>
            </div>
            <Link
              href="/projects"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-cyan-400 transition-colors"
            >
              全部项目 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, i) => (
            <AnimateIn key={project.id} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ==================== 学习路径预览 ==================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <AnimateIn>
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs text-violet-400 font-mono uppercase tracking-widest mb-2">
                Learning Path
              </p>
              <h2 className="text-3xl font-bold">学习路径</h2>
              <p className="text-sm text-muted-foreground mt-1">
                当前：阶段 {pathData.currentStage} · {pathData.stages[pathData.currentStage - 1]?.title}
              </p>
            </div>
            <Link
              href="/learning-path"
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-violet-400 transition-colors"
            >
              查看详情 <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimateIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pathData.stages.map((stage, i) => (
            <AnimateIn key={stage.id} delay={i * 0.08}>
              <div className={`rounded-xl border p-5 h-full flex flex-col ${stageColors[i]}`}>
                <div className="text-xs font-mono mb-1 opacity-60">{stage.direction}</div>
                <div className="font-semibold mb-1">{stage.title}</div>
                <div className="text-xs opacity-60 leading-relaxed mb-3">{stage.subtitle}</div>
                {/* 关键词预览 */}
                <div className="flex flex-wrap gap-1 mt-auto">
                  {stage.keywords.slice(0, 3).map((kw) => (
                    <span key={kw} className="text-[10px] px-1.5 py-0.5 rounded border border-current/20 bg-current/5 opacity-70 font-mono">
                      {kw}
                    </span>
                  ))}
                </div>
                {stage.current && (
                  <div className="mt-3 text-xs font-medium text-cyan-400 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
                    当前阶段
                  </div>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>
    </>
  )
}
