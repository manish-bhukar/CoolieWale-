const axios = require('axios');

// Controller to fetch Banaras Railway Station coordinates
exports.getBanarasCoordinates = async (req, res) => {
  try {
    const response = await axios.get('https://reversegeocoder.vercel.app/distance?lat=27.7131996&lon=75.0816605');
    
    // Extract relevant data from the response
    const { destination_addresses, origin_addresses, rows, status } = response.data;

    if (status === 'OK' && rows.length > 0) {
      const { text: distanceText, value: distanceValue } = rows[0].elements[0].distance;
      const { text: durationText, value: durationValue } = rows[0].elements[0].duration;

      // Return a structured JSON response with the extracted data
      res.json({
        originAddress: origin_addresses[0],
        destinationAddress: destination_addresses[0],
        distance: {
          text: distanceText,
          value: distanceValue
        },
        duration: {
          text: durationText,
          value: durationValue
        }
      });
    } else {
      console.error('Failed to fetch distance data');
      res.status(500).json({ message: 'Failed to fetch coordinates' });
    }
  } catch (error) {
    console.error('Error fetching Banaras Railway Station coordinates:', error);
    res.status(500).json({ message: 'Failed to fetch coordinates' });
  }
};
