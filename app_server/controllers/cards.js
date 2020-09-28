//const request = require('request');
//const apiOptions = {
//    server: 'http://localhost:3000'
//};
//
//const celticCross = (req, res) =>{
//
//}
//
//const getCelticCross = (req, res, callback) => {
//    const apiPath = '/api/cards/draw';
//    const requestOptions = {
//        url: '${apiOptions.server}${path}',
//        method: 'GET',
//        json: {}
//    };
//
//}
//
//const renderCelticCross = (req, res) => {
//
//}
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
