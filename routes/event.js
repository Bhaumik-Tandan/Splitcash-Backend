import { Router } from 'express';
import ip from 'express-ip';
import axios from 'axios';
import Event from '../models/event.js'; // Import the Event model

const router = Router();

// Use the express-ip middleware
router.use(ip().getIpInfoMiddleware);

router.route('/').post(async (req, res) => {
  const ipAddr = req.ipInfo.ip;

  try {
    let country = '';

    try {
      // Attempt to get country from ipinfo.io API
      const response = await axios.get(`https://ipinfo.io/${ipAddr}`);
      country = response.data.country;
    } catch (apiError) {
      console.error('Error calling ipinfo.io API:', apiError);
      // You can set a default country or handle the error based on your requirements
      // For now, let's set a default value
      country = 'UNKNOWN';
    }

    // Create a new event using the Event model
    const newEvent = new Event({
      name: req.body.name, // Assuming the name is sent in the request body
      country: country || ipAddr,
    });

    // Save the event to the database
    await newEvent.save();

    res.json({ message: 'resource ready' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
