import mockProjects from '@/services/mockData/projects.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ProjectService {
  constructor() {
    this.projects = [...mockProjects]
  }

  async getAll() {
    await delay(250)
    return [...this.projects]
  }

  async getById(id) {
    await delay(200)
    const project = this.projects.find(p => p.id === id)
    if (!project) {
      throw new Error('Project not found')
    }
    return { ...project }
  }

  async create(projectData) {
    await delay(400)
    
    // Find highest existing ID and add 1
    const maxId = this.projects.reduce((max, project) => {
      const projectId = parseInt(project.id)
      return projectId > max ? projectId : max
    }, 0)
    
    const newProject = {
      id: (maxId + 1).toString(),
      ...projectData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.projects.push(newProject)
    return { ...newProject }
  }

  async update(id, updates) {
    await delay(300)
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    this.projects[index] = {
      ...this.projects[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.projects[index] }
  }

  async delete(id) {
    await delay(200)
    
    const index = this.projects.findIndex(p => p.id === id)
    if (index === -1) {
      throw new Error('Project not found')
    }
    
    this.projects.splice(index, 1)
    return true
  }
}

export const projectService = new ProjectService()