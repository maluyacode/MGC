const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const morgan = require("morgan");


app.use(cors());
app.options("*", cors());

app.use(express.json());
app.use(morgan('tiny'));
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/category', categoryRoutes);

module.exports = app;