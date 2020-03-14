var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// ===================
// AUTH ROUTES
// ===================

router.get("/", function(req, res){
	res.render("landing");
});


// show register form 
router.get("/register", function(req, res){
	res.render("register");
});

// handling sign up logic!
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.render("register");
		}
		passport.authenticate("local")(req, res, function(){
			req.flash("success", "Welcome to Yelpcamp " + user.username);
			res.redirect("/campgrounds");
		});
	})
});

//show login form
router.get("/login", function(req, res){
	res.render("login");
});

//handling login logic...
// router.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local", 
				{
					successRedirect: "/campgrounds",
					failureRedirect: "/login"
				}) ,function(req, res){

});

//Logout
router.get("/logout", function(req, res){
	// res.logout();
	// res.redirect("/campgrounds");
	req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  	});
});



module.exports = router;
