import React, { useState, useEffect } from 'react';
import path from 'path';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [time, setTime] = useState();
  const [utc, setUTC] = useState("");
  const [unix, setUnix] = useState("");
  const [inputIsInvalid, setInputIsInvalid] = useState(false);
  const [answerDidFetch, setAnswerDidFetch] = useState(false);

  useEffect(() => {
    if (unix && utc && !answerDidFetch) {
      setInputIsInvalid(true);
    } else {
      setInputIsInvalid(false);
    }
  }, [unix,utc])
  
  const getTime = () => {
    let timeParam = "";
    let apiTimestamp = "http://localhost:9000/api/timestamp";
    
    if (unix && utc) {
      alert('please select one type of date');
      return
    } else if (utc) {
      timeParam = utc;
      apiTimestamp = path.join(apiTimestamp,timeParam);
    } else if (unix) {
      timeParam = unix;
      apiTimestamp = path.join(apiTimestamp,timeParam);
    } else {
      console.log('please type a date')
    }
    
    console.log(apiTimestamp);

    fetch(`http://localhost:9000/api/timestamp/${timeParam}`)
    .then(r => r.text())
    .then(response => {
      let jsonResponse = JSON.parse(response);
      console.log(`${jsonResponse}`);
      console.log(`${jsonResponse.error}`);
      if (jsonResponse.error) {
        setInputIsInvalid(true);
        console.log('ERRORRRRR!!!!!')
        return  
      }
      console.log(`${typeof(jsonResponse)}, ${jsonResponse}`);
      setTime(JSON.stringify(jsonResponse));
      setUnix(jsonResponse.unix);
      setUTC(jsonResponse.utc);
      setAnswerDidFetch(true);
    });
  }

  const handleChange = e => {    
    if (e.target.value.length === 10 && inputIsInvalid) {
      console.log('hit')
    } 

    if (answerDidFetch) {
      setAnswerDidFetch(false);
      if(e.target.className === "UnixInput") {
        setUnix(e.nativeEvent.data);
      } else {
        console.log(e.nativeEvent.data);
        setUTC('here');
      };
      console.log(e.nativeEvent.data);
    }
    
    if (e.target.className === "UnixInput") {
      console.log('2')
      setUnix(e.target.value)
    } else {
      console.log('2')
      setUTC(e.target.value)
    }
  }

  const handleClear = () => {
    setUTC("");
    setUnix("");
    setInputIsInvalid(false);
    setAnswerDidFetch(false);
  }

  return (
    <div className="App">
      <div className="mainContainer">
        <h1>Unix Timestamp Converter API</h1>
        <div className="inputContainer">
          <p>UTC Time (ISO)</p>
          <input placeholder="YYYY-MM-DD" value={utc} onChange={handleChange} className="UTCInput"></input>
        </div>      
        <div className="inputContainer">
          <p>Unix Time</p>
          <input placeholder="1234567890000000" value={unix} onChange={handleChange} className="UnixInput"></input>
        </div>      
        <div className="buttonsContainer">
          <Button variant="primary" onClick={getTime} id="getTimeButton">Get Time</Button>
          <Button variant="light" onClick ={handleClear}>Clear</Button>
        </div>
      </div>
      <div className="alertContainer">
        {inputIsInvalid && !answerDidFetch && <Alert variant={'danger'}>Please 
        enter a valid input, and submit only one type at a time.</Alert>}
      </div>  
    </div>
  );
}

export default App;
