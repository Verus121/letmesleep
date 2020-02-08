var Twit = require('twit');
var twitterConfig = require('./config');

var T = new Twit(twitterConfig);

function postToT(text) {

    var r = Math.floor(Math.random()*10000);

    T.post('statuses/update', { status: "You Can Sleep!" + r }, function(err, data, response) {
        console.log(data);
    })
}

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
                postToT( data[i].full_text ) 
    };
} // getFromT

function parseText(text) {
    if(text.search("snow") != -1)
        if(text.search("surrey") != -1)
            if(text.search("closed") != -1 )
                return true;
    return false;
} // parseText

setInterval(getFromT, 1000 * 60); // Each Minute
// setInterval(getFromT(), 1000 * 60 * 60); // Each Hour