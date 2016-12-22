import express from 'express';

const router = express.Router();

/*
    ACCOUNT SIGNUP: POST /api/account/signup
    BODY SAMPLE: { "username": "test", "password": "test" }
    ERROR CODES:
        1: BAD USERNAME
        2: BAD PASSWORD
        3: USERNAM EXISTS
*/

router.post('/signup', (req, res) => {
    //CHECK USERNAME FORMAT
    let usernameRegex = /^[a-z0-9]+$/;

    if(!usernameRegex.test(req.body.username)) {
      return res.status(400).json({
        error: "BAD USERNAME",
        code: 1
      });
    }

    // CHECK PASS LEGENTH
    if(req.body.password.length < 4 || typeof req.body.password !== "string") {
      return res.status(400).json({
        error: "BAD PASSWORD",
        code: 2
      });
    }

    // CHECK USER EXISTANCE
    Account.findOne({ username: req.body.username }, (err, exists) => {
      if(err) throw err;
      if(exists){
        return res.status(409).json({
          error: 'USERNAME EXISTS',
          code: 3
        });
      }

      // CREATE Account
      let account = new Account({
        username: req.body.username,
        password: req.body.password
      });

      account.password = account.gereateHash(account.password);

      // SAVE IN THE DATABASE
      account.save( err => {
        if(err) throw err;
        return res.json({ success : true});
      });

    });
});

router.post('/signin', (req, res) => {
  if(typeof req.body.password !== "string") {
    return res.status(401).json({
      error: "LOGIN FAILED",
      code: 1
    });
  }

  // FIND THE USER BY USERNAME
  Account.findOne({ username: req.body.username }, (err, account) => {
    if(err) throw err;

    // CHECK ACCOUNT EXISTANCY
    if(!account) {
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // CHECK WHETHER THE PASSWORD IS VALID
    if(!account.vaildateHash(req.body.password)){
      return res.status(401).json({
        error: "LOGIN FAILED",
        code: 1
      });
    }

    // ALTER SESSION
    let session - req.session;
    session.loginInfo = {
      _id: account._id,
      username: account.username
    };

    // RETURN success
    return res.json({
      success: true
    });
  });

});

router.get('/getinfo', (req, res) => {
    if(typeof req.session.loginInfo === "underfined") {
      return res.status(401).json({
        error: 1
      });
    }

    res.json({ info: req.session.loginInfo });
});

router.post('/logout', (req, res) => {
  req.session.destory(err => { if(err) throw err; });
    return res.json({ success: true });
});

export default router;
