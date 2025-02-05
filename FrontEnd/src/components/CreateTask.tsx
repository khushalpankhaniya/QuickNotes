import { useState } from "react"
import { useNavigate  ,Link} from "react-router-dom"
import { useDispatch } from "react-redux"
import { createTask } from "../redux/taskSlice"
import './style.css'
import axios from "axios";

const CreateTask = () => {

  const [title, setTitle] = useState<string>("");
  const [completed, setCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const responce = await axios.post('http://localhost:3000/quicknotes/api/tasks', { title, completed });
      console.log("createData", responce.data);

      dispatch(createTask(responce.data));
      navigate('/');

    } catch (error) {
      console.log("CreateTask", error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
    <div className="card">
      <Link to={"/"}>Go Back </Link>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            required
          />
        </div>
        <div>
          <label htmlFor="completed">Completed:</label>
          <input
            type="checkbox"
            id="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </div>
        <button type="submit">Add Task</button>
      </form>
    </div>
  </div>
    
  )
}

export default CreateTask