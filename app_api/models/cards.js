const mongoose = require( 'mongoose' );
const cardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    arcana: {
        type: String,
        required: true
    },
    suit: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: false
    },
    uprightKeywords: {
        type: String,
        required: true
    },
    reversedKeywords: {
        type: String,
        required: true
    },
    archetype: {
        type: String,
        required: false
    },
    alignment: {
        type: Number,
        required: false
    }
});
mongoose.model('cards', cardSchema);
