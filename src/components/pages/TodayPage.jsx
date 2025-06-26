import React from 'react'
import TaskList from '@/components/organisms/TaskList'

const TodayPage = () => {
  return (
    <TaskList
      title="Today"
      filter="today"
      emptyTitle="No tasks for today"
      emptyDescription="You're all caught up! Enjoy your day or add a new task."
    />
  )
}

export default TodayPage