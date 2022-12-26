import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import React from 'react';

const Forecast = (props) =>{
  const isCelcius = props.isCelcius
  const mainTemperature = isCelcius ? `${props.temperature} ${ReactHtmlParser("&#x2103;")}` : `${(props.temperature * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`
  const feelsLikeTemp = isCelcius ? `${props.feelsLike} ${ReactHtmlParser("&#x2103;")}` : `${(props.feelsLike * (9/5) + 32).toFixed(2)} ${ReactHtmlParser("&#x2109;")}`

  return(
    <div className="forecast">
      <p>{props.date}</p>
      <div className="forecast-weather">
        <img src={props.icon} alt="" />
        <p id="forecast-weather-description">
          {props.weather}
        </p>
      </div>

      <div className="forecast-temperatures">
        <h3>{mainTemperature}</h3>
        <p>Feels {feelsLikeTemp}</p>
      </div>
    </div>
  )
}

export default Forecast