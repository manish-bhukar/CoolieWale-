// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const orders=require('./Controller/controller.js');
const UserRoute=require('./Routes/userroute.js');
const AllOrders=require('./Routes/Allorder.js')
const ordersRouter=require('./Controller/Orderupdate.js')
const banarasCoordinatesRoute=require('./Routes/locationroutes.js');
const app = express();
const port = 5000;
require("dotenv").config();
// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/usernew';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

  app.use('/orders',orders);
  app.use("/user",UserRoute);
  app.use('/api', banarasCoordinatesRoute);
  app.use('/allorders', AllOrders);
  app.use('/updateorders', ordersRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');no
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
