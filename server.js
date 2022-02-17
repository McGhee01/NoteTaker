// importing express package for the server framework
const express = require('express');
// importing file path resolution
const path = require('path');
// const noteData = require('./db/db.json');
const api = require('./routes/index.js');
// defining the port variable
const PORT =  process.env.PORT || 3001;
// creating out server object
const app = express();
// Import custom middleware, "cLog"
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);
// determines the supporting assets are getting pulled from
app.use(express.static('public'));
// HTML ROUTES
// GET http://localhost:3001/notes
// changed '/' to '/notes'
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);

//VERY IMPORTANT THE API ROUTES!
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
  readFromFile,
  readAndAppend,
  writeToFile,
} = require('./helpers/fsUtils');
// GET Route for retrieving all the notes
router.get('/', (req, res) => {
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
//POST ROUTE
router.post('/', (req, res) => {
    console.log(req.body);
    const { title, text} = req.body;
    if (req.body) {
      const newNote = {
        title,
        text,
        note_id: uuidv4(),
      };
      readAndAppend(newNote, './db/db.json');
      res.json(`Note added successfully :rocket:`);
    } else {
      res.error('Error in adding Note');
    }
  });
