const express = require('express');
const router = express.Router();
const ctrlCards = require('../controllers/cards');


// locations
router
    .route('/cards/:cardname')
    .get(ctrlCards.cardsReadOne)
    .post(ctrlCards.cardCreate);

module.exports = router;
