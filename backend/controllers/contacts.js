const mongodb = require('../db/connect.js');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    try {
        const db = mongodb.getDb();
        const contacts = await db.collection('contacts').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    } catch (err) {
        res.status(500).json(err);
    }
};


const getSingleContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().collection('contacts').find({ _id: contactId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    }).catch(err => {
        res.status(500).json(err);
    });
};

const createContact = async (req, res) => {
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('contacts').insertOne(contact);
    if (response.acknowledged) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating contact');
    }
};

const updateContact = async (req, res) => {
    const contactId = ObjectId(req.params.id);
    const contact = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().collection('contacts').replaceOne({ _id: contactId }, contact, { upsert: true });
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error updating contact');
    }
};

const deleteContact = async (req, res) => {
    const contactId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db().collection('contacts').deleteOne({ _id: contactId });
    if (response.result.n > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Error deleting contact');
    }
}

module.exports = {
    getAllContacts,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};