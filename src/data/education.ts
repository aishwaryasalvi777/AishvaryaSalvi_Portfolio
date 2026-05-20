export interface EducationItem {
  id: number
  degree: string
  field: string
  school: string
  location: string
  year: string
  description?: string
}

export const education: EducationItem[] = [
  {
    id: 1,
    degree: 'Master of Science',
    field: 'Data Science',
    school: 'University at Buffalo',
    location: 'Buffalo, NY',
    year: '2025',
    description: 'Focused on machine learning, statistical modeling, and AI systems engineering.',
  },
  {
    id: 2,
    degree: 'Bachelor of Engineering',
    field: 'Computer Science',
    school: 'University of Pune',
    location: 'Pune, India',
    year: '2021',
    description: 'Core coursework in algorithms, data structures, databases, and software engineering.',
  },
]
