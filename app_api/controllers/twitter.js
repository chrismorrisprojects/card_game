const Twitter = require('twitter');
const tf = require("@tensorflow/tfjs");
const fetch = require("node-fetch");
//const tf = require('@tensorflow/tfjs-node');


const getMetaData = async () => {
    const metadata = await fetch("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json")
    return metadata.json()
}
const padSequences = (sequences, metadata) => {
    return sequences.map(seq => {
        if (seq.length > metadata.max_len) {
            seq.splice(0, seq.length - metadata.max_len);
        }
        if (seq.length < metadata.max_len) {
            const pad = [];
            for (let i = 0; i < metadata.max_len - seq.length; ++i) {
                pad.push(0);
            }
            seq = pad.concat(seq);
        }
        return seq;
    });
}

const loadModel = async () => {
    const url = `https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json`;
    return await tf.loadLayersModel(url);
};

const predict = (text, model, metadata) => {
    const trimmed = text.trim().toLowerCase().replace(/(\.|\,|\!)/g, '').split(' ');
    const sequence = trimmed.map(word => {
        const wordIndex = metadata.word_index[word];
        if (typeof wordIndex === 'undefined') {
            return 2; //oov_index
        }
        return wordIndex + metadata.index_from;
    });
    const paddedSequence = padSequences([sequence], metadata);
    const input = tf.tensor2d(paddedSequence, [1, metadata.max_len]);

    const predictOut = model.predict(input);
    const score = predictOut.dataSync()[0];
    predictOut.dispose();
    return score;
}

const getSentiment = (score) => {
    if (score > 0.66) {
        return `Score of ${score} is Positive`;
    }
    else if (score > 0.4) {
        return `Score of ${score} is Neutral`;
    }
    else {
        return `Score of ${score} is Negative`;
    }
}

const getSentimentTweet = async (text) => {
    const model = await loadModel();
    const metadata = await getMetaData();
    let sum = 0;
    try{
        text.forEach(function (prediction) {
            //console.log(` ${prediction}`);
            perc = predict(prediction, model, metadata);
            sum += parseFloat(perc, 10);
        })
    }
    catch(error){
            console.log(error);

    }
    let sentimentScore = getSentiment(sum/text.length);
    //console.log(sentimentScore);
    return(sentimentScore);


}

const client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});


const twitterSentiment = () => {
    return new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1);
        let sentimentTweets = [];
        client.get('search/tweets', {q: '#magic'}, function (error, tweets, response) {
            tweets.statuses.forEach(function (tweet) {
                sentimentTweets.push(tweet.text)
            });
            let sentimentScore = getSentimentTweet(sentimentTweets);

            if (sentimentScore !== null){
                resolve(console.log("completed promise"));
                return (sentimentScore);
            }
            else{
                reject(console.log("broken promise"));
                return (.5);
            }
        });
    });
}

module.exports = {
    twitterSentiment
};
