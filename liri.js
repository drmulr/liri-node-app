//PACKAGES // VARS
var fs = require("fs");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

//-----------------------------------------
var keys = require("./keys.js");
var nodeArgs = process.argv;
var command = process.argv[2];
var search = process.argv[3];

//FUNCTIONS
//Twitter-----------------------------------
function twit(){
    var client = new Twitter({
        consumer_key: keys.twitterKeys.consumer_key,
        consumer_secret: keys.twitterKeys.consumer_secret,
        access_token_key: keys.twitterKeys.access_token_key,
        access_token_secret: keys.twitterKeys.access_token_secret
      });
      var params = {screen_name: 'drmuller'};
      client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var i = 0; i < 20; i++){
                var tweetText = tweets[i].text;
                //come back here and add moment.js to format time
                var tweetTime = tweets[i].created_at;
                console.log(tweetText);
                console.log("  Tweeted at: " + tweetTime + "\n");
            }
        }
      });
}
//Spotify-----------------------------------
function spot(){
    var spotify = new Spotify({
        id: keys.spotifyKeys.client_id,
        secret: keys.spotifyKeys.client_secret
      });
    //Phrase search for possible multiple words:
    var music = "";
    for (var i = 3; i < nodeArgs.length; i++){
        music = music + " " + nodeArgs[i];
    }
      spotify.search({ type: 'track', query: music }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }        
            var artistName = data.tracks.items[0].album.artists[0].name;
            var songName = data.tracks.items[0].name;
            var previewSong = data.tracks.items[0].preview_url;
            var albumName = data.tracks.items[0].album.name;
            console.log("Artist Name: " + artistName);
            console.log("Song Name: " + songName);
            console.log("Preview Song: " + previewSong);
            console.log("From Album: " + albumName);
      });
}
//OMDB--------------------------------------
function movie(){
    request('http://www.omdbapi.com/?apikey=' + keys.omdb.dakey + '&t=' + search + '&plot=short&r=json', function (error, response, data) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received

  
        console.log(data); 
        // console.log(JSON.stringify(data, null, 2)); 
        
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
//FSReadFile--------------------------------
function doit(){
    //Read text file here:
    fs.readFile('random.txt', 'utf8', (err, data) => {
        if (err) throw err;
        //Grabbing data - splitting into an array:
        var spltData = data.split(",");
        // console.log( "spltData[0]: " + spltData[0]);
        // console.log( "spltData[1]: " + spltData[1]);

        if (spltData[0] === "spotify-this-song"){
            search = spltData[1];
            search = search.substring(1, search.length - 1); //Needed remove quotations
            console.log(search);

            var spotify = new Spotify({
                id: keys.spotifyKeys.client_id,
                secret: keys.spotifyKeys.client_secret
              });
            spotify.search({ type: 'track', query: search}, function(err, data) {
                if (err) {
                  return console.log('Error occurred: ' + err);
                }
                var artistName = data.tracks.items[0].album.artists[0].name;
                var songName = data.tracks.items[0].name;
                var previewSong = data.tracks.items[0].preview_url;
                var albumName = data.tracks.items[0].album.name;
                console.log("Artist Name: " + artistName);
                console.log("Song Name: " + songName);
                console.log("Preview Song: " + previewSong);
                console.log("From Album: " + albumName);
            });          
        }
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
