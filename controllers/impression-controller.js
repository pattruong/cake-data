const Impression = require('../models/impression');
const { generator, createImpressionObject } = require('../random-generator/generator');
const request = require('request');
const { dataBuilder, optionBuilder } = require('../helper/helper-functions');
const { compareKey } = require('../helper/key-check');

//GET
const index = async (req, res) => {
    try {
        const impressions = await Impression.find();
        res.json(impressions);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// create Data in our DB
// Post
const createFakeData = async (req, res) => {
    // array of x objects with Impression schema
    const testData = generator(req.body.quantity, new Date(req.body.startDate), new Date(req.body.endDate), createImpressionObject);
    try {
        // insert testData into DB
        const insertedDoc = await Impression.insertMany(testData);

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
        const impressionsWithFraudDetails = await Impression.findWithFraud();
        res.json(impressionsWithFraudDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// GET by ID
const getById = async (req, res) => {
    try {
        const impression = await Impression.findById(req.params.id);
        res.json(impression);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const update = async (req, res) => {
    try {
        const impression = await Impression.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        res.json(impression);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// POST
const create = async (req, res) => {
    try {
        const impression = await Impression.create(req.body);
        res.json(impression);
    } catch (err) {
        res.status(500).json({ error: err.mesage });
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