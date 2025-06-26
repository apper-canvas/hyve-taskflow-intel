import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const QuickAdd = ({ onAdd, projectId = null }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('none')
  const [dueDate, setDueDate] = useState('')

  const priorityOptions = [
    { value: 'none', label: 'No Priority' },
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return

    const newTask = {
      title: title.trim(),
      priority,
      dueDate: dueDate || null,
      projectId: projectId || 'inbox',
      completed: false,
      description: '',
      isRecurring: false,
      recurringPattern: null,
      parentTaskId: null,
      order: Date.now()
    }

    onAdd(newTask)
    setTitle('')
    setPriority('none')
    setDueDate('')
    setIsExpanded(false)
  }

  const handleCancel = () => {
    setTitle('')
    setPriority('none')
    setDueDate('')
    setIsExpanded(false)
  }

  if (!isExpanded) {
    return (
      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        onClick={() => setIsExpanded(true)}
        className="w-full flex items-center space-x-3 p-3 text-left text-gray-600 hover:bg-gray-50 rounded-lg transition-colors duration-200"
      >
        <ApperIcon name="Plus" className="w-4 h-4 text-primary" />
        <span>Add task</span>
      </motion.button>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="bg-white rounded-lg shadow-sm p-4 mb-4"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Task name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
            required
          />
          
          <div className="flex space-x-3">
            <div className="flex-1">
              <Select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                options={priorityOptions}
                placeholder="Priority"
              />
            </div>
            
            <div className="flex-1">
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                placeholder="Due date"
              />
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit" size="sm">
              Add Task
            </Button>
            <Button 
              type="button" 
              variant="ghost" 
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  )
}

export default QuickAdd