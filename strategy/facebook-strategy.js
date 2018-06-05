var FacebookStrategy = require("passport-facebook").Strategy;
var CommerceSDK = require ('occsrest');

var mySDK = new CommerceSDK({
    hostname : 'ccadmin-zaja.oracleoutsourcing.com/',
    port : '8088',
    apiKey: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzZTI4YTA4Ni1hNjMyLTQ5YWUtOTZhMy1hMzdkZWIzNzIyMmMiLCJpc3MiOiJhcHBsaWNhdGlvbkF1dGgiLCJleHAiOjE1NTk2Njk3NDksImlhdCI6MTUyODEzMzc0OX0=.2TAPiWpxcEC7OPoz3d+eCGG0ZKxQic5ZDmBcEMagl44='
});

var samlAuth = function (data) {
  let lang = {'x-ccasset-language' : 'en'};
  mySDK.post ({url:'/ccstoreui/v1/samlAuthnRequest?encode=true', data , headers : lang , callback : function (err, response) {
    'use strict';
    if (err) {
                   console.log ('Got an error response from POST REQUEST' + err);
                   return;
    }
    console.log ('Got a response from POST REQUEST');
  }
  });
}

module.exports = 
    new FacebookStrategy({
    clientID: "952929798158767",
    clientSecret: "97cfe7d5e34abcb89461959f76836906",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    profileFields: ["id","name","email"],
    passReqToCallback: true
  },

  function(request, accessToken, refreshToken, profile, done) {
     //call occ authetication
     let response = {
        authnRequest: '/auth/facebook',
        authnRequestTarget: accessToken
     };
     samlAuth(response);
     //if Error
     console.log("FACEBOOK_STRATEGY!!!!");
    done(null, "worked");
     //if success
    //  done(null, profile);
  }

  //https://stackoverflow.com/questions/15711127/express-passport-node-js-error-handling/30200362
);