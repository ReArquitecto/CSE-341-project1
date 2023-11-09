const mongodb = require('../data/database.js');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const db = mongodb.getDatabase();
    const users = await db.collection('users').find({}).toArray();
    res.json(users);
}

const getSingle = async (req, res) => {
    const db = mongodb.getDatabase();
    const user = await db.collection('users').findOne({_id: ObjectId(req.params.id)});
    res.json(user);
}

module.exports = {
    getAll,
    getSingle
};