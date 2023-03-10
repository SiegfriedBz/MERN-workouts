import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import User from './pages/User'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
        <Navbar />
        <div className="pages">
            <Routes>
                <Route path='/' element={user? <Home /> : <Navigate to='/login' />} />
                <Route path='/login' element={!user ? <User /> : <Navigate to='/' />} />
                <Route path='/signup' element={!user ? <User /> : <Navigate to='/' />} />
            </Routes>
        </div>
    </div>
  )
}

export default App
