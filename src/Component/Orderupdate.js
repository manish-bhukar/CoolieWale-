// src/components/OrderUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OrderUpdate = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [stationName, setStationName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/updateorders/${orderId}`);
        setOrder(response.data);
        setStationName(response.data.stationName);
        setDate(response.data.date);
        setTime(response.data.time);
      } catch (err) {
        console.error('Error fetching order', err);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handleUpdateOrder = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/updateorders/${orderId}`, {
        stationName,
        date,
        time,
      });
      toast.success('Order updated successfully!');
      setTimeout(() => navigate('/orders'), 2000); // Redirect after 2 seconds
    } catch (err) {
      console.error('Error updating order', err);
      toast.error('Error updating order');
    }
  };

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">Update Order</h1>
      <form onSubmit={handleUpdateOrder} className="max-w-lg mx-auto bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Station Name</label>
          <input
            type="text"
            value={stationName}
            onChange={(e) => setStationName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mt-2"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4 w-full">
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default OrderUpdate;
