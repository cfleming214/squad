const express = require('express');
// var fs = require('fs');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const pg = require('pg');
const db = require('./database');
const path = require('path');
const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const FeatureController = require('./controllers/FeatureController');
const Projects = require('./models/ProjectModel');
const Messages = require('./models/MessageModel');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//get index.html
app.get('/', function (req, res) {
  res.status(200);
  res.set({'Content-Type': 'text/html; charset=utf-8'});
  res.sendFile(path.join(__dirname, '/../client/index.html'));
})

//get style.css
app.get('/style.css', function (req, res) {
  res.status(200);
  res.set({'Content-Type': 'text/css; charset=utf-8'});
  res.sendFile(path.join(__dirname, '/../client/style.css'));
})

//get bundle.js
app.get('/bundle.js', function (req, res) {
  res.status(200);
  res.set({'Content-Type': 'application/json; charset=utf-8'});
  res.sendFile(path.join(__dirname, '/../client/public/bundle.js'));
})

app.use(express.static(path.join( __dirname, '../client/')));

// add new user to database from sign-up page, send to userController middleware
app.post('/signup', UserController.signup);

// authenticate existing user from login page, send to UserController middleware
app.post('/login', UserController.login);

// create new project row in database, send to ProjectController middleware
app.post('/createProject', ProjectController.create);

app.get('/projects', function(req, res){
  Projects.findAll().then(function(project) {
        res.send(project);
      });
})

app.post('/addFeature', FeatureController.create);

app.get('/features', FeatureController.getFeatures)

app.get('/messages', function(req, res) {
  console.log('getting current messages...');
  Messages.findAll().then(function(messages) {
    res.send(messages);
  })

});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
