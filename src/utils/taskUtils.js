export const priorityLevels = {
  none: { label: 'No Priority', color: 'priority-none', order: 0 },
  low: { label: 'Low Priority', color: 'priority-low', order: 1 },
  medium: { label: 'Medium Priority', color: 'priority-medium', order: 2 },
  high: { label: 'High Priority', color: 'priority-high', order: 3 }
}

export const getPriorityInfo = (priority) => {
  return priorityLevels[priority] || priorityLevels.none
}

export const sortByPriority = (tasks, direction = 'desc') => {
  return [...tasks].sort((a, b) => {
    const priorityA = getPriorityInfo(a.priority).order
    const priorityB = getPriorityInfo(b.priority).order
    
    return direction === 'desc' ? priorityB - priorityA : priorityA - priorityB
  })
}

export const filterTasks = (tasks, filter) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  switch (filter) {
    case 'today':
      return tasks.filter(task => {
        if (!task.dueDate) return false
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)
        return taskDate.getTime() === today.getTime()
      })
      
    case 'upcoming':
      return tasks.filter(task => {
        if (!task.dueDate) return false
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(0, 0, 0, 0)
        return taskDate >= tomorrow
      })
      
    case 'overdue':
      return tasks.filter(task => {
        if (!task.dueDate || task.completed) return false
        const taskDate = new Date(task.dueDate)
        taskDate.setHours(23, 59, 59, 999)
        return taskDate < new Date()
      })
      
    case 'completed':
      return tasks.filter(task => task.completed)
      
    case 'pending':
      return tasks.filter(task => !task.completed)
      
    case 'high-priority':
      return tasks.filter(task => task.priority === 'high')
      
    case 'recurring':
      return tasks.filter(task => task.isRecurring)
      
    default:
      return tasks
  }
}

export const groupTasksByDate = (tasks) => {
  const groups = {}
  
  tasks.forEach(task => {
    if (!task.dueDate) {
      if (!groups['No Due Date']) groups['No Due Date'] = []
      groups['No Due Date'].push(task)
      return
    }
    
    const taskDate = new Date(task.dueDate)
    const dateKey = taskDate.toDateString()
    
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(task)
  })
  
  return groups
}

export const searchTasks = (tasks, query) => {
  if (!query.trim()) return tasks
  
  const lowercaseQuery = query.toLowerCase()
  
  return tasks.filter(task => 
    task.title.toLowerCase().includes(lowercaseQuery) ||
    task.description.toLowerCase().includes(lowercaseQuery)
  )
}

export const getTaskStats = (tasks) => {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const pending = total - completed
  const overdue = filterTasks(tasks, 'overdue').length
  const today = filterTasks(tasks, 'today').length
  const upcoming = filterTasks(tasks, 'upcoming').length
  
  return {
    total,
    completed,
    pending,
    overdue,
    today,
    upcoming,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  }
}