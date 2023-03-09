import { Routes, Route } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './pages/Home'
// import WorkoutForm from './components/WorkoutForm'

function App() {
  return (
    <div className="App">
        <Navbar />
        <div className="pages">
            <Routes>
                <Route path='/' element={<Home />} />
                {/*<Route path='/create' element={<WorkoutForm />} />*/}
            </Routes>
        </div>
    </div>
  )
}

export default App
