import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { format, isToday, isTomorrow, isYesterday } from 'date-fns'
import Checkbox from '@/components/atoms/Checkbox'
import ApperIcon from '@/components/ApperIcon'
import TaskForm from '@/components/organisms/TaskForm'

const TaskItem = ({ task, onToggle, onUpdate, onDelete, showProject = false }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [showActions, setShowActions] = useState(false)

  const formatDueDate = (date) => {
    if (!date) return null
    const taskDate = new Date(date)
    if (isToday(taskDate)) return 'Today'
    if (isTomorrow(taskDate)) return 'Tomorrow'
    if (isYesterday(taskDate)) return 'Yesterday'
    return format(taskDate, 'MMM d')
  }

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-priority-high',
      medium: 'text-priority-medium',
      low: 'text-priority-low',
      none: 'text-priority-none'
    }
    return colors[priority] || colors.none
  }

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed

  if (isEditing) {
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-white rounded-lg shadow-sm p-4 mb-2"
      >
        <TaskForm
          task={task}
          onSubmit={(updatedTask) => {
            onUpdate(task.id, updatedTask)
            setIsEditing(false)
          }}
          onCancel={() => setIsEditing(false)}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`task-item bg-white rounded-lg shadow-sm p-4 mb-2 group ${task.completed ? 'completed' : ''}`}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0 mt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            priority={task.priority}
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className={`task-title font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-900'}`}>
              {task.title}
            </h3>
            
            <div className={`flex items-center space-x-2 transition-opacity duration-200 ${showActions ? 'opacity-100' : 'opacity-0'}`}>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded"
              >
                <ApperIcon name="Edit2" className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-gray-400 hover:text-red-600 rounded"
              >
                <ApperIcon name="Trash2" className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {task.description && (
            <p className={`text-sm mt-1 ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
          
          <div className="flex items-center space-x-4 mt-2">
            {task.dueDate && (
              <div className={`flex items-center space-x-1 text-xs ${isOverdue ? 'text-red-600' : 'text-gray-500'}`}>
                <ApperIcon name="Calendar" className="w-3 h-3" />
                <span>{formatDueDate(task.dueDate)}</span>
              </div>
            )}
            
            {task.priority !== 'none' && (
              <div className={`flex items-center space-x-1 text-xs ${getPriorityColor(task.priority)}`}>
                <ApperIcon name="Flag" className="w-3 h-3" />
                <span className="capitalize">{task.priority}</span>
              </div>
            )}
            
            {task.isRecurring && (
              <div className="flex items-center space-x-1 text-xs text-gray-500">
                <ApperIcon name="Repeat" className="w-3 h-3" />
                <span>Recurring</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default TaskItem