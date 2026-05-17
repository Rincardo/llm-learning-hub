import Link from "next/link"
import { GitBranch, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-white/8 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-muted-foreground">
          <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent font-medium">
            LLM Learning Hub
          </span>
          <span className="ml-2">· NUS · 大模型开发学习中</span>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="GitHub"
          >
            <GitBranch className="w-4 h-4" />
          </Link>
          <Link
            href="mailto:1033464622@qq.com"
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="邮箱"
          >
            <Mail className="w-4 h-4" />
          </Link>
          <span className="text-xs text-muted-foreground">
            Built with Next.js & Claude
          </span>
        </div>
      </div>
    </footer>
  )
}
