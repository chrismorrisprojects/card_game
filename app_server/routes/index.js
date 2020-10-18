const express = require('express');
const  router = express.Router();


const ctrlCards = require('../controllers/cards');
const ctrlHomePage = require('../controllers/homepage');


/* GET home page. */

router
    .route('/')
    .get(ctrlHomePage.renderHomePage);

router
    .route('/cards/celticCross')
    .get(ctrlCards.getCelticCross);

//router.get('/cards', ctrlCards.cardList);

module.exports = router;

//module.exports = router;
