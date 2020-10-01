const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};


const getCelticCross = (req, res, callback) => {
    const apiPath = '/api/cards/draw';
    const requestOptions = {
         url:   'http://localhost:3000/api/cards/draw',
        method: 'GET',
        json: {}
    };

    request(
        requestOptions,
        (err, {statusCode, body}) => {
            console.log(body);
            if (statusCode === 200 && body.length) {
                data = body.map( (item) => {
                    return item;
                });
            }
            renderCelticCross(req, res, data);
        }
    )

}

const renderCelticCross = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)){
        message = 'API Lookup Error';
        responseBody = [];
    } else {
        if (!responseBody.length) {
            message = "no cards found";
        }
    }
    res.render('card-list',
        {
            title: 'title',
            pageHeader:{
                title: 'title2',
                strapLine: 'strapLine',
        },
        sidebar: 'sidebar',
        tarots: responseBody,
        message
        }
    );
};
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
    getCelticCross,
    renderCelticCross
};
