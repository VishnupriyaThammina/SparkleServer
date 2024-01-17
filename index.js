const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); 
require('dotenv').config()
const uri = process.env.uri;
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const connDb = require('./config/db')
const cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(bodyParser.json())
app.use(cors())



app.use('/users',userRoutes);
app.use('/posts',postRoutes);



const port = process.env.PORT || 8080;
connDb(uri)

app.listen(port, () => {
    console.log(`Sparkling backend on port ${port}`);
});

module.exports = app;