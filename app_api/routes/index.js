const express = require('express');
const router = express.Router();
const ctrlCards = require('../controllers/cards');
const ctrlTwitter = require('../controllers/twitter');


//router
//    .route('/cards/:cardname')
//    .get(ctrlCards.cardsReadOne)
//    .post(ctrlCards.cardCreate);



router
    .route('/cards/draw')
    .get(ctrlCards.cardRandom);

router
    .route('/twitter/sentiment')
    .get(ctrlTwitter.twitterSentiment);

module.exports = router;
