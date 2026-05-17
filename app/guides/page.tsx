import Link from "next/link"
import { getAllGuides, directionMeta, GuideMetadata } from "@/lib/guides"
import { AnimateIn, StaggerList, StaggerItem } from "@/components/ui/AnimateIn"
import { BookOpen, Layers, Cpu, FlaskConical, ArrowRight, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "架构指南 | LLM Hub",
  description: "大中小厂大模型开发标准架构指南，覆盖应用层、工程化与算法微调三大方向",
}

const directionIcons = {
  0: BookOpen,
  1: Layers,
  2: Cpu,
  3: FlaskConical,
}

const colorMap = {
  cyan: {
    badge: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20",
    heading: "from-cyan-400 to-sky-400",
    card: "hover:border-cyan-500/40 hover:shadow-[0_0_20px_rgba(34,211,238,0.06)]",
    tag: "bg-cyan-500/10 text-cyan-400",
    icon: "bg-cyan-500/15 text-cyan-400",
    step: "bg-cyan-500/15 text-cyan-400 border border-cyan-500/20",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    heading: "from-violet-400 to-purple-400",
    card: "hover:border-violet-500/40 hover:shadow-[0_0_20px_rgba(167,139,250,0.06)]",
    tag: "bg-violet-500/10 text-violet-400",
    icon: "bg-violet-500/15 text-violet-400",
    step: "bg-violet-500/15 text-violet-400 border border-violet-500/20",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    heading: "from-amber-400 to-orange-400",
    card: "hover:border-amber-500/40 hover:shadow-[0_0_20px_rgba(251,191,36,0.06)]",
    tag: "bg-amber-500/10 text-amber-400",
    icon: "bg-amber-500/15 text-amber-400",
    step: "bg-amber-500/15 text-amber-400 border border-amber-500/20",
  },
}

function GuideCard({ guide }: { guide: GuideMetadata }) {
  const meta = directionMeta[guide.direction]
  const colors = colorMap[meta.color]

  return (
    <Link
      href={`/guides/${guide.slug}`}
      className={cn(
        "group block rounded-2xl border border-white/8 bg-card p-6 transition-all duration-300",
        colors.card
      )}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", colors.badge)}>
              {meta.label}
            </span>
            {guide.steps && (
              <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", colors.step)}>
                {guide.steps} 步工程法
              </span>
            )}
          </div>
          <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-white transition-colors">
            {guide.title}
          </h3>
        </div>
        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all shrink-0 mt-1" />
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
        {guide.summary}
      </p>

      <div className="flex flex-wrap gap-1.5">
        {guide.tags.map(tag => (
          <span key={tag} className={cn("text-xs px-2 py-0.5 rounded-md font-mono", colors.tag)}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  )
}

export default function GuidesPage() {
  const allGuides = getAllGuides()
  const overview = allGuides.find(g => g.direction === 0)
  const dir1Guides = allGuides.filter(g => g.direction === 1)
  const dir2Guides = allGuides.filter(g => g.direction === 2)
  const dir3Guides = allGuides.filter(g => g.direction === 3)

  const sections = [
    { key: 1, guides: dir1Guides },
    { key: 2, guides: dir2Guides },
    { key: 3, guides: dir3Guides },
  ]

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-white/8 bg-grid relative overflow-hidden">
        <div className="bg-radial-fade absolute inset-0" />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20">
          <AnimateIn>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-muted-foreground mb-6">
                <BookOpen className="w-3.5 h-3.5" />
                企业级架构指南
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-4">
                <span className="bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
                  大模型开发
                </span>
                <br />
                <span className="text-foreground">架构指南库</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                提炼一线大厂（字节、阿里、腾讯）的标准工程实践，覆盖应用层、工程化平台与算法微调三大核心方向，附顶级学术论文溯源与面试高优词汇。
              </p>
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-cyan-400" /> 应用层 4 篇</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-violet-400" /> 工程化 2 篇</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400" /> 算法层 1 篇</span>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-16">
        {/* Overview card */}
        {overview && (
          <AnimateIn>
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
                全景总览
              </h2>
              <Link
                href={`/guides/${overview.slug}`}
                className="group block rounded-2xl border border-white/8 bg-gradient-to-br from-card to-white/2 p-8 hover:border-white/20 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.03)]"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-violet-500/20 to-amber-500/20 flex items-center justify-center border border-white/10">
                        <BookOpen className="w-5 h-5 text-foreground/60" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground">入门必读</div>
                        <h3 className="text-lg font-semibold group-hover:text-white transition-colors">
                          {overview.title}
                        </h3>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl">
                      {overview.summary}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {overview.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-md font-mono bg-white/6 text-muted-foreground">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground group-hover:gap-2 transition-all whitespace-nowrap">
                    查看指南 <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            </div>
          </AnimateIn>
        )}

        {/* Grouped direction sections */}
        {sections.map(({ key, guides }) => {
          if (!guides.length) return null
          const meta = directionMeta[key]
          const colors = colorMap[meta.color]
          const Icon = directionIcons[key as keyof typeof directionIcons]

          return (
            <AnimateIn key={key}>
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", colors.icon)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className={cn("text-lg font-semibold bg-gradient-to-r bg-clip-text text-transparent", colors.heading)}>
                      {meta.label}
                    </h2>
                    <p className="text-xs text-muted-foreground mt-0.5">{meta.desc}</p>
                  </div>
                </div>
                <StaggerList className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {guides.map(guide => (
                    <StaggerItem key={guide.slug}>
                      <GuideCard guide={guide} />
                    </StaggerItem>
                  ))}
                </StaggerList>
              </div>
            </AnimateIn>
          )
        })}
      </div>
    </main>
  )
}
