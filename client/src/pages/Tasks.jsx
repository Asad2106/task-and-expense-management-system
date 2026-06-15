import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaMoneyBillWave, FaUser,} from "react-icons/fa";

function Tasks() {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
   // TASK STATES
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
  
  // FETCH TASKS
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/tasks",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // ADD TASK
  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/tasks/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

//UPDATE TASK STATUS
  const updateTaskStatus = async (
  id,
  status
) => {
  try {
    await axios.put(
      `http://localhost:5000/api/tasks/${id}`,
      {
        status,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchTasks();
  } catch (error) {
    console.log(error);
  }
};

//EDIT TASK
const editTask = async (id) => {
    try {
      await axios.put(
         `http://localhost:5000/api/tasks/${id}`,
       {
          title: editTitle,
          description: editDescription,
       },
       {
          headers: {
          Authorization: `Bearer ${token}`,
        },
       }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
   };

    useEffect(() => {
       fetchTasks(); 
     }, []);
  
  return (
  
 <div
  className={
    darkMode      ? "dashboard-layout dark" : "dashboard-layout"
  }
>
  <div className="sidebar">

    <h2>TaskFlow</h2>

    <ul className="sidebar-menu">

      <li onClick={() => navigate("/dashboard")}>
        <FaHome />
        <span>Dashboard</span>
      </li>

      <li onClick={() => navigate("/tasks")}>
        <FaTasks />
        <span>Tasks</span>
      </li>

      <li onClick={() => navigate("/expenses")}>
        <FaMoneyBillWave />
        <span>Expenses</span>
      </li>

      <li onClick={() => navigate("/profile")}>
        <FaUser />
        <span>Profile</span>
      </li>6
    </ul>
  </div>

  <div className="main-content">

    <div className="top-bar">

      <div>
        <h1>📋 Tasks - Manage your daily Tasks</h1>
      </div>
      <br></br>
        <br></br>
      <button
        className="dark-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

    </div>

    {/* TASK FORM */}
      <form
        className="task-form"
        onSubmit={addTask}
      >

        <h2>What's Next?</h2>

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        
        <button type="submit">
          Add Task
        </button>
      </form>

      {/* TASK LIST */}
      <div className="tasks-container">
          <input
            className="search-box"
            type="text"
            placeholder="🔍 Search Tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        <div className="section-header">
          <center> <h2>Your Tasks</h2> 
          <br></br>
           <p>{tasks.length} Tasks Available</p>
          </center>
</div>
{
  tasks.length === 0 ? (
    <p>No tasks available.</p>
  ) : (
    <div className="tasks-grid">
      {tasks
        .filter((task) =>
          task.title
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
        )
        .map((task) => (
         <div
  className="task-card"
  key={task._id}
>
  <div className="task-header">
    <h3>{task.title}</h3>
    <span
      className={
        task.status === "Completed"
          ? "badge completed"
          : task.status === "In Progress"
          ? "badge progress"
          : "badge pending"
      }
    >
      {task.status}
    </span>

  </div>

  <p>{task.description}</p>

  <div className="task-actions">

  <button
    className="edit-btn"
    onClick={() => {
      setEditingTask(task._id);
      setEditTitle(task.title);
      setEditDescription(task.description);
    }}
  >
    Edit
  </button>

  <select
    value={task.status}
    onChange={(e) =>
      updateTaskStatus(
        task._id,
        e.target.value
      )
    }
  >
    <option value="Pending">Pending</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
  </select>

  <button
    className="delete-btn"
    onClick={() =>
      deleteTask(task._id)
    }
  >
    Delete
  </button>

</div>

</div>

        ))}

    </div>

  )
}
      </div>
     </div>
  </div>
  );
}

export default Tasks;