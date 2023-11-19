const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    const result = await mongodb.getDb().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const getSingle = async (req, res) => {
    const userId = ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch(err => {
        res.status(500).json(err);
    });
};

module.exports = {
    getAll,
    getSingle
};