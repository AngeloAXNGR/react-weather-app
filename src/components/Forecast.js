const Forecast = (props) =>{
  return(
    <div className="forecast">
      <p>{props.date}</p>
      <p>{props.temperature} &#x2103;</p>
      <p>{props.weather}</p>
    </div>
  )
}

export default Forecast