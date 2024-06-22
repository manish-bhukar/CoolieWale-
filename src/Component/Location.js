import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BanarasCoordinates = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/banaras-coordinates');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch coordinates');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Distance and Duration from Current Location to Banaras Railway Station</h2>
      {data && (
        <div>
          <p>
            <strong>Origin Address:</strong> {data.originAddress}
          </p>
          <p>
            <strong>Destination Address:</strong> {data.destinationAddress}
          </p>
          <p>
            <strong>Distance:</strong> {data.distance.text} ({data.distance.value} meters)
          </p>
          <p>
            <strong>Duration:</strong> {data.duration.text} ({data.duration.value} seconds)
          </p>
        </div>
      )}
    </div>
  );
};

export default BanarasCoordinates;
