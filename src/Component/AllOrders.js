import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OrderList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const ordersPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userEmail = localStorage.getItem('emailId');
        console.log(userEmail);
        const response = await axios.get(`http://localhost:5000/allorders?email=${userEmail}`);
        console.log(response)
        const fetchedOrders = response.data.orders || [];
        setAllOrders(fetchedOrders);
        setTotalPages(Math.ceil(fetchedOrders.length / ordersPerPage));
        setCurrentPage(1); // Reset to first page when fetching new orders
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching orders', err);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    const start = (currentPage - 1) * ordersPerPage;
    const end = start + ordersPerPage;
    setOrders(allOrders.slice(start, end));
  }, [currentPage, allOrders]);

  const handleViewOrder = (orderId) => {
    navigate(`/orders/${orderId}/update`);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) {
    return <div className="container mx-auto px-8 py-8 text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-8 py-8">
      <h1 className="text-2xl font-bold mb-8 text-center">My Orders</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">Order ID</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">Date</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">Time</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">Station</th>
              <th className="w-1/5 py-3 px-4 uppercase font-semibold text-sm">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="w-1/5 py-3 px-4">{order._id}</td>
                <td className="w-1/5 py-3 px-4">{order.date}</td>
                <td className="w-1/5 py-3 px-4">{order.time}</td>
                <td className="w-1/5 py-3 px-4">{order.stationName}</td>
                <td className="w-1/5 py-3 px-4">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => handleViewOrder(order._id)}
                  >
                    Update Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <nav className="inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
          <button
            className={`relative inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
              currentPage === 1 ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Previous</span>
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                currentPage === index + 1 ? 'bg-indigo-600 text-white' : 'text-gray-900'
              } ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className={`relative inline-flex items-center px-4 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
              currentPage === totalPages ? 'bg-gray-200 text-gray-700' : 'hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Next</span>
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OrderList;
