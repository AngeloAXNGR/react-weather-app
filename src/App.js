import './App.css';
import React from 'react';

// Components
import Weather from './components/Weather';
import Forecast from './components/Forecast';

function App() {

  const [formData, setFormData] = React.useState({
    location: ''
  })

  const [location, setLocation] = React.useState('Baguio')
  const [measurementSystem, setMeasurementSystem] = React.useState(true);

  const [weatherData, setWeatherData] = React.useState({
    location: '',
    temperature: '',
    feelsLike:'',
    lowTemp: '',
    hightTemp: '',
    weather: '',
    humidity: '',
    windspeed: '',
    icon:'',
    sunset:'',

  });
  const [forecastData, setForecastData] = React.useState([]);

  React.useEffect(() => {
    async function getWeatherData(){
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=c052a20244df6c36546df606ba65008a&units=metric`)
      const data = await response.json();
      console.log(data);

      const weather = parseWeatherData(data);
      setWeatherData(weather);
      console.log(weatherData);
    }

    async function getForecastData(){
      const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&APPID=c052a20244df6c36546df606ba65008a&units=metric`);
      const data = await response.json()
      const forecast = data.list
      const parsedData = parseForecast(forecast);
      setForecastData(parsedData);
      console.log(forecastData);
      console.log(forecast)
    }

    getWeatherData();
    getForecastData();
  }, [location]);

  function parseWeatherData(data){
    const timeStamp = convertTimeStamp(data);

    return {
      location: data.name, 
      temperature: data.main.temp,
      feelsLike:data.main.feels_like,
      lowTemp: data.main.temp_min,
      highTemp: data.main.temp_max,
      weather: data.weather[0].description,
      humidity: data.main.humidity,
      windspeed: data.wind.speed,
      icon:`http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      sunset: timeStamp
    }
  }

  function convertTimeStamp(time){
    const date = new Date(time.sys.sunset * 1000)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    var timeValue;

    if (hours > 0 && hours <= 12) {
      timeValue= "" + hours;
    } else if (hours > 12) {
      timeValue= "" + (hours - 12);
    } else if (hours == 0) {
      timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (hours >= 12) ? " P.M" : " A.M";  // get AM/PM
    return timeValue
  }

  function parseForecast(data){
    let forecastArray = []
    for(let i = 0; i < data.length; i++){
      const dateText = data[i].dt_txt.split(" ")[0]
      const timeText = data[i].dt_txt.split(" ")[1]
      const date = new Date(dateText);
      const weekday = ["Sun","Mon","Tue","Wed","Thur","Fri","Sat"];
      const forecastObject = 
      {
        temperature: data[i].main.temp,
        feelsLike: data[i].main.feels_like,
        date: weekday[date.getDay()],
        time: timeText,
        weather: data[i].weather[0].description,
        icon:`http://openweathermap.org/img/w/${data[i].weather[0].icon}.png`,
      }
      if(forecastObject.time === "00:00:00"){
        forecastArray.push(forecastObject)
      }
    }

    return forecastArray
  }

  function handleChange(event){
    const {name, value, type, checked} = event.target

    setFormData(prevFormData =>{
      return {...prevFormData,
        [name]: type === "checkbox" ? checked : value
      }
    });
  }

  function handleKeyPress(event){
    if(event.key === 'Enter'){
      handleSubmit();
    }
  }

  function handleSubmit(){
    setLocation(formData.location)
  }

  const forecastList = forecastData.map((data) =>{
    return(
      <Forecast
        isCelcius={measurementSystem}
        date={data.date}
        temperature={data.temperature}
        feelsLike={data.feelsLike}
        weather={data.weather}
        icon={data.icon}
      />
      );
  })


  function toggleMeasurementSystem(){
    setMeasurementSystem(prevSystem => {return !prevSystem})
    console.log(measurementSystem);
  }

  const toggleStyle = {
    transform: measurementSystem ? "translateX(-37%)" : "translateX(63%)"
  }

  return (
    <div className="app">
      <header>
        <div className="search-bar">
            <input
              id="search-input"
              type="text"
              name="location"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              />
            <img src={require('./images/search-icon.png')} alt="" className="search-icon" onClick={handleSubmit}/>
          </div>
          <div className="switch">
              <p>C</p>
              <div style={toggleStyle} className="toggle-circle" onClick={toggleMeasurementSystem}>
              </div>
              <p>F</p>
          </div>
      </header>

        <div className="weather-details">
          <Weather
            isCelcius={measurementSystem}
            locationName={weatherData.location}
            temperature={weatherData.temperature}
            feelsLike={weatherData.feelsLike}
            lowTemp={weatherData.lowTemp}
            highTemp={weatherData.highTemp}
            weather={weatherData.weather}
            weatherIcon={weatherData.icon}
            windSpeed={weatherData.windspeed}
            humidity={weatherData.humidity}
            sunset={weatherData.sunset}
          />
          <div className="forecasts">
            {forecastList}
          </div>
        </div>
    </div>
  );
}

export default App;
