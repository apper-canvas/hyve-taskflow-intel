import React from 'react'
import { useParams } from 'react-router-dom'
import TaskList from '@/components/organisms/TaskList'

const ProjectPage = () => {
  const { id } = useParams()
  
  return (
    <TaskList
      title="Project Tasks"
      filter="project"
      projectId={id}
      emptyTitle="No tasks in this project"
      emptyDescription="Start by adding your first task to this project."
    />
  )
}

export default ProjectPage