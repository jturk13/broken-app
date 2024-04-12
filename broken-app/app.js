// Import required modules
const express = require('express');
const axios = require('axios');

// Create an Express app
const app = express();
app.use(express.json());

// Define route handler
app.post('/', async (req, res) => {
  try {
    // Validate request body
    if (!req.body || !req.body.developers || !Array.isArray(req.body.developers)) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const developers = req.body.developers;

    // Fetch GitHub user information for each developer concurrently
    const results = await Promise.all(developers.map(fetchUserInfo));

    // Send response
    res.json(results);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Helper function to fetch GitHub user information
async function fetchUserInfo(developer) {
  try {
    const url = `https://api.github.com/users/${developer}`;
    const response = await axios.get(url);
    return {
      name: response.data.name,
      bio: response.data.bio
    };
  } catch (error) {
    console.error(`Error fetching user ${developer}:`, error.message);
    return { error: `Error fetching user ${developer}` };
  }
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
