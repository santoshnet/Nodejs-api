var UserModel  = require('../models/UserModel')
require("dotenv").config();
const jwt = require("jsonwebtoken");


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


var newUser = new UserModel({
    email: 'admin@admin.com',
    firstName: 'admin',
    lastName: 'admin',
    password: 'password'
  });
  newUser.save(function (err, newUser) {
    if (err) throw err;

    let userData = {
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    };
   
    const jwtPayload = userData;
							const jwtData = {
								expiresIn: process.env.JWT_TIMEOUT_DURATION,
							};
							const secret = process.env.JWT_SECRET;
							//Generated JWT token with Payload and secret.
							userData.token = jwt.sign(jwtPayload, secret, jwtData);

     console.log(userData);                        
  });
  
  function exit() {
    mongoose.disconnect();
  }
