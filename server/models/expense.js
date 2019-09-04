const getDb = require('../helpers/database').getDb;
const mongoDb = require('mongodb')

module.exports = class Expense {

    constructor(amount, currency, category, description) {
        this.amount = amount;
        this.currency = currency;
        this.category = category;
        this.description = description;
    }

    save() {
        const db = getDb();
        return db.collection('expenses').insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('expenses').find().toArray()
            .then(expenses => {
                console.log(expenses)
                return expenses;
            })
            .catch(err => {
                console.log(err)
            });
    }

    static deletebyId(expenseId) {
        const db = getDb();
        return db.collection('expenses').deleteOne({
                _id: new mongoDb.ObjectID(expenseId)
            })
            .then(result => {
                console.log(result);
                return result;
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }

    static findById(expenseId) {
        const db = getDb();
        return db.collection('expenses').find({
                _id: new mongoDb.ObjectID(expenseId)
            })
            .toArray()
            .then(expenses => {
                if (expenses.length > 0) {
                    console.log(expenses);
                    return expenses[0];
                } else {
                    console.log('no matching id found')
                    return null;
                }
            })
            .catch(err => {
                console.log(err);
                throw err;
            });
    }
}