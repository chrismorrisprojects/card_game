const mongoose = require('mongoose');
const cardList = (req, res) => {
    res.render('card-list', {
        title: 'List of Tarot Cards',
        pageHeader:{
            title: 'Tarot Cards',
            strapLine: 'Digital tarot card readings you control!'
            },
        sidebar: "Digital tarot card reading to help you navigate life."
        });
};

module.exports = {
    cardList
};
