// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./Routes/LiveTrain.js');
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
  const router = {
    // traininfo: '/getTrainInformation',
    // trainbtwnstn: '/getTrainBtwStation',
    // trainonDate: '/getTrainOnDate',
    // trainrouter: '/getRoute',
    trainlive:'/getLiveTrainInfo',
    // PNRinfo:'/getPNRinfo'
  };
  // app.get(router.traininfo, routes.getTrainInformation);
  // app.get(router.trainbtwnstn, routes.getTrainBtwStation);
  // app.get(router.trainonDate, routes.getTrainOnDate);
  // app.get(router.trainrouter, routes.getRoute);
  app.get(router.trainlive,routes.getLiveTrainInfo);
  // app.get(router.PNRinfo,routes.getPNRinfo);
  app.use('*', routes.handleInvalidPath);

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
