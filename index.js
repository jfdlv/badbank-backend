var express = require('express');
var app = express();
var cors = require('cors');
var dal = require('./dal.js');
const admin   = require('./admin');

app.use(express.static('public'));
app.use(cors());

app.get('/account/create/:name/:email/:password',function(req,res){
  const idToken = req.headers.authorization
  console.log('header:', idToken);

  if (!idToken) {
    res.status(401).send("Token missing!");
    return
  } 

  admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        console.log(decodedToken);
        dal.create(req.params.name, req.params.email, req.params.password).
          then(user => {
            console.log(user);
            res.send(user);
          });
      }).catch(function(error) {
        console.log('error:', error);
        res.status(401).send("Token invalid!");
      });
  
});

app.get('/account/deposit/:email/:amount', function(req,res){
  const idToken = req.headers.authorization
  console.log('header:', idToken);

  if (!idToken) {
    res.status(401).send("Token missing!");
    return
  } 

  admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
          console.log('decodedToken:',decodedToken);
          dal.deposit(req.params.email, req.params.amount)
          .then(user => {
            res.send(user);
          })
          .catch(err => {
            res.status(400).send(err);
          })
      }).catch(function(error) {
          console.log('error:', error);
          res.status(401).send("Token invalid!");
      });

 
});

app.get('/account/withdraw/:email/:amount', function(req,res){
  const idToken = req.headers.authorization
  console.log('header:', idToken);

  if (!idToken) {
    res.status(401).send("Token missing!");
    return
  } 

  admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        console.log('decodedToken:',decodedToken);
        dal.withdraw(req.params.email, req.params.amount)
          .then(user => {
            res.send(user);
          })
          .catch(err => {
            res.status(400).send(err);
          });
      }).catch(function(error) {
        console.log('error:', error);
        res.status(401).send("Token invalid!");
      });
  
});

app.get('/account/info/:email',function(req,res){
  const idToken = req.headers.authorization
  console.log('header:', idToken);

  if (!idToken) {
    res.status(401).send("Token missing!");
    return
  } 

  admin.auth().verifyIdToken(idToken)
      .then(function(decodedToken) {
        console.log(decodedToken);
        dal.getUserInfo(req.params.email).then(docs=>{
          console.log(docs);
          res.send(docs);
        })
      }).catch(function(error) {
        console.log('error:', error);
        res.status(401).send("Token invalid!");
      });
  
})

app.get('/account/all',function(req,res){
  dal.all().then(docs=>{
    console.log(docs);
    res.send(docs);
  })
})

var port = 3000;
app.listen(port);
console.log('Running on port: ' + port);