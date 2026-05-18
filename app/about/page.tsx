import Link from "next/link"
import { GitBranch, Mail, MapPin, BookOpen, Target, Zap, MessageCircle } from "lucide-react"
import { AnimateIn } from "@/components/ui/AnimateIn"

export const metadata = {
  title: "关于 · LLM Learning Hub",
  description: "系统学习大模型开发，目标大模型开发实习。",
}

const skills = [
  { category: "大模型应用", items: ["RAG 检索增强生成", "Agent & Tool Use", "Prompt Engineering", "向量数据库"] },
  { category: "开发框架", items: ["Python", "LangChain", "Next.js", "Node.js"] },
  { category: "模型 & API", items: ["Claude API", "OpenAI API", "Hugging Face", "Ollama"] },
]

const timeline = [
  { time: "2025 初", event: "开始系统学习大模型开发，完成 Claude / OpenAI API 调用实践，掌握 Prompt Engineering 基础" },
  { time: "2025 中", event: "深入 RAG 方向，构建 Agentic RAG Masterclass 项目，学习向量数据库（Chroma）" },
  { time: "进行中", event: "学习 Agent & Tool Use，探索 LangChain / LlamaIndex 框架，持续产出真实项目" },
  { time: "目标", event: "完成 Fine-tuning 与多模态方向实践，获得大模型开发相关实习岗位" },
]

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
      {/* 页头 */}
      <AnimateIn>
        <div className="mb-14">
          <p className="text-xs text-pink-400 font-mono uppercase tracking-widest mb-3">About</p>
          <h1 className="text-4xl font-bold mb-6">关于我</h1>

          <div className="rounded-xl border border-white/8 bg-card p-7">
            {/* 头像区域（占位） */}
            <div className="flex items-start gap-6 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-2xl font-bold text-white shrink-0">
                R
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1">Rincardo</h2>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  National University of Singapore (NUS)
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  NUS在读计算机master学生，27年1月底毕业，最近沉迷甄嬛传解说中，同时正在努力系统学习大模型开发，方向涵盖 RAG、Agent、向量数据库与模型微调。
                  通过构建真实项目来深化理解，目标是获得大模型开发相关实习机会。PS：VibeCoding真开心呀~
                </p>
              </div>
            </div>

            {/* 联系方式 */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-white/8">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 hover:border-white/25 text-sm text-foreground transition-colors"
              >
                <GitBranch className="w-3.5 h-3.5" />
                GitHub
              </Link>
              <Link
                href="mailto:1033464622@qq.com"
                className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 hover:border-white/25 text-sm text-foreground transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                1033464622@qq.com
              </Link>
              <div className="inline-flex items-center gap-2 h-8 px-3 rounded-lg border border-white/10 text-sm text-foreground">
                <MessageCircle className="w-3.5 h-3.5 text-green-400" />
                微信：xxxsnd111
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* 学习动机 */}
      <AnimateIn delay={0.1}>
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            学习动机
          </h2>
          <div className="text-muted-foreground leading-relaxed space-y-3">
            <p>
              大模型的出现正在重塑软件开发的边界，从 RAG 到 Agent，从 Prompt Engineering 到 Fine-tuning，
              每一个方向都充满了实践价值。我相信最好的学习方式是动手构建真实可用的项目。
            </p>
            <p>
              这个网站是我的公开学习记录——既是对自己学习历程的可视化呈现，
              也是面向潜在合作方展示技术积累的窗口。
            </p>
          </div>
        </section>
      </AnimateIn>

      {/* 技术技能 */}
      <AnimateIn delay={0.15}>
        <section className="mb-14">
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <Zap className="w-5 h-5 text-violet-400" />
            技术栈
          </h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {skills.map((group) => (
              <div
                key={group.category}
                className="rounded-xl border border-white/8 bg-card p-4"
              >
                <div className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wide">
                  {group.category}
                </div>
                <div className="flex flex-col gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm text-foreground flex items-center gap-2"
                    >
                      <span className="w-1 h-1 bg-cyan-500 rounded-full shrink-0" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* 学习时间线 */}
      <AnimateIn delay={0.2}>
        <section>
          <h2 className="text-xl font-semibold mb-5 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            学习历程
          </h2>
          <div className="space-y-4">
            {timeline.map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-24 shrink-0 text-xs text-muted-foreground pt-0.5 font-mono">
                  {item.time}
                </div>
                <div className="flex-1 text-sm text-foreground leading-relaxed pb-4 border-b border-white/5 last:border-0">
                  {item.event}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>
    </div>
  )
}
