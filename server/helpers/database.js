const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient

let _db;

const mongoConnect = callback => {
    mongoClient.connect(
            'mongodb+srv://sunkor:Sydney2019@cluster0-scjwn.mongodb.net/test?retryWrites=true&w=majority'
        )
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    return 'No database found';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;