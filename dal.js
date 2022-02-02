//DATA ABSTRACTION LAYER
const MongoClient = require('mongodb').MongoClient;
//docker
// const url = 'mongodb://mongo:27017/badbank-backend';
const url = 'mongodb://localhost:27017';
let db = null;

//connect to mongo
MongoClient.connect(url, {useUnifiedTopology: true},function (err,client) {
  console.log("Connected succesfully to db server");

  //connect to myproject database
  db = client.db('myproject');
});

// create user account
function create(name, email, password) {
  return new Promise((resolve, reject)=> {
    const collection = db.collection('users');
    const doc = {name, email, password, balance: 0};
    collection.insertOne(doc, {w:1},function(err,result){
      err ? reject(err) : resolve(doc) ;
    })
  })
}

//deposit
function deposit(email,amount) {
  return new Promise((resolve, reject)=> {
    const query = {email};
    const collection = db.collection('users');
    const user = collection.findOne(query);
    user.then(value => {
      if(value) {
        const newValues = {$set:{balance: parseFloat(value.balance) + parseFloat(amount)}};
        collection.updateOne(query, newValues,function(err,result){
          err ? reject(err) : resolve(result) ;
        });
      }
      else {
        reject("User not found");
      }
    });
  })
}

//withdraw
function withdraw(email,amount) {
  return new Promise((resolve, reject)=> {
    const query = {email};
    const collection = db.collection('users');
    const user = collection.findOne(query);
    user.then(value => {
      if(value) {
        if(parseFloat(value.balance) >= parseFloat(amount)){
          const newValues = {$set:{balance: parseFloat(value.balance) - parseFloat(amount)}};
          collection.updateOne(query, newValues,function(err,result){
            err ? reject(err) : resolve(result) ;
          });
        }
        else {
          reject("Not enough money");
        }
      }
      else {
        reject("User not found");
      }
    });
  })
}

function getUserInfo(email) {
  return new Promise((resolve, reject)=> {
    const customers = db.collection('users').findOne({email}).then(function (value) {
      value ? resolve(value) : reject("user not found");
    });
  })
}

function all() {
  return new Promise((resolve, reject)=> {
    const customers = db.collection('users').find({}).toArray(function (err,docs) {
      err ? reject(err) : resolve(docs);
    });
  })
}

module.exports = {create,all,deposit,withdraw,getUserInfo};
