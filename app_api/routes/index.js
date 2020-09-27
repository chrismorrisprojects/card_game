const express = require('express');
const router = express.Router();
const ctrlCards = require('../controllers/cards');


//router
//    .route('/cards/:cardname')
//    .get(ctrlCards.cardsReadOne)
//    .post(ctrlCards.cardCreate);



router
    .route('/cards/draw')
    .get(ctrlCards.cardRandom);

module.exports = router;
