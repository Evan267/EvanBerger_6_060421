const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

mongoose.connect('mongodb+srv://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD + '@cluster0.oyxua.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(error => console.log('Error :' + error));

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

const userRoutes = require('./routes/auth');
app.use('/api/auth', userRoutes);

const saucesRoutes = require('./routes/sauces');
app.use('/api/sauces', saucesRoutes);

module.exports = app;