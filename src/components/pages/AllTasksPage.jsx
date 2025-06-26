import React from 'react'
import TaskList from '@/components/organisms/TaskList'

const AllTasksPage = () => {
  return (
    <TaskList
      title="All Tasks"
      filter="all"
      emptyTitle="No tasks found"
      emptyDescription="Create your first task to get started with TaskFlow."
    />
  )
}

export default AllTasksPage