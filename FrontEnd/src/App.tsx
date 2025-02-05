import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import TaskPage from "./components/TaskPage"
import CreateTask from "./components/CreateTask"
import UpdateTask from "./components/UpdateTask"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskPage/>}/>
        <Route path="/create" element={<CreateTask/>}/>
        <Route path="/update/:id" element={<UpdateTask/>}/>
        <Route path='*' element="404! Page Not Found..." />
      </Routes>
    </Router>
  )
}

export default App
