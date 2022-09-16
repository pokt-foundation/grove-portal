export type Collections = {
  questions: Questions
}

export type Questions = {
  data: Question[]
}

export type Question = {
  id: number
  status: "published" | "draft" | "archived"
  question: string
  answer: string //markdown
  category: string
  tags: string[]
}
