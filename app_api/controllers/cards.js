const mongoose = require('mongoose');
const mdlCard = mongoose.model('cards');
const cardsReadOne = (req, res) => {
    mdlCard
        .find({name: req.params.cardname})
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

const cardCreate = (req, res) => {
    res
        .status(201)
        .json({"status" : "success"});
};

module.exports = {
    cardsReadOne,
    cardCreate
};
