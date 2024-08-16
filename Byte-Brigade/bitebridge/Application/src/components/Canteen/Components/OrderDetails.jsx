import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance'; // Import the axiosInstance
import { useParams, useNavigate } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axiosInstance.get(`/canteen/getOrder/${orderId}`);
        setOrderData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching order data:', err.response ? err.response.data : err.message);
        setError('Failed to fetch order data.');
      }
    };

    fetchOrderData();
  }, [orderId]);

  const handleMarkAsServed = async () => {
    try {
      await axiosInstance.delete(`/canteen/served/${orderId}`);
      alert('Order marked as served!');
      navigate('/canteen'); // Redirect back to the QrScanner page
    } catch (err) {
      console.error('Error marking order as served:', err.response ? err.response.data : err.message);
      setError('Failed to mark order as served.');
    }
  };

  return (
    <div>
      <h1>Order Details</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {orderData ? (
        <div>
          <h2>Order ID: {orderData.id}</h2>
          <pre>{JSON.stringify(orderData, null, 2)}</pre>
          <button onClick={handleMarkAsServed}>Served</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default OrderDetails;
