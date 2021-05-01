# Timestamp Converter App

An API/web app to convert a timestamp from Unix to UTC and viceversa. Built for FreeCodeCamp's APIs and Microservices certification [(completed in April 2021)](https://www.freecodecamp.org/certification/cvega21/apis-and-microservices).

<img src="https://user-images.githubusercontent.com/54726618/116797189-9078de00-aaa8-11eb-800a-29efcb4ba47d.gif" width="600" height="500">



## API Endpoints
1. `GET /api/timestamp/:date?`
    - Expected date parameter value: UTC Date (YYYY-MM-DD) OR Unix Date (e.g. 1234567...)
    - Expected response: `{"unix":1609459200000,"utc":"Fri, 01 Jan 2021 00:00:00 GMT"}`

## Tech Stack / Architecture
The app is built on a **Node.JS**/**Express** back-end, and a **React** front-end. Additionally, I used React Bootstrap for the buttons.
