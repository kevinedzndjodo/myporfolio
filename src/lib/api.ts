const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const PUBLIC_TIMEOUT_MS = 4000

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const token = localStorage.getItem('admin_token')
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), PUBLIC_TIMEOUT_MS)

  try {
    const res = await fetch(`${API}${path}`, { ...options, headers, signal: options.signal ?? controller.signal })

    if (res.status === 204) return undefined as T

    const data = await res.json()
    if (!res.ok) {
      throw new ApiError(data.error || 'Request failed', res.status)
    }
    return data as T
  } finally {
    clearTimeout(timeout)
  }
}

async function uploadFile(file: File): Promise<string> {
  const token = localStorage.getItem('admin_token')
  const formData = new FormData()
  formData.append('file', file)
  const headers: Record<string, string> = {}
  if (token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(`${API}/upload`, { method: 'POST', body: formData, headers })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new ApiError(data.error || 'Upload failed', res.status)
  }
  const data = await res.json()
  return data.url as string
}

export const api = {
  upload: uploadFile,
  projects: {
    list: () => request<Project[]>('/projects'),
    create: (data: ProjectInput) => request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: ProjectInput) => request<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/projects/${id}`, { method: 'DELETE' }),
  },
  faq: {
    list: () => request<FaqItem[]>('/faq'),
    create: (data: FaqInput) => request<FaqItem>('/faq', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: FaqInput) => request<FaqItem>(`/faq/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/faq/${id}`, { method: 'DELETE' }),
  },
  skills: {
    list: () => request<Skill[]>('/skills'),
    create: (data: SkillInput) => request<Skill>('/skills', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: SkillInput) => request<Skill>(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/skills/${id}`, { method: 'DELETE' }),
  },
  messages: {
    list: () => request<Message[]>('/messages'),
    delete: (id: number) => request<void>(`/messages/${id}`, { method: 'DELETE' }),
  },
  settings: {
    get: () => request<Record<string, string>>('/settings'),
    update: (data: Record<string, string>) => request<Record<string, string>>('/settings', { method: 'PUT', body: JSON.stringify(data) }),
  },
  contact: (data: { name: string; email: string; message: string }) =>
    request<{ id: number }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
}

export interface Project {
  id: number; name: string; description: string; challenges: string | null; outcome: string | null; year: number | null
  tech: string[]; url: string; image: string; github: string | null; featured: boolean; createdAt: string; updatedAt: string
}
export interface ProjectInput {
  name: string; description: string; challenges?: string | null; outcome?: string | null; year?: number | null
  tech: string[]; url: string; image: string; github?: string | null; featured?: boolean
}
export interface FaqItem {
  id: number; question: string; answer: string
}
export interface FaqInput {
  question: string; answer: string
}
export interface Skill {
  id: number; name: string; icon: string
}
export interface SkillInput {
  name: string; icon: string
}
export interface Message {
  id: number; name: string; email: string; message: string; createdAt: string
}
