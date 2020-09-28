const express = require('express');
const  router = express.Router();


const ctrlCards = require('../controllers/cards');


/* GET home page. */

router
    .route('/cards/celticCross')
    .get(ctrlCards.celticCross);

module.exports = router;
