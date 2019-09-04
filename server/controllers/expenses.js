const Expense = require('../models/expense');

exports.postAddExpense = (req, res, next) => {
    var newExpense = new Expense(req.body.amount, req.body.currency, req.body.category, req.body.description);
    newExpense.save()
        .then(result => {
            console.log(result);
            res.redirect('/');
        })
        .catch(err => {
            console.log(err);
        });
}

exports.deleteDeleteExpense = (req, res, next) => {
    var expenseId = req.params.expenseId;
    Expense.deletebyId(expenseId);
    res.redirect('/');
}

exports.getExpenses = (req, res, next) => {
    return Expense.fetchAll()
        .then(expenses => {
            res.send(expenses)
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getExpense = (req, res, next) => {
    var expenseId = req.params.expenseId;
    Expense.findById(expenseId)
        .then(expense => {
            if (expense) {
                res.send(expense);
            } else {
                res.send('not found');
            }
        });
};