const express = require('express');
const router = express.Router();
const ctrlCards = require('../controllers/cards');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/card-list', ctrlCards.cardList);

module.exports = router;
