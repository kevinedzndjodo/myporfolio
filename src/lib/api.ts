const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api'

const CACHE_TTL = 1000 * 60 * 30 // 30 minutes
const CACHE_PREFIX = 'portfolio-cache:'

interface CacheEntry<T> {
  data: T
  updatedAt: number
}

function cacheKey(path: string): string {
  return `${CACHE_PREFIX}${path}`
}

function readCache<T>(path: string): CacheEntry<T> | null {
  try {
    const raw = localStorage.getItem(cacheKey(path))
    if (!raw) return null
    const entry = JSON.parse(raw) as CacheEntry<T>
    if (typeof entry?.updatedAt !== 'number' || entry.data === undefined) return null
    return entry
  } catch {
    return null
  }
}

function writeCache<T>(path: string, data: T): void {
  try {
    localStorage.setItem(cacheKey(path), JSON.stringify({ data, updatedAt: Date.now() } as CacheEntry<T>))
  } catch {
    /* storage full or unavailable — ignore */
  }
}

function isFresh(entry: { updatedAt: number }): boolean {
  return Date.now() - entry.updatedAt < CACHE_TTL
}

export const CACHE_KEY = {
  projects: '/projects',
  skills: '/skills',
  faq: '/faq',
} as const

export function getCached<T>(path: string): T | null {
  return readCache<T>(path)?.data ?? null
}

export function isValidRecentCache(path: string): boolean {
  const entry = readCache<unknown>(path)
  return !!entry && isFresh(entry)
}

export function invalidateCache(path: string): void {
  try {
    localStorage.removeItem(cacheKey(path))
  } catch {
    /* ignore */
  }
}

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

  const res = await fetch(`${API}${path}`, { ...options, headers })

  if (res.status === 204) return undefined as T

  const data = await res.json()
  if (!res.ok) {
    throw new ApiError(data.error || 'Request failed', res.status)
  }
  return data as T
}

async function cachedGet<T>(path: string): Promise<T> {
  const cached = readCache<T>(path)

  if (cached && isFresh(cached)) {
    setTimeout(() => {
      request<T>(path)
        .then((data) => writeCache(path, data))
        .catch(() => {})
    }, 0)
    return cached.data as T
  }

  try {
    const data = await request<T>(path)
    writeCache(path, data)
    return data
  } catch (err) {
    if (cached) return cached.data as T
    throw err
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
    list: () => cachedGet<Project[]>('/projects'),
    create: (data: ProjectInput) => request<Project>('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: ProjectInput) => request<Project>(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/projects/${id}`, { method: 'DELETE' }),
  },
  faq: {
    list: () => cachedGet<FaqItem[]>('/faq'),
    create: (data: FaqInput) => request<FaqItem>('/faq', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: FaqInput) => request<FaqItem>(`/faq/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (id: number) => request<void>(`/faq/${id}`, { method: 'DELETE' }),
  },
  skills: {
    list: () => cachedGet<Skill[]>('/skills'),
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
