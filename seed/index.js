var UserModel  = require('../models/UserModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// DB connection
var MONGODB_URL = process.env.MONGODB_URL;
var mongoose = require("mongoose");
mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//don't show the log when it is test
	if(process.env.NODE_ENV !== "test") {
		console.log("Connected to %s", MONGODB_URL);
		console.log("App is running ... \n");
		console.log("Press CTRL + C to stop the process. \n");
	}
})
	.catch(err => {
		console.error("App starting error:", err.message);
		process.exit(1);
	});
var db = mongoose.connection;

const hash = bcrypt.hashSync('password', 10);
var newUser = new UserModel({
    email: 'admin@admin.com',
    firstName: 'admin',
    lastName: 'admin',
    password: hash,
    isConfirmed:true
  });
  newUser.save(function (err, newUser) {
    if (err) throw err;
   

    let userData = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    };
   
     console.log(userData);                        
  });
  
  function exit() {
    mongoose.disconnect();
  }
