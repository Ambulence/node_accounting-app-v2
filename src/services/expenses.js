'use strict';

let expenses = [];

const getInit = () => {
  expenses = [];
};

const getAll = (params) => {
  const { userId, categories, from, to } = params;

  let filteredExpenses = expenses;

  if (userId) {
    filteredExpenses = expenses.filter(expense => expense.userId === +userId);
  }

  if (categories) {
    filteredExpenses = expenses.filter(({ category }) => (
      categories.includes(category)
    ));
  }

  if (from && to) {
    const fromDate = new Date(from).getTime();
    const toDate = new Date(to).getTime();

    filteredExpenses = expenses.filter(expense => {
      const currentDate = new Date(expense.spentAt).getTime();

      return fromDate <= currentDate && currentDate <= toDate;
    });
  }

  return filteredExpenses;
};

const getById = (expenseId) => {
  const foundExpense = expenses.find(expense => expense.id === expenseId);

  return foundExpense || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  const max = Math.max(expenses.map((expense) => expense.id)) || null;

  const newExpense = {
    id: max + 1,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(newExpense);

  return newExpense;
};

const remove = (expenseId) => {
  const filteredExpenses = expenses
    .filter(expense => expense.id !== expenseId);

  expenses = filteredExpenses;
};

const update = (expenseId, data) => {
  const foundExpense = getById(expenseId);

  Object.assign(foundExpense, { ...data });
};

module.exports = {
  getInit,
  getAll,
  getById,
  create,
  remove,
  update,
};