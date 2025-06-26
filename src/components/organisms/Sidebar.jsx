import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SidebarItem from '@/components/molecules/SidebarItem'
import ApperIcon from '@/components/ApperIcon'
import { taskService } from '@/services/api/taskService'
import { projectService } from '@/services/api/projectService'
import Loading from '@/components/ui/Loading'

const Sidebar = () => {
  const [projects, setProjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [projectsData, tasksData] = await Promise.all([
        projectService.getAll(),
        taskService.getAll()
      ])
      setProjects(projectsData)
      setTasks(tasksData)
    } catch (error) {
      console.error('Error loading sidebar data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getTaskCount = (filter) => {
    switch (filter) {
      case 'today':
        return tasks.filter(task => 
          !task.completed && 
          task.dueDate && 
          new Date(task.dueDate).toDateString() === new Date().toDateString()
        ).length
      case 'upcoming':
        return tasks.filter(task => 
          !task.completed && 
          task.dueDate && 
          new Date(task.dueDate) > new Date()
        ).length
      case 'inbox':
        return tasks.filter(task => 
          !task.completed && 
          task.projectId === 'inbox'
        ).length
      case 'all':
        return tasks.filter(task => !task.completed).length
      default:
        return 0
    }
  }

  const getProjectTaskCount = (projectId) => {
    return tasks.filter(task => 
      !task.completed && 
      task.projectId === projectId
    ).length
  }

  if (loading) {
    return (
      <div className="w-60 bg-sidebar border-r border-gray-200 p-4">
        <Loading type="projects" />
      </div>
    )
  }

  return (
    <div className="w-60 bg-sidebar border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gradient">TaskFlow</h1>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        <SidebarItem
          to="/inbox"
          icon="Inbox"
          label="Inbox"
          count={getTaskCount('inbox')}
        />
        
        <SidebarItem
          to="/today"
          icon="Calendar"
          label="Today"
          count={getTaskCount('today')}
        />
        
        <SidebarItem
          to="/upcoming"
          icon="CalendarDays"
          label="Upcoming"
          count={getTaskCount('upcoming')}
        />
        
        <SidebarItem
          to="/all-tasks"
          icon="CheckSquare"
          label="All Tasks"
          count={getTaskCount('all')}
        />
        
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-700">Projects</h3>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded"
            >
              <ApperIcon 
                name={isProjectsExpanded ? "ChevronDown" : "ChevronRight"} 
                className="w-4 h-4" 
              />
            </motion.button>
          </div>
          
          <AnimatePresence>
            {isProjectsExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-1"
              >
                {projects.map((project) => (
                  <SidebarItem
                    key={project.id}
                    to={`/project/${project.id}`}
                    color={project.color}
                    label={project.name}
                    count={getProjectTaskCount(project.id)}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Sidebar