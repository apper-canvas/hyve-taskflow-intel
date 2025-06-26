import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import TaskItem from '@/components/molecules/TaskItem'
import QuickAdd from '@/components/molecules/QuickAdd'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { taskService } from '@/services/api/taskService'

const TaskList = ({ 
  title, 
  filter = 'all', 
  projectId = null,
  showQuickAdd = true,
  emptyTitle = "No tasks yet",
  emptyDescription = "Create your first task to get started"
}) => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTasks()
  }, [filter, projectId])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      
      let allTasks = await taskService.getAll()
      let filteredTasks = []

      switch (filter) {
        case 'today':
          filteredTasks = allTasks.filter(task => 
            task.dueDate && 
            new Date(task.dueDate).toDateString() === new Date().toDateString()
          )
          break
        case 'upcoming':
          filteredTasks = allTasks.filter(task => 
            task.dueDate && 
            new Date(task.dueDate) > new Date()
          )
          break
        case 'inbox':
          filteredTasks = allTasks.filter(task => 
            task.projectId === 'inbox'
          )
          break
        case 'project':
          filteredTasks = allTasks.filter(task => 
            task.projectId === projectId
          )
          break
        case 'completed':
          filteredTasks = allTasks.filter(task => task.completed)
          break
        default:
          filteredTasks = allTasks
      }

      // Sort tasks by order, then by creation date
      filteredTasks.sort((a, b) => {
        if (a.order !== b.order) return a.order - b.order
        return new Date(a.id) - new Date(b.id)
      })

      setTasks(filteredTasks)
    } catch (err) {
      setError('Failed to load tasks')
      console.error('Error loading tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddTask = async (taskData) => {
    try {
      const newTask = await taskService.create(taskData)
      setTasks(prev => [newTask, ...prev])
      toast.success('Task added successfully!')
    } catch (err) {
      toast.error('Failed to add task')
      console.error('Error adding task:', err)
    }
  }

  const handleToggleTask = async (taskId) => {
    try {
      const task = tasks.find(t => t.id === taskId)
      const updatedTask = await taskService.update(taskId, {
        ...task,
        completed: !task.completed
      })
      
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ))
      
      toast.success(updatedTask.completed ? 'Task completed!' : 'Task reopened!')
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error toggling task:', err)
    }
  }

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const updatedTask = await taskService.update(taskId, updates)
      setTasks(prev => prev.map(t => 
        t.id === taskId ? updatedTask : t
      ))
      toast.success('Task updated successfully!')
    } catch (err) {
      toast.error('Failed to update task')
      console.error('Error updating task:', err)
    }
  }

  const handleDeleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return
    
    try {
      await taskService.delete(taskId)
      setTasks(prev => prev.filter(t => t.id !== taskId))
      toast.success('Task deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete task')
      console.error('Error deleting task:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
          <Loading type="tasks" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
          <Error message={error} onRetry={loadTasks} />
        </div>
      </div>
    )
  }

  const incompleteTasks = tasks.filter(task => !task.completed)
  const completedTasks = tasks.filter(task => task.completed)

  return (
    <div className="flex-1 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{title}</h1>
        
        {showQuickAdd && (
          <QuickAdd onAdd={handleAddTask} projectId={projectId} />
        )}
        
        {incompleteTasks.length === 0 && completedTasks.length === 0 ? (
          <Empty
            title={emptyTitle}
            description={emptyDescription}
            action={showQuickAdd ? undefined : () => {}}
            actionText="Add Task"
          />
        ) : (
          <>
            {/* Incomplete Tasks */}
            <AnimatePresence>
              {incompleteTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onToggle={handleToggleTask}
                  onUpdate={handleUpdateTask}
                  onDelete={handleDeleteTask}
                />
              ))}
            </AnimatePresence>
            
            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  Completed ({completedTasks.length})
                </h2>
                <AnimatePresence>
                  {completedTasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onToggle={handleToggleTask}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default TaskList