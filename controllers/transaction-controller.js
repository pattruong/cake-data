const Transaction = require('../models/transaction');
const { generator, createClickObject } = require('../random-generator/generator');
const request = require('request');
const { dataBuilder, optionBuilder } = require('../helper/helper-functions');
const { compareKey } = require('../helper/key-check');

// GET
const index = async (req, res) => {
    try {
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// create Data in our DB
// Post
const createFakeData = async (req, res) => {
    // array of x objects with Transaction Schema
    const testData = generator(req.body.quantity, new Date(req.body.startDate), new Date(req.body.endDate), createClickObject);
    try {
        // insert testData into DB
        const insertedDoc = await Transaction.insertMany(testData);

        res.json({
            message: "good transfer",
            quantity: req.body.quantity,
            startDate: req.body.startDate,
            endDate: req.body.endDate,
            inserted: insertedDoc
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getFraudData = async (req, res) => {
    try {
        const transactionsWithFraudDetails = await Transaction.findWithFraud();
        res.json(transactionsWithFraudDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET by ID
const getById = async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        const transaction = await Transaction.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// POST
const create = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        res.json(transaction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = {
    index,
    getById,
    create,
    update,
    getFraudData,
    createFakeData
};