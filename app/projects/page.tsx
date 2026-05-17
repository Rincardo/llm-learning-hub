import { ProjectCard } from "@/components/projects/ProjectCard"
import { StaggerList, StaggerItem } from "@/components/ui/AnimateIn"
import projects from "@/data/projects.json"
import type { Project } from "@/types"

export const metadata = {
  title: "项目展示 · LLM Learning Hub",
  description: "大模型开发学习过程中的真实项目——RAG、Agent、Fine-tuning 等方向实践记录。",
}

export default function ProjectsPage() {
  const allProjects = projects as Project[]
  const inProgress = allProjects.filter((p) => p.status === "in-progress")
  const planned = allProjects.filter((p) => p.status === "planned")
  const completed = allProjects.filter((p) => p.status === "completed")

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* 页头 */}
      <div className="mb-14">
        <p className="text-xs text-cyan-400 font-mono uppercase tracking-widest mb-3">Projects</p>
        <h1 className="text-4xl font-bold mb-4">项目展示</h1>
        <p className="text-muted-foreground max-w-xl leading-relaxed">
          系统学习大模型开发过程中构建的真实项目，覆盖 RAG、Agent、工具应用等方向，持续更新中。
        </p>
        {/* 统计概览 */}
        <div className="flex flex-wrap gap-6 mt-6 text-sm">
          <div>
            <span className="text-cyan-400 font-semibold">{inProgress.length}</span>
            <span className="text-muted-foreground ml-1.5">进行中</span>
          </div>
          <div>
            <span className="text-zinc-400 font-semibold">{planned.length}</span>
            <span className="text-muted-foreground ml-1.5">规划中</span>
          </div>
          {completed.length > 0 && (
            <div>
              <span className="text-emerald-400 font-semibold">{completed.length}</span>
              <span className="text-muted-foreground ml-1.5">已完成</span>
            </div>
          )}
        </div>
      </div>

      {/* 进行中 */}
      {inProgress.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-semibold text-cyan-400 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" />
            进行中
          </h2>
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgress.map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerList>
        </section>
      )}

      {/* 规划中 */}
      {planned.length > 0 && (
        <section className="mb-14">
          <h2 className="text-sm font-semibold text-zinc-500 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
            规划中
          </h2>
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {planned.map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerList>
        </section>
      )}

      {/* 已完成 */}
      {completed.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-emerald-400 mb-5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
            已完成
          </h2>
          <StaggerList className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {completed.map((p) => (
              <StaggerItem key={p.id}>
                <ProjectCard project={p} />
              </StaggerItem>
            ))}
          </StaggerList>
        </section>
      )}
    </div>
  )
}
