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




const cardDraw = () => {
    let cardsToDraw = [];
    for (let i = 0; i <= celticCrossAmt; i++) {
        let randomCard = Math.floor(Math.random() * 78);
        cardsToDraw.push(randomCard);
        cardsToDraw = cardsToDraw.filter( function( item, index, inputArray ) {
            return inputArray.indexOf(item) === index;
        });
    }
    return cardsToDraw;
}




const celticCross = (req, res, sentimentBias, cardsToDraw) => {
    let drawnCards = [];
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
                            let threshold = sentimentBias * 10;
                            console.log(threshold);
                            let coinToss = Math.floor(Math.random() * 11);
                            console.log(coinToss);
                            if (coinToss >= threshold){
                                drawnCards[i].alignment = ("positive");
                            } else{
                                drawnCards[i].alignment = ("negative");
                            }

                        }
                        return res
                            .status(200)
                            .json(drawnCards);
                    }
                }
            });
    }
}


const cardRandom =  async (req, res) => {
    let sentimentBias;
    let cardsToDraw = [];
    try {
        sentimentBias = await ctrlTwitter.twitterSentiment();
        //console.log(sentimentBias);
        cardsToDraw = cardDraw();
        celticCross(req, res, sentimentBias, cardsToDraw);
    } catch(e){
        console.error(e);
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
