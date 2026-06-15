
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import { FaHome, FaTasks, FaMoneyBillWave, FaUser,} from "react-icons/fa";
function Expenses() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(true);
   // EXPENSE STATES
    const [expenses, setExpenses] = useState([]);
    const [expenseTitle, setExpenseTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [editingExpense, setEditingExpense] = useState(null);
    const [editExpenseTitle, setEditExpenseTitle] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

     // FETCH EXPENSES
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

  // ADD EXPENSE
  const addExpense = async (e) => {

    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/expenses",
        {
          title: expenseTitle,
          amount,
          category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setExpenseTitle("");
      setAmount("");
      setCategory("");
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };



  // DELETE EXPENSE
  const deleteExpense = async (id) => {

    try {
      await axios.delete(
        `http://localhost:5000/api/expenses/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };


   // EDIT EXPENSE 
  
    const editExpense = async (id) => {
  
    try {
      await axios.put(
        `http://localhost:5000/api/expenses/${id}`,
        {
          title: editExpenseTitle,
          amount: editAmount,
          category: editCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingExpense(null);
      fetchExpenses();
    } catch (error) {
      console.log(error);
    }
  };
  
    useEffect(() => {
      fetchExpenses();
    }, []);
  
const totalExpense = expenses.reduce(
  (total, expense) =>
    total + Number(expense.amount),
  0
);

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
      </li>
    </ul>
  </div>

  <div className="main-content">
    <div className="top-bar">
      <div>
        <h1>💰 Expenses - Manage your daily Expenses</h1>
      </div>
      <button
        className="dark-btn"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>
    </div>
    <div className="expense">
      {/* EXPENSE FORM */}
      <form
        className="task-form"
        onSubmit={addExpense}
      >

        <h2>What's Next?</h2>

        <input
          type="text"
          placeholder="Expense Title"
          value={expenseTitle}
          onChange={(e) => setExpenseTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

       <center> <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        /></center>
    
        <button
  type="submit"
  className="expense-btn"
>
  Add Expense
</button>

      </form>      
      {/* EXPENSE LIST */}
      <div className="expenses-container">
     <input
  className="search-box"
  type="text"
  placeholder="🔍 Search Expenses..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
<div className="expense-stats">

  <div className="stat-card">
    <h3>📊 Total Records</h3>
    <p>{expenses.length}</p>
  </div>

  <div className="stat-card">
    <h3>💰 Total Expense</h3>
    <p>₹ {totalExpense}</p>
  </div>

</div>
      <div className="section-header">
  <div>
    ,<center><h2>Your Expenses</h2></center>
  </div>
</div>
  <div className="expenses-grid">
        {
          expenses.filter((expense)=> 
          expense.title
        ?.toLowerCase()
      .includes(
        searchTerm.toLowerCase()

      )).map((expense) => (
              
            <div
              className="task-card"
              key={expense._id}
            > 
              {
               editingExpense === expense._id ? (
       <>
      <input
        value={editExpenseTitle}
        onChange={(e) =>
          setEditExpenseTitle(e.target.value)
        }
      />
      <input
        value={editAmount}
        onChange={(e) =>
          setEditAmount(e.target.value)
        }
      />

      <input
        value={editCategory}
        onChange={(e) =>
          setEditCategory(e.target.value)
        }
      />
      <button
        onClick={() =>
          editExpense(expense._id)
        }
      >
        Save
      </button>

    </>
  ) : (
        <>
         <div className="expense-header">
  <h3>{expense.title}</h3>

  <span className="expense-amount">
    ₹ {expense.amount}
  </span>
</div>

<span className="category-badge">
  {expense.category}
</span> 

 </>
        )
      }

        <div className="expense-actions">

<button
  className="edit-btn"
  onClick={() => {

    setEditingExpense(expense._id);
    setEditExpenseTitle(expense.title);
    setEditAmount(expense.amount);
    setEditCategory(expense.category);

  }}
>
  Edit
</button>

<button
  className="delete-btn"
  onClick={() =>
    deleteExpense(expense._id)
  }
>
  Delete
</button>
</div>
           </div>

          ))
        }
      </div>
      </div>
    </div>
   </div>
 </div>
  );

}

export default Expenses;