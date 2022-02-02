# Badbank
This is an express project created to learn to develop MERN applications. The frontend was made in react and it's build files where placed on the build folder to make deployment easy. You can find the front end code here [BadBank Frontend](https://github.com/jfdlv/badbank)

NOTE: you'll need to generate your own frontend if you want the firebase authentication to work correctly. More instructions on the frontend repo

## Steps to Run

First you need to get your firebase admin config from your firebase console. 

Go to your Firebase project settings, navigate to “Service Accounts,” and on the bottom of the screen, select “generate a new private key.”

save this file as a `.json` you'll need to call it from `admin.js`

```JS
const admin = require('firebase-admin');

const serviceAccount = require("./your_file_name.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
```

once you do that you can simply go ahead and do:

`npm install`

`node index.js`

### NOTE: You need to have mongo running for this to work correctly if you have docker desktop on your local you can create a mongo image and run it with the command:

`docker run -p 27017:27017 --name badbank -d mongo`