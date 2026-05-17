export type ProjectStatus = 'planned' | 'in-progress' | 'completed'

export interface Project {
  id: string
  name: string
  description: string
  tags: string[]
  status: ProjectStatus
  githubUrl: string | null
  demoUrl: string | null
  featured: boolean
}

export type ResourceType = 'course' | 'paper' | 'tool' | 'community' | 'docs'
export type Difficulty = 'beginner' | 'intermediate' | 'advanced'
export type Language = 'en' | 'zh' | 'both'

export interface Resource {
  id: string
  title: string
  url: string
  description: string
  type: ResourceType
  difficulty: Difficulty
  language: Language
  free: boolean
}

export interface PathItem {
  title: string
  done: boolean
}

export interface PathStage {
  id: number
  title: string
  subtitle: string
  direction: string
  items: PathItem[]
  keywords: string[]
  completed: boolean
  current: boolean
}

export interface Direction {
  id: number
  title: string
  englishTitle: string
  tagline: string
  description: string
  isFocus: boolean
  color: 'cyan' | 'violet' | 'amber'
}

export interface LearningPath {
  currentStage: number
  currentDirection: number
  directions: Direction[]
  stages: PathStage[]
}
