import React from 'react'
import TaskList from '@/components/organisms/TaskList'

const UpcomingPage = () => {
  return (
    <TaskList
      title="Upcoming"
      filter="upcoming"
      emptyTitle="No upcoming tasks"
      emptyDescription="You don't have any tasks scheduled for the future."
    />
  )
}

export default UpcomingPage