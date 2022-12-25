
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import React from 'react';
const Weather = (props) =>{

  const isCelcius = props.isCelcius
  const mainTemperature = isCelcius ? `${props.temperature} ${ReactHtmlParser("&#x2103;")}` : `${(props.temperature * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`
  const feelsLikeTemp = isCelcius ? `${props.feelsLike} ${ReactHtmlParser("&#x2103;")}` : `${(props.feelsLike * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`
  const lowTemp = isCelcius ? `${props.lowTemp} ${ReactHtmlParser("&#x2103;")}` : `${(props.lowTemp * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`
  const highTemp = isCelcius ? `${props.highTemp} ${ReactHtmlParser("&#x2103;")}` : `${(props.highTemp * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`


  return(
    <div className="weather-component">
      <div className="basic-weather-info">
        <h2 id="location">{props.locationName}</h2>
        <div className="temperature">
          <h1 id="temperature-value">{mainTemperature}</h1>
        </div>
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
            <p>{feelsLikeTemp} &#x2103;</p>
          </div>
          <div className="low-temperature">
            <p>Low</p>
            <p>{lowTemp} &#x2103;</p>
          </div>
          <div className="high-temperature">
            <p>High</p>
            <p>{highTemp} &#x2103;</p>
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