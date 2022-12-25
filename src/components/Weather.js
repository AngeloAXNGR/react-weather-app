
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import React from 'react';
const Weather = (props) =>{
  const [tempMeasurement, setTempMeasurement] = React.useState(true)
  // const [tempMeasurement, setTempMeasurement] = React.useState('metric')

  const styles = {
    left: tempMeasurement ? "23%" : "45%",
    transform: tempMeasurement ? "translateX(-18%)" : "translateX(0)"
  }

  function toggleMeasurement(){
    setTempMeasurement(prevMeasurement => {return !prevMeasurement})

  }

  // return(
  //   <div className="weather-component">
  //     <h1 id="location">Weather in {props.locationName}</h1>
  //     <div id="temperature">
  //       <h2 id="temp-value">{tempMeasurement ? `${props.temperature} ${ReactHtmlParser("&#x2103;")}` : `${(props.temperature * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`}</h2>
  //       <div className="toggle-temperature">
  //         <p>C</p>
  //         <div className="switch">
  //           <div style={styles} onClick={toggleMeasurement} className="toggle-circle"></div>
  //         </div>
  //         <p>F</p>
  //       </div>
  //     </div>
  //     <h1 id="weather-description">{props.weather}</h1>
  //     <p id="humidity">Humidity: {props.humidity}%</p>
  //     <p id="windspeed">Windspeed: {props.windSpeed} m/s</p>
  //   </div>
  // )

  return(
    <div className="weather-component">
      <div className="basic-weather-info">
        <h2 id="location">{props.locationName}</h2>
        <h1 id="temperature">{props.temperature} &#x2103;</h1>
        <div className="weather">
          <img src={props.weatherIcon} alt="" />
          <h2 id="weather-description">
            {props.weather}
          </h2>
        </div>
      </div>
      <div className="detailed-weather-info">
        <div className="top-section">
          <div className="feels-temperature">
            <p>Feels</p>
            <p>{props.feelsLike} &#x2103;</p>
          </div>
          <div className="low-temperature">
            <p>Low</p>
            <p>{props.lowTemp} &#x2103;</p>
          </div>
          <div className="high-temperature">
            <p>High</p>
            <p>{props.highTemp} &#x2103;</p>
          </div>
        </div>
        <div className="bottom-section">
          <div className="wind">
            <p>Wind</p>
            <p>{props.windSpeed} m / s</p>
          </div>

          <div className="humidity">
            <p>Sunset</p>
            <p>{props.sunset}</p>
          </div>

          <div className="humidity">
            <p>Humidity</p>
            <p>{props.humidity} %</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather