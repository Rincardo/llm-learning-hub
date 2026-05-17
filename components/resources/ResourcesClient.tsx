"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { ResourceCard } from "./ResourceCard"
import type { Resource, ResourceType } from "@/types"

type FilterValue = "all" | ResourceType

const filters: { value: FilterValue; label: string }[] = [
  { value: "all", label: "全部" },
  { value: "course", label: "课程" },
  { value: "paper", label: "论文" },
  { value: "tool", label: "工具" },
  { value: "community", label: "社区" },
  { value: "docs", label: "文档" },
]

export function ResourcesClient({ resources }: { resources: Resource[] }) {
  const [active, setActive] = useState<FilterValue>("all")

  const filtered =
    active === "all" ? resources : resources.filter((r) => r.type === active)

  return (
    <div>
      {/* 筛选 Tab */}
      <div className="flex flex-wrap gap-2 mb-8">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm border transition-all duration-200 font-medium",
              active === f.value
                ? "bg-cyan-500 text-black border-cyan-500"
                : "bg-transparent text-muted-foreground border-white/10 hover:border-white/20 hover:text-foreground"
            )}
          >
            {f.label}
            <span className="ml-1.5 text-xs opacity-60">
              {f.value === "all"
                ? resources.length
                : resources.filter((r) => r.type === f.value).length}
            </span>
          </button>
        ))}
      </div>

      {/* 资料网格 */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          该分类暂无资料
        </div>
      )}
    </div>
  )
}
