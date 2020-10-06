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

//TODO
//next I need to get my random function to rerun if it draws a duplicate card
//then add in twitter sentiment
//then have twitter sentiment impact orientation -- not sure how to do this yet exactly
//actually, yeah I do.
//    draw each card ten times, each time flip a coin. >=5, positive, less than 5 negative. Twitter sentiment will change the >=5< number. positive twitter sentiment lowers the threshold for good, negative raises it
//at the end of the coin flips, whichever came up the most is the orientation


const cardRandom = (req, res) => {
    let i;
    let cardsToDraw = [];
    let drawnCards = [];
    for (i = 0; i <= celticCrossAmt; i++) {
        let randomCard = Math.floor(Math.random() * 78);
        cardsToDraw.push(randomCard);
        cardsToDraw = cardsToDraw.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) == index;
        });
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
                    if (drawnCards.length === celticCrossAmt) {
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
