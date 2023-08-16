import React, {useState}from "react";
import axios from "axios";
import './index.css';


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZ-QzGiZNGqbrl9n7ku-omnUxe7oy_ER0",
  authDomain: "weatherapp4103.firebaseapp.com",
  projectId: "weatherapp4103",
  storageBucket: "weatherapp4103.appspot.com",
  messagingSenderId: "1075973696371",
  appId: "1:1075973696371:web:390f14ada090547e9e7306",
  measurementId: "G-BE11SNW0YB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);







function App() {
  const[data,setData]=useState({});
  const[location,setLocation]=useState('')

   const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2988bd5405678a953e06d8fed5ff4266`
  
   const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }
  
  return (
    <div className="app">
       <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyDown={searchLocation}
          placeholder='Enter Location'
          type="text"/>
      </div>
      <div classname="container">
        <div className="top">
        <div className="location">
        <h1 className="bold">{data.name}</h1>
        <div className="bold">{data.sys ? <p className="bold">{data.sys.country}</p>:null}</div>
        <div className="longlat">{data.coord ? <p>lat={data.coord.lat}</p>:null}&ensp; &ensp; &ensp;{data.coord ? <p>long={data.coord.lon}</p>:null}
        </div>
        </div>
        <div className="temp">
          {data.main ?<h1>{(data.main.temp-274).toFixed(2)}°C</h1>:null}
        
          {data.main ? <p>min={(data.main.temp_min-274).toFixed(2)}°C &ensp;max={(data.main.temp_max-274).toFixed(2)}°C  </p> :null}
         
        </div>
        <div className="description">
          {data.weather ? <h2 className="bold">{data.weather[0].main}</h2>:null}
          {data.weather ? <p>{data.weather[0].description}</p>:null}
        </div>

        </div>
        { data.name!== undefined &&
        <div className="bottom">
        <div className="feels-like">
          <p className="bold">{data.main ?<h1>{(data.main.feels_like-274).toFixed(2)}°C</h1>:null}</p>
          <p className="bold">Feels Like</p>
        </div>
        <div className="humidity">
          <p className="bold">{data.main ?<h1>{data.main.humidity}%</h1>:null}</p>
          <p className="bold">Humidity</p>
        </div>
        <div className="pressure">
          <p className="bold">{data.main ?<h1>{(data.main.pressure)/1000}bar</h1>:null}</p>
          <p className="bold">Pressure</p>
        </div>
        <div className="winds">
          <p className="bold">{data.main ?<h1>{data.wind.speed}m/s</h1>:null}</p>
          <p className="bold">Wind Speed</p>
        </div>
        </div>
        }
        
      </div>
    </div>
  );
}

export default App;
