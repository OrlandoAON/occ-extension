var express = require("express");
var http = require("http");
var router = require("./router");
var app = express();
var passport = require("passport");
var session = require('cookie-session');
app.set('view engine', "ejs");//mecanismo de renderizar

app.use(session({secret: 'dflajsdlkf'}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, JSON.stringify(user));
});
  
passport.deserializeUser(function(user, done) {
    done(null, JSON.parse(user));
});

passport.use(require("./strategy/facebook-strategy"));

app.use("/", router);

var server = http.createServer(app);

server.listen(3000, function() {
    console.log("server running");
});