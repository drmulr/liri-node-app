

//Packages

var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
//---------------------------------
var keys = require("./keys.js");

var command = process.argv[2];
var search = process.argv[3];



//FUNCTIONS
//Twitter--------------------------
function twit(){
    var client = new Twitter({

        //Need replace these keys:
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
        // consumer_key: 'MyeARVjQz9p24DXwggOlOGmK6',
        // consumer_secret: 'iGYb9MyGNil01rDWhsWjYLygSnDRP3iCt3pORc0G7lxXxReYlH',
        // access_token_key: '916738503945400320-SQsQIHWRtryTEGHwoRcl3EexmkaMVED',
        // access_token_secret: 'wZIWRM8LbX90BnCaXuclPzYn17PCnFDlxXl1x1J4XERpp'
      });
      console.log("Test Good: " + keys.twitterKeys.consumer_key);
      console.log("Test Good: " + keys.twitterKeys.consumer_secret);
      console.log("Test Good: " + keys.twitterKeys.access_token_key);
      console.log("Test Good: " + keys.twitterKeys.access_token_secret);
      var params = {screen_name: 'muller_project'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        // if (!error) {
          console.log(tweets);
        // }
      });
}


//Spotify--------------------------
function spot(){
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
      });
    console.log("spot keys: " + keys.spotifyKeys.client_id)
      spotify.search({ type: 'track', query: 'Yesterday' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      console.log(JSON.stringify(data, null, 2)); 
      });
}

function movie(){
    request('http://www.omdbapi.com/?apikey=' + keys.omdb.dakey + '&t=' + search+ '&plot=full', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body, null, 2); // Print the HTML for the Google homepage.
      });

    //   Title of the movie.
    //   * Year the movie came out.
    //   * IMDB Rating of the movie.
    //   * Rotten Tomatoes Rating of the movie.
    //   * Country where the movie was produced.
    //   * Language of the movie.
    //   * Plot of the movie.
    //   * Actors in the movie.
}

function doit(){
    fs.readFile('random.txt', "utf8", (err, data) => {
        if (err) throw err;
        console.log(data);
      });


    // 4. `node liri.js do-what-it-says`   
    // * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.    
    //   * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //   * Feel free to change the text in that document to test out the feature for other commands.
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
