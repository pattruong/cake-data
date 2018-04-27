var express = require('express');
var router = express.Router();
var impression = require('../controllers/impression-controller');
var { verifyKey, keyCheck } = require('../helper/key-check');

/* GET users listing. */
router.get('/', verifyKey, keyCheck, impression.index);
router.get('/fraud', verifyKey, keyCheck, impression.getFraudData);
router.get('/byid/:id', verifyKey, keyCheck, impression.getById);

// create fake data in DB
router.post('/insertdata', verifyKey, keyCheck, impression.createFakeData);
router.post('/', verifyKey, keyCheck, impression.create);
router.put('/:id', verifyKey, keyCheck, impression.update);


module.exports = router;
