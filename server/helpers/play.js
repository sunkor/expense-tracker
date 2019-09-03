const axios = require('axios')

const categories = ['coffee', 'food', 'groceries', 'movies']

for (let i = 1; i <= 2; i++) {
    const randomExpense = getRandomExpense()
    console.log(randomExpense)
    axios.post('http://localhost:3000/expense', randomExpense)
        // .then((res) => {
        //     console.log(res);
        // })
        .catch((err) => {
            //console.log(err);
        });
}

function getRandomExpense() {
    const category = categories[getRandomInt(1, categories.length)]
    const amount = Math.floor(Math.random() * 1000) / 100
    const purchaseDate = randomDate(new Date(2019, 0, 1), new Date())
    const description = `Purchased at ${purchaseDate.toDateString()}`

    return {
        amount: amount,
        purchaseDate: purchaseDate,
        category: category,
        description: description
    }
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
}