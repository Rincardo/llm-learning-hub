import { AnimateIn } from "@/components/ui/AnimateIn"
import { ResourcesClient } from "@/components/resources/ResourcesClient"
import resources from "@/data/resources.json"
import type { Resource } from "@/types"

export const metadata = {
  title: "资料库 · LLM Learning Hub",
  description: "大模型开发精选学习资料：课程、论文、工具、社区——按类型筛选，快速找到你需要的内容。",
}

export default function ResourcesPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      {/* 页头 */}
      <AnimateIn>
        <div className="mb-12">
          <p className="text-xs text-emerald-400 font-mono uppercase tracking-widest mb-3">
            Resources
          </p>
          <h1 className="text-4xl font-bold mb-4">资料库</h1>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            精选大模型开发学习资料，涵盖课程、论文、工具和优质社区，持续收录中。
          </p>
          <div className="flex flex-wrap gap-5 mt-6 text-sm text-muted-foreground">
            <span>
              共{" "}
              <span className="text-foreground font-semibold">
                {resources.length}
              </span>{" "}
              条资料
            </span>
            <span>
              免费{" "}
              <span className="text-emerald-400 font-semibold">
                {resources.filter((r) => r.free).length}
              </span>{" "}
              条
            </span>
          </div>
        </div>
      </AnimateIn>

      {/* 筛选 + 资料网格（客户端交互） */}
      <AnimateIn delay={0.1}>
        <ResourcesClient resources={resources as Resource[]} />
      </AnimateIn>
    </div>
  )
}
