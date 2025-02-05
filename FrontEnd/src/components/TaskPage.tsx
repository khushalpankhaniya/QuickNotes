import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setTasks, deleteTask, deleteAllTask } from "../redux/taskSlice"
import { RootState } from "../redux/store";
import { Link } from "react-router-dom";
import './style.css'
const TaskPage = () => {

    interface Task {
        _id: string;
        title: string;
        completed: boolean;
    }

    const [loading, setLoading] = useState<boolean>(false);
    const tasks = useSelector((state: RootState) => state.tasks.tasks);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchTask = async () => {
            setLoading(true);
            try {
                const respone = await axios.get('http://localhost:3000/quicknotes/api/tasks');
                console.log(respone.data.data);

                dispatch(setTasks(respone.data.data));
            } catch (error) {
                console.log("fetchTask", error);
            }
            setLoading(false);
        };
        fetchTask();
    }, [])

    const handleDeleteTask = async (id: string) => {
        alert("Sure Want to Delete a Task...");
        try {
            const responce = await axios.delete('http://localhost:3000/quicknotes/api/tasks/' + id);
            console.log("DeleteTask", responce.data);
            dispatch(deleteTask(id));
        } catch (error) {
            console.log("DeleteTaskError", error);
        }
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="task-page" id="taskPage">
            <h1 className="task-page-title">QuickNotes</h1>

            {/* Button container for Add Task and Delete All Tasks */}
            <div className="button-container">
                <Link to='/create' className="add-task-link">Add Task</Link>
                <button onClick={() => dispatch(deleteAllTask())} className="delete-all-button" id="deleteAllButton">Delete All Tasks</button>
            </div>

            <h2 className="task-count">No of Tasks: {tasks.length}</h2>

            {/* Task list */}
            <ul className="task-list" id="taskList">
                {tasks.map((task: Task) => (
                    <li key={task._id || task.title} className="task-item" id={`task-${task._id || task.title}`}>
                        <h3 className="task-title">{task.title}</h3>
                        <p className="task-status">{task.completed ? "Completed" : "Not Completed"}</p>

                        {/* Button container for Update and Delete Task */}
                        <div className="card-buttons">
                            <Link to={`/update/${task._id}`} className="update-task-link">Update Task</Link>
                            <button onClick={() => handleDeleteTask(task._id)} className="delete-task-button">Delete Task</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>


    )
}

export default TaskPage