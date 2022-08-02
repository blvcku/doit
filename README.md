# DOIT
Project created to improve team work for small groups of people
[Documentation in Polish](https://drive.google.com/file/d/1XtQCpkAJ2ZKXfdJMqxXz25Z4LwoA_Bo_/view?usp=sharing)

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)

## Technologies
Project is created with:
* React
* Styled Components
* React Router Dom
* Firebase functions
* Firestore
* Firebase storage
* Algolia
* Sendgrid

## Setup
To run this project, install it locally using npm:
```
$ git clone https://github.com/blvcku/doit.git
$ cd ./doit
$ firebase login --interactive
$ firebase use {your firebase project id}
$ firebase install
$ npm install
$ npm start
```
##### .env.local
```
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
REACT_APP_FIREBASE_MEASUREMENT_ID=
REACT_APP_ALGOLIA_KEY=
REACT_APP_ALGOLIA_APP=
```

##### /functions/.runtimeconfig.json
```
{
    "sendgrid": {
        "key": "",
        "tasktemplate": "",
        "postmessagetemplate": "",
        "verifyemailtemplate": "",
        "resetpasswordtemplate": "",
        "fromemail": ""
    },
    "algolia": {
        "app": "",
        "key": ""
    },
    "app":{
        "host": "",
        "bucket": ""
    } 
}
```
