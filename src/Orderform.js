// src/pages/OrderForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const [name, setName] = useState('');
  const [luggageType, setLuggageType] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [stationName, setStationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email=localStorage.getItem('emailId');
    const order = { name, luggageType, orderStatus, stationName, date, time ,email};
    try {
      const response = await axios.post('http://localhost:5000/orders/ord', order);
      toast.success(response.data.message || 'Order submitted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Error submitting order');
    }
  };

  const handleAllOrdersClick = () => {
    navigate('/orders');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Order Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Your Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Luggage Type</label>
            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={luggageType}
              onChange={(e) => setLuggageType(e.target.value)}
            >
              <option value="">Select Luggage Type</option>
              <option value="Big Bag">Big Bag</option>
              <option value="Small Bag">Small Bag</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Order Status</label>
            <select
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={orderStatus}
              onChange={(e) => setOrderStatus(e.target.value)}
            >
              <option value="">Select Order Status</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
              <option value="In Progress">In Progress</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Station Name</label>
            <input
              type="text"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={stationName}
              onChange={(e) => setStationName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              className="mt-1 p-2 w-full border border-gray-300 rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-4">
            Submit
          </button>
          <button type="button" className="bg-gray-500 text-white p-2 rounded w-full" onClick={handleAllOrdersClick}>
            View All Orders
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderForm;
