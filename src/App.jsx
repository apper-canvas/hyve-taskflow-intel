import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Layout from '@/components/organisms/Layout'
import TodayPage from '@/components/pages/TodayPage'
import UpcomingPage from '@/components/pages/UpcomingPage'
import InboxPage from '@/components/pages/InboxPage'
import ProjectPage from '@/components/pages/ProjectPage'
import AllTasksPage from '@/components/pages/AllTasksPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Layout>
          <Routes>
            <Route path="/" element={<TodayPage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/project/:id" element={<ProjectPage />} />
            <Route path="/all-tasks" element={<AllTasksPage />} />
          </Routes>
        </Layout>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  )
}

export default App