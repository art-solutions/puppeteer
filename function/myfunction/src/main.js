import { Client } from 'node-appwrite';
import axios from 'axios';

// Regular expression to match email addresses
const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;

// This is your Appwrite function
// It's executed each time we get a request
export default async ({ req, res, log, error }) => {
  // The `req` object contains the request data
  if (req.method === 'GET' && req.query.url) {
    try {
      // Fetch content from the URL
      const response = await axios.get(req.query.url);
      const data = response.data;

      // Extract email addresses
      const emails = data.match(emailRegex) || [];

      // Send the extracted emails as a response
      return res.json({
        emails: emails
      });
    } catch (err) {
      // Log the error and return a message
      error(err.message);
      return res.json({
        error: 'Failed to fetch the URL or extract emails.'
      });
    }
  } else {
    // Return an error if the URL parameter is not provided
    return res.json({
      error: 'Please provide a URL as a query parameter.'
    });
  }
};
