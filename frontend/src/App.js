import React from 'react';
import Login from './components/login';
import SearchBox from './components/searchbox';

function App() {
  return (
    <div className="App">
      <h1>Startup Network Finder</h1>
      <Login />
      <SearchBox />
    </div>
  );
}

export default App;
