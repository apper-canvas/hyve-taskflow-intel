import React from 'react'
import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const SidebarItem = ({ 
  to, 
  icon, 
  label, 
  count, 
  color,
  onClick,
  active = false,
  className = '' 
}) => {
  const content = (
    <div className={`sidebar-item ${active ? 'active' : ''} ${className}`}>
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          {color ? (
            <div className={`w-3 h-3 rounded-full ${color}`} />
          ) : (
            <ApperIcon name={icon} className="w-4 h-4" />
          )}
        </div>
        <span className="flex-1 truncate">{label}</span>
        {count !== undefined && count > 0 && (
          <span className="text-xs text-gray-500 bg-gray-200 px-2 py-0.5 rounded-full">
            {count}
          </span>
        )}
      </div>
    </div>
  )

  if (onClick) {
    return (
      <motion.div
        whileHover={{ x: 2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="cursor-pointer"
      >
        {content}
      </motion.div>
    )
  }

  return (
    <motion.div whileHover={{ x: 2 }} whileTap={{ scale: 0.98 }}>
      <NavLink
        to={to}
        className={({ isActive }) => 
          `sidebar-item ${isActive ? 'active' : ''} ${className} block`
        }
      >
        {content}
      </NavLink>
    </motion.div>
  )
}

export default SidebarItem