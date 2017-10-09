

//Packages
var fs = require("fs");
var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
//---------------------------------

var command = process.argv[2];
var search = process.argv[3];



//FUNCTIONS
//Twitter--------------------------
function twit(){
    var client = new Twitter({
        consumer_key: 'keys.twitterKeys.consumer_key',
        consumer_secret: 'keys.twitterKeys.consumer_secret',
        access_token_key: 'keys.twitterKeys.access_token_key',
        access_token_secret: 'keys.twitterKeys.access_token_secret'
      });
      console.log("Test Good: " + keys.twitterKeys.consumer_key);
      var params = {screen_name: 'muller_project'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // if (!error) {
          console.log(tweets);
          
        // }
      });
}

//---------------------------------
//Spotify

function spot(){
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
      });
    console.log("spot keys: " + keys.spotifyKeys.client_id)
      spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(JSON.stringify(data, null, 2)); 
      });
}
function movie(){

}
function doit(){

}




//PROCESSES
if (command == "my-tweets"){
    twit();
} else if (command == "spotify-this-song"){
    spot();
} else if (command == "movie-this"){
    movie();
} else if (command == "do-what-it-says"){
    doit();
}
