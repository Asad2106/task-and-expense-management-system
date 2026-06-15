import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import ExpenseChart from "../components/ExpenseChart";
import {FaHome,FaTasks,FaMoneyBillWave,FaUser,FaSignOutAlt} from "react-icons/fa";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [expenses, setExpenses] = useState([]);
  
  // Redirect if not logged in
  if (!token) {
    window.location.href = "/";
  }

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

  const fetchExpenses = async () => {

  try {
    const res = await axios.get(
      "http://localhost:5000/api/expenses",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setExpenses(res.data);
    } catch (error) {
    console.log(error);
    }
  };
  
  // TOTAL EXPENSE
  const totalExpense = expenses.reduce(
    (total, item) => total + item.amount,
    0
  );

  useEffect(() => {
  
  fetchTasks();
  fetchExpenses();

}, []);

 return (

    <div
      className={
      darkMode
      ? "dashboard-layout dark"
      : "dashboard-layout"
      }
      >

    {/* SIDEBAR */}
    <div className="sidebar">

      <h2>TaskFlow</h2>

     <ul className="sidebar-menu">

      <li onClick={()=> navigate("/dashboard")}>
        <FaHome />
        <span>Dashboard</span>
      </li>

      <li onClick={()=> navigate("/tasks")}>
        <FaTasks />
        <span>Tasks</span>
      </li>

      <li onClick={() => navigate("/expenses")}>
        <FaMoneyBillWave />
        <span>Expenses</span>
      </li>

      <li onClick={()=> navigate("/profile")}>
        <FaUser />
        <span>Profile</span>
      </li>

    </ul>

      <button
        className="logout-btn"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>

    </div>

    {/* MAIN CONTENT */}
    <div className="main-content">
     <div className="top-bar">

        <div>
          <h1>Welcome - Manage your Tasks and Expenses Efficiently </h1>
        </div>

        <button
          className="dark-btn"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
<div className="stats-container">

  <div className="stat-card">
    <h3>Total Tasks</h3>
    <p>{tasks.length}</p>
  </div>

  <div className="stat-card">
    <h3>Pending Tasks</h3>
    <p>
      {
        tasks.filter(
          (task) => task.status === "Pending"
        ).length
      }
    </p>
  </div>

  <div className="stat-card">
    <h3>Completed Tasks</h3>
    <p>
      {
        tasks.filter(
          (task) => task.status === "Completed"
        ).length
      }
    </p>
  </div>

  <div className="stat-card">
    <h3>Total Expense</h3>
    <p>₹ {totalExpense}</p>
  </div>

</div>
      
    <ExpenseChart expenses={expenses} />
        </div>
        </div>
  
 );
}

export default Dashboard;