import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'

const guidesDir = path.join(process.cwd(), 'content/guides')

export interface GuideMetadata {
  title: string
  slug: string
  direction: number
  directionName: string
  steps?: number
  tags: string[]
  summary: string
}

export interface Guide extends GuideMetadata {
  content: string
  html: string
}

export const directionMeta: Record<number, { label: string; color: 'cyan' | 'violet' | 'amber'; desc: string }> = {
  0: { label: '全景概览', color: 'cyan', desc: '三大方向的技术地图，面试词汇与学习路线' },
  1: { label: '方向一：应用层开发', color: 'cyan', desc: '拿 API 解决业务问题，需求量最大的工程师方向' },
  2: { label: '方向二：工程化平台层', color: 'violet', desc: '推理加速、部署与可观测性，底层后端基础设施' },
  3: { label: '方向三：算法与微调层', color: 'amber', desc: '直接修改模型权重，门槛最高的算法工程师方向' },
}

export function getAllGuides(): GuideMetadata[] {
  const files = fs.readdirSync(guidesDir).filter(f => f.endsWith('.md'))
  return files
    .map(file => {
      const raw = fs.readFileSync(path.join(guidesDir, file), 'utf-8')
      const { data } = matter(raw)
      return data as GuideMetadata
    })
    .sort((a, b) => a.direction - b.direction)
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const filePath = path.join(guidesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(raw)
  const html = await marked(content)
  return { ...(data as GuideMetadata), content, html }
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(guidesDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))
}
