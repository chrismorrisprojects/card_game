const mongoose = require('mongoose');
const mdlCard = mongoose.model('cards');
const celticCrossAmt = 10;

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
    for (i = 0; i <= celticCrossAmt; i++) {
        let randomCard = Math.floor(Math.random() * 78);
        cardsToDraw.push(randomCard);
    }
    console.log(cardsToDraw);
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
                    console.log(typeof card);
                    drawnCards.push(card);
                    if (i === celticCrossAmt - 1) {
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
