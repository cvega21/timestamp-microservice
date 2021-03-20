import React, { useState, useEffect } from 'react';


import './App.css';

const App = () => {
  const [time, setTime] = useState();
  const getTime = () => {
    fetch("http://localhost:9000/users")
    .then(r => r.text())
    .then(response => setTime(response));
  }


  return (
    <div className="App">
      <header className="App-header">
      <button onClick={getTime}>get time</button>
      <p>time: {time}</p>
      </header>
    </div>
  );
}

export default App;
