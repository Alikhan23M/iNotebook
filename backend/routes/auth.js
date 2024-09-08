// ================================= Required Models =========================================
// import express
const express = require('express');

// import express router because this file is inside another a path which is api/auth so for routing in this file we will use the expres router
const router = express.Router();

// import the user model that we have created in user schema
const User = require('../models/User')

// import the express vailidator which will check our emails, names and passwords. It finds out weather the email is correct or not and also if put a custom condition on a variable it checks for that forexample name must be atleast three charaters
const { body, validationResult } = require('express-validator');

// Import jsonwebtoken which will provide an authentication token to the user without that token user wont be accessiable 
const jwt = require('jsonwebtoken');

// Import the bcryptjs for converting the plane password to hashes and adding salt into it
const bcrypt = require('bcryptjs');

// Middle ware
const fetchuser = require('../middleware/fetchuser')

// ================================= Token sign secret =========================================

// This is a secret key by which we sign the authentication token and it keeps a safe connection between the user and the server
const JWT_SECRET = 'Aliisagood$boy'

// ================================= Route 1 =========================================

// ROUT1: create a user usin Post api/auth/createuser: No log in required because user comes first time and we have to create user

/*
    in body('','') the first one is the name of the input field by which we recognized it 
    and the second one is a custome error message means if the condition was not satisfied 
    it will show this error
*/
router.post('/createuser', [
  body('name', 'Name must contain atleast 3 characters').isLength({ min: 3 }),
  body('email', 'Enter a vaild email').isEmail(),
  body('password', 'Pass word should contain atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);

  // if errors and errors.isempty is not true then throw the error

  if (!errors.isEmpty()) {
    console.log('error occured')

    // return the errors array
    return res.status(400).json({ success,errors: errors.array() });
  }

  // If there are no errors then the following blocks of code will be executed

  try {

    // Check weather the user with the same email exist or not
    let user = await User.findOne({ email: req.body.email });

    // If exist then return a warning
    if (user) {
      return res.status(400).json({success, error: 'Sorry a user with the same email already exist' });
    }

    // If not exist then execute the following code

    // Generate a salt to be added with the password
    const salt = await bcrypt.genSalt(10);

    // let secure password is a password that is converted to hashes and salt is added to it
    const secPassword = await bcrypt.hash(req.body.password, salt);

    // Now create the user in the data base
    user = await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email,
    })
    let username = user.name

    // Now store the id of this user who has been created in the database in the data array because we will use this id to issue authentication token
    const data = {
      user: {
        id: user.id,
      }
    }

    // Sign the authentication token with the secret key
    const authToken = jwt.sign(data, JWT_SECRET);

    // Return the token as a json
    success = true;
    res.json({success, authToken, username});

  } catch (error) {

    // If something wrong occurs so then send a status of error
    console.log(error.message);
    res.status(500).send('some errors occured during the process');

  }
})

// ================================= Route 2 =========================================

// ROUT2: Authenticate a user /api/auth/login: no login required because the user is loging in now. This is for the user who have already singed up and now need to login

router.post('/login', [

  // Check the email and password  exists and the email used is vaild
  body('email', 'Enter a vaild email').isEmail(),
  body('password', 'Password cannot be blank').exists(),

], async (req, res) => {

  const errors = validationResult(req);
  let success = false;
  // if errors then throw the error

  if (!errors.isEmpty()) {

    console.log('error occured')
    return res.status(400).json({ errors: errors.array() });

  }

  // From body get the email and password
  const { email, password } = req.body;

  try {

    // find the user email in the data base
    let user = await User.findOne({ email });

    
    // if email is not found then return error 
    if (!user) {
      return res.status(400).json({ error: 'Incorrect Email or Password, Please try with correct credentials' })
    }
    let username = user.name;

    // Compare the password now using bcrypt here password is that one which user has entered now and user.password is the one that is present in that user data base 
    const passwordCompare = await bcrypt.compare(password, user.password);

    // If password does not matches then return an error
    if (!passwordCompare) {
      success = flase;
      return res.status(400).json({ success,error: 'Incorrect Email or Password, Please try with correct credentials' })
    }

    // If the password mathes then store that user id in the obj because by this id we will issue an authentiaction token
    const data = {
      user: {
        id: user.id,
      }
    }

    // Issue an auth token and sign it by secret key
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true
    // Return the token as json file
    res.json({ success,authToken,username });

  } catch (error) {
    console.log(error.message);
    res.status(500).send('some internal servererrors occured during the process')
  }
})


// ================================= Route 3 =========================================

// Get Logedin user details using Post:  /api/auth/getuser : Login Required, when a user login is successfull then we have to fetch all the data of that user from the data base

router.post('/getuser',fetchuser, async (req, res) => {
  try {

    // as the req.user now is the user from the auth token and the auth token is decoded in the middleware fetchuer so we will simply get the user id and we will use that user id to fetch that user data
    const userId = req.user.id;

    // Now after getting the id send all the data {name, email} of the user except password in response
    const user = await User.findById(userId).select("-password");
    res.send(user)
    
  } catch (error) {
    console.log(error.message);
    res.status(500).send('some errors occured during the process');
  }
})
module.exports = router
