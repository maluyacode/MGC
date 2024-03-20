const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require("morgan");


app.use(cors());
app.options("*", cors());

app.use(express.json({ limit: '50mb' }));
app.use(morgan('tiny'));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const userRoutes = require('./routes/userRoutes');

app.use('/api/v1/users', userRoutes);

module.exports = app;