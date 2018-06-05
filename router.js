var express = require("express");
var router = express.Router();
var passport = require("passport");
// var CommerceSDK = require ('occsrest');

// var mySDK = new CommerceSDK({
//     hostname : 'ccadmin-zaja.oracleoutsourcing.com/',
//     port : '8088'
// });

// var isLoggedIn = function(request, response, next){
//     // console.log(request.user);
//     if (request.user){
//         return next();
//     }
//     response.redirect('/?message=nao-logado');
// };

router.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
router.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { successRedirect: '/loggedArea',
                                       failureRedirect: '/error' }));

router.get("/", function(req,res) {
    //res.json({"response": "get called"});
    // const resp = {"response":"get called"};
    // res.render("template", resp);
    res.sendFile(__dirname + "/views/login/login.html");
});

// router.get("/loggedArea", isLoggedIn, function(req,res) {
router.get("/loggedArea", function(req,res) {
    //res.json({"response": "get called"});
    const resp = {"user":req.user};
    res.render("template", resp);
});

router.get("/error", function(req,res) {
    //res.json({"response": "get called"});
    console.log("/error - ERRRROORRR");
    const resp = {"response":"ERROR HAS BEEN OCCURRED."};
    res.render("template", resp);
});

module.exports = router;