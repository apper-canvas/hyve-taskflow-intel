import React from 'react'
import TaskList from '@/components/organisms/TaskList'

const InboxPage = () => {
  return (
    <TaskList
      title="Inbox"
      filter="inbox"
      emptyTitle="Your inbox is empty"
      emptyDescription="Add tasks to your inbox to organize them later."
    />
  )
}

export default InboxPage