import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

function ExpenseChart({ expenses }) {

  // Group expenses by category
  const data = [];

  expenses.forEach((expense) => {

    const existing = data.find(
      (item) =>
        item.category === expense.category
    );

    if (existing) {

      existing.amount += expense.amount;

    } else {

      data.push({
        category: expense.category,
        amount: expense.amount,
      });

    }

  });

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#fd2ccc",
    "#23acf1",
  ];

  if (data.length === 0) {
  return (
    <div className="task-card">
      <h2>Expense Analytics</h2>
      <p>No expense data available.</p>
    </div>
    );
  }
  return (

    <center>
    <div className="chart-card">

    <div className="chart-header">
      <h2>Expense Analytics</h2>
      <br></br>
      <p>Total Expense Records: {expenses.length}</p>
    </div>

    <PieChart
      width={500}
      height={350}
    >
      <Pie
        data={data}
        dataKey="amount"
        nameKey="category"
        cx="50%"
        cy="50%"
        outerRadius={120}
        label
      >
        {data.map((entry, index) => (
          <Cell
            key={index}
            fill={
              COLORS[index % COLORS.length]
            }
          />
        ))}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </div>

  </center>
);
}

export default ExpenseChart;