const Expense = require('../models/expense');

exports.postAddExpense = (req, res, next) => {
    var newExpense = new Expense(req.body.amount, req.body.currency, req.body.category, req.body.description);
    newExpense.save();
    res.redirect('/');
}

exports.deleteDeleteExpense = (req, res, next) => {
    var expenseId = req.params.expenseId;
    Expense.deletebyId(expenseId);
    res.redirect('/');
}

exports.getExpenses = (req, res, next) => {
    const expenses = Expense.fetchAll(expenses => {
        res.send(expenses);
    });
};

exports.getExpense = (req, res, next) => {
    var expenseId = req.params.expenseId;
    Expense.findById(expenseId, expense => {
        if (expense) {
            res.send(expense);
        } else {
            res.send('not found');
        }
    });
};