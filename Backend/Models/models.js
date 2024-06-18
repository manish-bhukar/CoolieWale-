const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email:{type:String,required:true},
    luggageType: { type: String, required: true },
    orderStatus: { type: String, required: true },
    stationName: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
