import { notFound } from "next/navigation"
import Link from "next/link"
import { getGuideBySlug, getAllSlugs, directionMeta } from "@/lib/guides"
import { ArrowLeft, BookOpen, Layers, Cpu, FlaskConical, Tag } from "lucide-react"
import { cn } from "@/lib/utils"

export async function generateStaticParams() {
  return getAllSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  if (!guide) return {}
  return {
    title: `${guide.title} | LLM Hub`,
    description: guide.summary,
  }
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
    tag: "bg-cyan-500/10 text-cyan-400",
    icon: "bg-cyan-500/15 text-cyan-400",
    step: "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20",
    back: "hover:text-cyan-400",
  },
  violet: {
    badge: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    heading: "from-violet-400 to-purple-400",
    tag: "bg-violet-500/10 text-violet-400",
    icon: "bg-violet-500/15 text-violet-400",
    step: "bg-violet-500/15 text-violet-300 border border-violet-500/20",
    back: "hover:text-violet-400",
  },
  amber: {
    badge: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    heading: "from-amber-400 to-orange-400",
    tag: "bg-amber-500/10 text-amber-400",
    icon: "bg-amber-500/15 text-amber-400",
    step: "bg-amber-500/15 text-amber-300 border border-amber-500/20",
    back: "hover:text-amber-400",
  },
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = await getGuideBySlug(slug)
  if (!guide) notFound()

  const meta = directionMeta[guide.direction]
  const colors = colorMap[meta.color]
  const Icon = directionIcons[guide.direction as keyof typeof directionIcons] ?? BookOpen

  return (
    <main className="min-h-screen">
      {/* Top nav bar */}
      <div className="border-b border-white/8 bg-background/80 backdrop-blur-md sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-12 flex items-center gap-4">
          <Link
            href="/guides"
            className={cn(
              "flex items-center gap-1.5 text-sm text-muted-foreground transition-colors",
              colors.back
            )}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            架构指南库
          </Link>
          <span className="text-muted-foreground/30">/</span>
          <span className="text-sm text-muted-foreground truncate">{guide.title}</span>
        </div>
      </div>

      {/* Article header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center", colors.icon)}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", colors.badge)}>
            {meta.label}
          </span>
          {guide.steps && (
            <span className={cn("text-xs px-2.5 py-1 rounded-full font-medium", colors.step)}>
              {guide.steps} 步工程法
            </span>
          )}
        </div>

        <h1 className={cn(
          "text-4xl sm:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r bg-clip-text text-transparent",
          colors.heading
        )}>
          {guide.title}
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed mb-6 max-w-2xl">
          {guide.summary}
        </p>

        {guide.tags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <Tag className="w-3.5 h-3.5 text-muted-foreground/50" />
            {guide.tags.map(tag => (
              <span key={tag} className={cn("text-xs px-2 py-0.5 rounded-md font-mono", colors.tag)}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="border-t border-white/8" />
      </div>

      {/* Article body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div
          className="guide-prose"
          dangerouslySetInnerHTML={{ __html: guide.html }}
        />
      </div>

      {/* Footer nav */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
        <div className="border-t border-white/8 pt-8">
          <Link
            href="/guides"
            className={cn(
              "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors",
              colors.back
            )}
          >
            <ArrowLeft className="w-4 h-4" />
            返回架构指南库
          </Link>
        </div>
      </div>
    </main>
  )
}
