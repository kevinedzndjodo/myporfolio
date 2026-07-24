export interface Project {
  name: string
  description: string
  tech: string[]
  url: string
  image: string
}

export const projects: Project[] = [
  {
    name: 'Streamly',
    description: 'A subscription reselling platform for digital services like Netflix and Spotify.',
    tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind'],
    url: 'https://streamly-frontend-three.vercel.app/',
    image: '/projects/project-streamly.png',
  },
  
]