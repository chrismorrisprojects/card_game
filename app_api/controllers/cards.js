const mongoose = require('mongoose');
const mdlCard = mongoose.model('cards');
const celticCrossAmt = 10;
const ctrlTwitter = require('./twitter');

const cardsReadOne = (req, res) => {
    mdlCard
        .findOne({name: req.params.cardname})
        .exec((err, card) => {
            if (!card) {
                return res
                    .status(404)
                    .json({"message": "card not found"});
            } else if (err) {
                return res
                    .status(404)
                    .json(err);
            } else {
                return res
                    .status(200)
                    .json(card);
            }
        });
};



const cardRandom = (req, res) => {
    let i;
    let cardsToDraw = [];
    let drawnCards = [];
    //let sentimentBias = .5;
    let sentimentBias = ctrlTwitter.twitterSentiment();
    //sentimentPromise.then(
    //    sentimentPromise =
    //)

    //console.log(sentimentBias);
    for (i = 0; i <= celticCrossAmt; i++) {
        let randomCard = Math.floor(Math.random() * 78);
        cardsToDraw.push(randomCard);
        cardsToDraw = cardsToDraw.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
    }
    //console.log(cardsToDraw);
    for (let i = 0; i < cardsToDraw.length; i++){
        mdlCard
            .findOne().skip(cardsToDraw[i])
            .exec((err, card) =>{
                if (!card) {
                    return res
                        .status(404)
                        .json({"message": "card not found"});
                } else if (err) {
                    return res
                        .status(404)
                        .json(err);
                } else {
                    //console.log(typeof card);
                    drawnCards.push(card);
                    if (drawnCards.length === celticCrossAmt) {
                        for (let i = 0; i < drawnCards.length; i++){
                            console.log(sentimentBias);
                            drawnCards[i].alignment = (1 * sentimentBias);
                        }
                        return res
                            .status(200)
                            .json(drawnCards);
                    }
                }


            });
    }

};

const cardCreate = (req, res) => {
    res
        .status(201)
        .json({"status" : "success"});
};

module.exports = {
    cardsReadOne,
    cardCreate,
    cardRandom
};
