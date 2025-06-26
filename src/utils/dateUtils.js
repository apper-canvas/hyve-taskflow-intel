import { format, isToday, isTomorrow, isYesterday, addDays, addWeeks, addMonths } from 'date-fns'

export const formatDate = (date, formatStr = 'MMM d, yyyy') => {
  if (!date) return ''
  return format(new Date(date), formatStr)
}

export const formatRelativeDate = (date) => {
  if (!date) return ''
  
  const taskDate = new Date(date)
  
  if (isToday(taskDate)) return 'Today'
  if (isTomorrow(taskDate)) return 'Tomorrow'
  if (isYesterday(taskDate)) return 'Yesterday'
  
  return format(taskDate, 'MMM d')
}

export const isOverdue = (date) => {
  if (!date) return false
  return new Date(date) < new Date() && !isToday(new Date(date))
}

export const getNextRecurringDate = (date, pattern) => {
  if (!date || !pattern) return null
  
  const currentDate = new Date(date)
  
  switch (pattern.type) {
    case 'daily':
      return addDays(currentDate, 1)
    case 'weekly':
      return addWeeks(currentDate, 1)
    case 'monthly':
      return addMonths(currentDate, 1)
    default:
      return null
  }
}

export const sortByDate = (tasks, direction = 'asc') => {
  return [...tasks].sort((a, b) => {
    const dateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31')
    const dateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31')
    
    return direction === 'asc' ? dateA - dateB : dateB - dateA
  })
}