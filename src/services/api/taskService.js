import mockTasks from '@/services/mockData/tasks.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TaskService {
  constructor() {
    this.tasks = [...mockTasks]
  }

  async getAll() {
    await delay(300)
    return [...this.tasks]
  }

  async getById(id) {
    await delay(200)
    const task = this.tasks.find(t => t.id === id)
    if (!task) {
      throw new Error('Task not found')
    }
    return { ...task }
  }

  async create(taskData) {
    await delay(400)
    
    // Find highest existing ID and add 1
    const maxId = this.tasks.reduce((max, task) => {
      const taskId = parseInt(task.id)
      return taskId > max ? taskId : max
    }, 0)
    
    const newTask = {
      id: (maxId + 1).toString(),
      ...taskData,
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    this.tasks.unshift(newTask)
    return { ...newTask }
  }

  async update(id, updates) {
    await delay(300)
    
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks[index] = {
      ...this.tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.tasks[index] }
  }

  async delete(id) {
    await delay(200)
    
    const index = this.tasks.findIndex(t => t.id === id)
    if (index === -1) {
      throw new Error('Task not found')
    }
    
    this.tasks.splice(index, 1)
    return true
  }

  async getByProject(projectId) {
    await delay(300)
    return this.tasks.filter(task => task.projectId === projectId)
  }

  async getByPriority(priority) {
    await delay(300)
    return this.tasks.filter(task => task.priority === priority)
  }

  async getCompleted() {
    await delay(300)
    return this.tasks.filter(task => task.completed)
  }

  async getPending() {
    await delay(300)
    return this.tasks.filter(task => !task.completed)
  }
}

export const taskService = new TaskService()