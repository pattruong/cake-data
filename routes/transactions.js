var express = require('express');
var router = express.Router();
var transaction = require('../controllers/transaction-controller');
var { verifyKey, keyCheck } = require('../helper/key-check');

/* GET users listing. */
router.get('/', verifyKey, keyCheck, transaction.index);
router.get('/fraud', verifyKey, keyCheck, transaction.getFraudData);
router.get('/byid/:id', verifyKey, keyCheck, transaction.getById);

// create fake data in DB
router.post('/insertdata', verifyKey, keyCheck, transaction.createFakeData);
router.post('/', verifyKey, keyCheck, transaction.create);
router.put('/:id', verifyKey, keyCheck, transaction.update);


module.exports = router;
