import React from 'react'
import { motion } from 'framer-motion'

const Loading = ({ type = 'tasks' }) => {
  const renderTaskSkeleton = () => (
    <div className="space-y-3">
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="flex space-x-2">
                <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
                <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )

  const renderProjectSkeleton = () => (
    <div className="space-y-2">
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center space-x-3 px-3 py-2"
        >
          <div className="w-3 h-3 bg-gray-200 rounded-full animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-24" />
        </motion.div>
      ))}
    </div>
  )

  return (
    <div className="animate-fade-in">
      {type === 'tasks' && renderTaskSkeleton()}
      {type === 'projects' && renderProjectSkeleton()}
      {type === 'form' && (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-32" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      )}
    </div>
  )
}

export default Loading