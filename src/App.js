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
    let utcIsValid = true;
    let unixIsValid = true;
    let validChars = /^[0-9 -]+$/g;
    
    if (unix && utc && !answerDidFetch) {
      setInputIsInvalid(true);
      return;
    }

    if (utc && !validChars.test(utc)) {
      setInputIsInvalid(true);
    } else if ((unix && !validChars.test(unix))) {
      setInputIsInvalid(true);
    } else {
      setInputIsInvalid(false);
    }

    if (utc) {
      console.log(utc);
      console.log(Date.parse(utc));
    } else if (unix) {
      console.log(unix);
    }


  }, [unix, utc, answerDidFetch])
  
  const getTime = () => {
    let timeParam = "";
    let apiTimestamp = "http://localhost:9000/api/timestamp";
    
    if (unix && utc) {
      alert('please select only one type of date');
      handleClear();
      return;
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
      console.log('last part of fetch')
      let jsonResponse = JSON.parse(response);
      console.log(`${jsonResponse}`);
      console.log(`${jsonResponse.error}`);
      if (jsonResponse.error) {
        alert('invalid date');
        handleClear();
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
    let keyPressed = e.nativeEvent.data;    
    let currentInput = e.target.value;
    
    if (answerDidFetch) {
      handleClear();
      if(e.target.className === "UnixInput") {
        setUnix(keyPressed)
        return;
      } else {
        setUTC(keyPressed)
        return;
      };
    }
    
    if (e.target.value.length > 10 && e.target.className === "UTCInput") {
      return;
    } else if (e.target.value.length > 13 && e.target.className === "UnixInput") {
      return;
    }
    
    if (e.target.className === "UnixInput") {
      setUnix(e.target.value)
    } else {
      setUTC(e.target.value)
    }

    // if (!validChars.test(utc)) {
    //   console.log('aaaaaaa');
    //   setInputIsInvalid(true);
    // } else {
    //   setInputIsInvalid(false);
    // }
    
    
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
