const find  = require('../models/investorMentorModel');

// Handle search query
const handleSearchQuery = async (req, res) => {
  const { query } = req.body;

  // Make sure query is provided
  if (!query || query.trim() === '') {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Search in the database for matching investors or mentors
    // We're doing a simple match by category (you can improve this to be more sophisticated if needed)
    const searchResults = await find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { type: { $regex: query, $options: 'i' } }
      ]
    });

    // Check if any results are found
    if (searchResults.length === 0) {
      return res.status(404).json({ message: 'No matching investors or mentors found.' });
    }

    // Format the result - In this case, return the names of the matched investors/mentors
    const result = searchResults.map(item => item.name);

    // Send back the result
    return res.json({ result: result.join(', ') });
  } catch (error) {
    console.error('Error in search query:', error);
    return res.status(500).json({ message: 'An error occurred while processing the search query.' });
  }
};

module.exports = { handleSearchQuery };
