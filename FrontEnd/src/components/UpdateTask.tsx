import { useState } from "react"
import { Link, useNavigate  , useParams} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { editTask} from "../redux/taskSlice"
import './style.css'
import axios from "axios"
import { RootState } from "../redux/store"

const UpdateTask = () => {

  const {id} = useParams();
  console.log("id" , id);
  
  const tasks = useSelector((state: RootState) => state.tasks.tasks) 
  const updateTaskData = tasks.find((task) => task._id == id) /*convert id to number as id pass as number*/

  const [title, setTitle] = useState<string>(updateTaskData?.title || " "); /*title might be undefined but useState<string>() expects string value. */
  const [completed, setCompleted] = useState<boolean>(updateTaskData?.completed || false);
  const [loading, setLoading] = useState<boolean>(false);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const responce = await axios.put(`http://localhost:3000/quicknotes/api/tasks/${id}`, { title, completed });
      console.log("updateData", responce.data);

      dispatch(editTask(responce.data));
      navigate('/');

    } catch (error) {
      console.log("updateDataError", error);
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
          <h2>Update Task</h2>
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
            <button type="submit">Update Task</button>
          </form>
        </div>
      </div>
  )
}

export default UpdateTask