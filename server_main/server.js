'use strict';
const log = console.log;

const express = require('express')
const bodyParser = require('body-parser')
const { ObjectID } = require('mongodb')

// Mongoose
const { mongoose } = require('./db/mongoose');
const { User, Admin, Post } = require('./models/restaurant')

// Express
const port = process.env.PORT || 3000
const app = express();





















//////////

app.listen(port, () => {
	log(`Listening on port ${port}...`)
});

