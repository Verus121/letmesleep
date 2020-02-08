var Twit = require('twit');
var twitterConfig = require('./config');

var T = new Twit(twitterConfig);

function getFromT() {

    console.log("Checking if I can sleep in!");

    var params = {
        screen_name: 'sfu', 
        tweet_mode: 'extended',
        count: 50
    }

    T.get('statuses/user_timeline', params, gotData);

    function gotData(err, data, response) {
        for( var i = 0; i < data.length; i++ )
            if( parseText(data[i].full_text) )
                console.log("dont wake up!" + data[i].full_text);
    };
} // getFromT

function parseText(text) {
    if(text.search("snow") != -1)
        if(text.search("surrey") != -1)
            if(text.search("closed") != -1 )
                return true;
    return false;
} // parseText

setInterval(getFromT, 1000 * 10); // Each Minute
// setInterval(getFromT(), 1000 * 60 * 60); // Each Hour