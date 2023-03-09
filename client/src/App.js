import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
import User from './pages/User'
import UserForm from './components/UserForm'

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="pages">
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<User />} />
                <Route path='/signup' element={<User />} />
            </Routes>
        </div>
    </div>
  )
}

export default App
