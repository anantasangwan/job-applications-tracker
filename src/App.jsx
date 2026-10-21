import './App.css'
import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Left from './components/Left.jsx'
import Dashboard from './components/Dashboard.jsx'
import Applications from './components/Applications.jsx'
import AddApplication from './components/AddApplication.jsx'
import FollowUps from './components/FollowUps.jsx'

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [applications, setApplications] = useState(JSON.parse(localStorage.getItem("applications")) || []);

  const [statusCount, setStatusCount] = useState(() => {
    const stored = localStorage.getItem("statusCount");
    if (stored) return JSON.parse(stored);

    const initialCount = {
      applied: 0,
      shortlisted: 0,
      interview: 0,
      selected: 0,
      rejected: 0
    };

    localStorage.setItem("statusCount", JSON.stringify(initialCount));
    return initialCount;
  });

  // --- update localStorage whenever applications changes ---
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);
  
  // --- update localStorage whenever statusCount changes ---
  useEffect(() => {
    localStorage.setItem("statusCount", JSON.stringify(statusCount));
  }, [statusCount]);


  return (
    <div className='flex w-full h-dvh overflow-hidden'>
      <Left showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

      {/* --- backdrop responsiveness on width < 1280px && sidebar is visible --- */}
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          className="xl:hidden fixed inset-0 z-10 bg-black/30"
        />
      )}

      <div className='max-xl:w-full flex-1 min-w-0 min-h-0 overflow-y-scroll scrollbar-none overflow-x-hidden bg-[#f4f3f6] flex flex-col '>
        <Routes>
          <Route path='/' element={<Dashboard recents={applications.slice(0, 5)} statusCount={statusCount} setShowSidebar={setShowSidebar} />} />
          <Route path="/add-application" element={<AddApplication setApplications={setApplications} setStatusCount={setStatusCount} setShowSidebar={setShowSidebar} />} />
          <Route path='/applications' element={<Applications applications={applications} setApplications={setApplications} setStatusCount={setStatusCount} setShowSidebar={setShowSidebar} />} />
          <Route path='/follow-ups' element={<FollowUps applications={applications} setApplications={setApplications} setShowSidebar={setShowSidebar} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
// -- 'flex-1' allows a flex item to grow and shrink as needed, ignoring its initial size. --