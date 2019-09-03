const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuid/v1')

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'expenses.json'
);


const getExpensesFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            console.log(err);
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
}

module.exports = class Expense {

    constructor(amount, currency, category, description) {
        this.amount = amount;
        this.currency = currency;
        this.category = category;
        this.description = description;
    }

    save() {
        this.id = uuidv1();
        fs.readFile(p, (err, fileContent) => {
            let expenses = [];
            if (!err) {
                expenses = JSON.parse(fileContent);
            } else {
                console.log(err);
            }
            expenses.push(this);
            fs.writeFile(p, JSON.stringify(expenses), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(cb) {
        getExpensesFromFile(cb);
    }

    static deletebyId(expenseId) {
        getExpensesFromFile(expenses => {
            const updatedExpenses = expenses.filter(e => e.id != expenseId);
            fs.writeFile(p, JSON.stringify(updatedExpenses), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        });
    }

    static findById(expenseId, cb) {
        getExpensesFromFile(expenses => {
            const expense = expenses.find(e => e.id == expenseId);
            cb(expense);
        });
    }
}