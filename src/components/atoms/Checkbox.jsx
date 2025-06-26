import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Checkbox = ({ 
  checked = false,
  onChange,
  priority = 'none',
  size = 'md',
  className = '',
  ...props 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }
  
  const priorityClasses = {
    high: 'border-priority-high text-priority-high',
    medium: 'border-priority-medium text-priority-medium',
    low: 'border-priority-low text-priority-low',
    none: 'border-priority-none text-priority-none'
  }
  
  const checkboxClasses = `
    task-checkbox
    ${sizeClasses[size]}
    ${priorityClasses[priority]}
    ${checked ? 'completed' : ''}
    ${className}
  `.trim()

  return (
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className={checkboxClasses}
      onClick={onChange}
      {...props}
    >
      {checked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <ApperIcon name="Check" className="w-3 h-3 text-white" />
        </motion.div>
      )}
    </motion.div>
  )
}

export default Checkbox