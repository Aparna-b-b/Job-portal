import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import ApplyJob from './pages/ApplyJob'
import Applications from './pages/Applications'
import RecruiterLogin from './components/RecruiterLogin'
import { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Dashboard from './pages/Dashboard'
import Addjob from './pages/Addjob'
import Managejobs from './pages/Managejobs'
import ViewApplication from './pages/ViewApplication'
import 'quill/dist/quill.snow.css'

const App = () => {

  const{showRecruiterLogin}=useContext(AppContext)

  return (
    <div>
      { showRecruiterLogin && <RecruiterLogin />}
      <Routes>
        <Route path='/'element={<Home />}/>
        <Route path='/apply-job/:id'element={<ApplyJob />}/>
        <Route path='/applications'element={<Applications />}/>
        <Route path='/dashboard'element={<Dashboard/>}>
           <Route path='add-job' element={<Addjob />}/>
           <Route path='manage-jobs' element={<Managejobs />}/>
           <Route path='view-applications' element={<ViewApplication />}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App