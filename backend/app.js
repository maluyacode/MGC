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
const productRoutes = require('./routes/productRoutes');

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

module.exports = app;