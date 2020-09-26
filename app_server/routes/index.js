const express = require('express');
const  router = express.Router();


const ctrlCards = require('../controllers/cards');


/* GET home page. */

router.get('/cards', ctrlCards.cardlist);

module.exports = router;
