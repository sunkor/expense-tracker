const express = require('express')
const router = express.Router()
const expenseController = require('../controllers/expenses')

router.get('/expense', expenseController.getExpenses) //READ
router.get('/expense/:expenseId', expenseController.getExpense) //READ
router.post('/expense', expenseController.postAddExpense) //CREATE
router.put('/expense/:expenseId', expenseController.postAddExpense) //CREATE
router.delete('/expense/:expenseId', expenseController.deleteDeleteExpense) //DELETE

module.exports = router