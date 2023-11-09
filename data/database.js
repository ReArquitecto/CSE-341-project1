const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;

let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized");
        return callback(null, database);
    }

    MongoClient.connect(process.env.DATABASE_URL, {useUnifiedTopology: true}, (err, client) => {
        if (err) {
            return callback(err);
        }
        else {
            database = client.db();
            console.log("Database initialized");
            return callback(null, database);
        }
    });
};

    const getDatabse = () => {
        if (!database) {
            console.log("Database not initialized");
        }
        return database;
    };

    module.exports = {
        initDb,
        getDatabse
    };

    
