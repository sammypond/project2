require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
//module allows use of sessions.  
const session = require('express-session');
//imports passport local strategy
const passport = require('./config/passportConfig');
//modules for flash messages
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');
var axios = require('axios');


// this is only used by the session store 
const db = require('./models');


const app = express();

// This line makes the session use sequelize to write session data to postgres 
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sessionStore = new SequelizeStore({
  db: db.sequelize,
  expiration: 1000 * 60 * 30
});

const headers = {
  'x-api-key': 'c8b3CWnMmXyVDWGlx-tMcHtEUl_-ZktIzl4Q',
  'Accept': 'application/json'
}

var setOne;
var setTwo;

app.set('view engine', 'ejs');
//all middleware are 'app-use'
app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use(ejsLayouts);
app.use(helmet());

// Configures express-session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: true, 
  store: sessionStore
}));

// Use this line once to set up the store table
sessionStore.sync();

//starts the flash middleware 
app.use(flash());

//MUST BE BELOW WHERE YOU INITIALIZE SESSION
// passport to the express session 
app.use(passport.initialize());  //built-in passport function.  what you do first
app.use(passport.session());

app.use( function(req, res, next){
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});


// GET greensky set
app.get('/bands/:id', isLoggedIn, function(req, res) {
  var url = 'https://api.setlist.fm/rest/1.0/artist/';

  if (req.params.id === 'greensky') {
    url = url + '199596a3-a1af-49f8-8795-259eff8461fb/setlists?p=3'
  } else if (req.params.id === 'tribe') {
    url = url + '8d07ac81-0b49-4ec3-9402-2b8b479649a2/setlists?p=3'
  } else if (req.params.id === 'cheese') {
    url = url + 'cff95140-6d57-498a-8834-10eb72865b29/setlists?p=1'
  } else if (req.params.id === 'railroad') {
    url = url + 'b2e2abfa-fb1e-4be0-b500-56c4584f41cd/setlists?p=1'
  }
  axios.get(url, {headers})
  .then (function(apiResponse){
    // render set data into a page
    // apiResponse.data.setlist[0].id(key in setlist object)
    var setlists = apiResponse.data.setlist;


    // var songs = apiResponse.data.setlist[0].sets.set[0];
    // var songsTwo = apiResponse.data.setlist[0].sets.set[1];
    // var venue = apiResponse.data.setlist[0];
    // // console.log(songs);
    // // console.log(songsTwo);
    // var setOne = songs.song;
    // var setTwo = songsTwo.song;
    // var fullSet = setOne.concat(setTwo);
   
    res.render('show', {setlists: setlists});

    
  })
});

// // GET sts9 set
// app.get('/show2', isLoggedIn, function(req, res) {
//   axios.get('https://api.setlist.fm/rest/1.0/artist/8d07ac81-0b49-4ec3-9402-2b8b479649a2/setlists?p=3', {headers})
//   .then (function(apiResponse){
//     var tribeSongs = apiResponse.data.setlist[0].sets.set[0];
//     var tribeSongsTwo = apiResponse.data.setlist[0].sets.set[1];
//     var tribeVenue = apiResponse.data.setlist[0];
    
//     var tribeSetOne = tribeSongs.song;
//     var tribeSetTwo = tribeSongsTwo.song;
//     var fullSetTwo = tribeSetOne.concat(tribeSetTwo);
//     res.render('show2', {fullSetTwo:fullSetTwo, tribeVenue: tribeVenue});
//   })
// });

// //GET String Cheese set

// app.get('/show3', isLoggedIn, function(req, res) {
//   axios.get('https://api.setlist.fm/rest/1.0/artist/cff95140-6d57-498a-8834-10eb72865b29/setlists?p=1', {headers})
//   .then (function(apiResponse){
//     var cheeseSongs = apiResponse.data.setlist[0].sets.set[0];
//     var cheeseSongsTwo = apiResponse.data.setlist[0].sets.set[1];
//     var cheeseVenue = apiResponse.data.setlist[0];
    
//     var cheeseSetOne = cheeseSongs.song;
//     var cheeseSetTwo = cheeseSongsTwo.song;
//     var fullSetThree = cheeseSetOne.concat(cheeseSetTwo);
   
//     res.render('show3', {fullSetThree:fullSetThree, cheeseVenue: cheeseVenue});
//   })
// });



//GET set by id
app.get("/sets/:id", function(req, res) {
  var url = "https://api.setlist.fm/rest/1.0/setlist/";
  url = url + req.params.id;
  axios.get(url, {headers})
  .then (function(apiResponse){
    var songs = apiResponse.data.sets;
    var setOne = songs.set[0];
    var songLoop = setOne.song;
    var macroId = apiResponse.data;
    var mBid = macroId.artist.mbid;
    console.log(mBid);
    res.render("set", {songLoop: songLoop, mBid: mBid, setOne});
    // console.log(songLoop);
    // console.log(songLoop);
    // console.log(setOne);
  })
})



//POST route
app.post('/show2', function (req, res) {
  
  db.set.create(req.body).then(function () {

    res.redirect('show2'); //redirects to a score page 
  })
});


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
