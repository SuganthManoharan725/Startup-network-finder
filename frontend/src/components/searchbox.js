import React, { useState } from 'react';
import axios from 'axios';

const SearchBox = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.post('/api/search', { query });
     setResult(response.data.result);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter your query here" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
      />
      <button onClick={handleSearch}>Search</button>
      <div>{result && <p>{result}</p>}</div>
    </div>
  );
};

export default SearchBox;
