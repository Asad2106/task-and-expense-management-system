const Expense = require("../models/Expense");


// ADD EXPENSE
const addExpense = async (req, res) => {

  try {

    const {
      title,
      amount,
      category,
    } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      user: req.user._id,
    });

    res.status(201).json(expense);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// GET EXPENSES
const getExpenses = async (req, res) => {

  try {

    const expenses = await Expense.find({
      user: req.user._id,
    });

    res.status(200).json(expenses);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};


// DELETE EXPENSE
const deleteExpense = async (req, res) => {

  try {

    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.deleteOne();

    res.status(200).json({
      message: "Expense deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }

};

module.exports = {
  addExpense,
  getExpenses,
  deleteExpense,
};