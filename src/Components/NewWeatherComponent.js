import React, { useState } from 'react';
import { fetchWeatherData } from '../api/RapidAPI';
import './weather.css';
import { FaCloud, FaCloudSun, FaCloudShowersHeavy, FaSun, FaSnowflake, FaSmog, FaBolt,FaShower } from 'react-icons/fa';
import { Box, List, Paper, Stack, Typography } from '@mui/material';


const NewWeatherComponent = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  //---------------------

  const getWeatherIcon = (iconCode) => {
    switch (iconCode) {
      case 'Clear Day':
        return <FaSun />;
      case 'Sunny':
        return <FaSun />;
      case 'Rain':
        return <FaCloudShowersHeavy />;
      case 'Snow':
        return <FaSnowflake />;
      case 'sleet':
        return <FaSnowflake />;
      case 'wind':
        return <FaBolt />;
      case 'Hot':
        return <FaSun />;
      case 'Cloudy':
        return <FaCloud />;
      case 'Partly Cloudy':
        return <FaCloudSun />;
      case 'Mostly Cloudy':
        return <FaCloudSun />;
        case 'Showers':
          return <FaShower/>
      default:
        return <FaSun />;
    }
  };


  //---------------------

  const handleSearch = async () => {
    try {
      const data = await fetchWeatherData(location);
      setWeatherData(data);
      setError('');
    } catch (err) {
      setWeatherData(null);
      setError('Failed to fetch weather data. Please try again.');
    }
  };

  const convertFtoC = (f) => {
    return ((f - 32) * 5) / 9;
  };

  return (
    <Box className="weather-container">
       
      <Box className='header'>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
      </Box>
      

      {error && <p className="error">{error}</p>}

      {weatherData && (
        <div className="weather-data">

         <Paper sx={{minWidth:'300px',p:2, display:'flex'
          ,flexGrow:1, justifyContent:'space-between',
          background:'linear-gradient(135deg,rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))',
          backdropFilter:'blur(50px)',
          boxShadow:'0 8px 32px 0 ,rgba(0, 0, 0, 0.37)',
          borderRadius:'10px'
        
          }}>
         <Stack gap={1} textAlign={'start'} >
         <Typography variant='body1' sx={{fontSize:'27px'}}>Weather in {weatherData.location.city} / {weatherData.location.country} </Typography>
          <Typography variant='body1' sx={{fontSize:'27px'}}>The Timezone is : {weatherData.location.timezone_id}</Typography>
         </Stack>

          <Stack gap={1}  >
          <Typography variant='body1' sx={{fontSize:'27px'}}>{weatherData.current_observation.condition.text}</Typography>
          <div className="weather-icon">{getWeatherIcon(weatherData.current_observation.condition.text)}</div>
          </Stack>

         </Paper >

         {/* ***** */}
          <Stack  direction={"row"} flexWrap={'wrap'} gap={1} sx={{mt:'20px'}}>
          <Paper sx={{maxWidth:'35%',p:2,textAlign:'start'
          ,flexGrow:1, justifyContent:'space-between',
          background:'linear-gradient(135deg,rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))',
          backdropFilter:'blur(10px)',
          boxShadow:'0 8px 32px 0 ,rgba(0, 0, 0, 0.37)',
          borderRadius:'10px'}}
          
          >
          <Typography variant='body1' sx={{fontSize:'27px'}}>Temperature: {convertFtoC(weatherData.current_observation.condition.temperature).toFixed(2)}°C</Typography>
          <Typography variant='body1' sx={{fontSize:'27px'}}>Humidity: {weatherData.current_observation.atmosphere.humidity}%</Typography>
          <Typography variant='body1' sx={{fontSize:'27px'}}>Wind: {weatherData.current_observation.wind.speed} mph</Typography>
          <Typography variant='body1' sx={{fontSize:'27px'}}>Sunrise: {weatherData.current_observation.astronomy.sunrise}</Typography>
          <Typography variant='body1' sx={{fontSize:'27px'}}>Sunset: {weatherData.current_observation.astronomy.sunset}</Typography>
          
          </Paper>
          {/* ------------ */}

          <Paper sx={{maxWidth:'65%',p:2,textAlign:'start'
          ,flexGrow:1, justifyContent:'space-between',
          background:'linear-gradient(135deg,rgba(255, 255, 255, 0.2),rgba(255, 255, 255, 0.2))',
          backdropFilter:'blur(10px)',
          boxShadow:'0 8px 32px 0 ,rgba(0, 0, 0, 0.37)',
          borderRadius:'10px',maxHeight:'250px',overflow:'auto'}}>
          <h3>Forecast:</h3>
          <ul>
            {weatherData.forecasts.map((forecast, index) => (
              <List sx={{fontSize:'20px', lineHeight:1.5}} key={index}>
                {forecast.day}: {forecast.text} 
                (Low: {convertFtoC(forecast.low).toFixed(2)}°C, High: {convertFtoC(forecast.high).toFixed(2)}°C)
              </List>
            ))}
          </ul>
          </Paper>

          </Stack>

          {/* +++++++++ */}
        </div>
      )}
    </Box>
  );
};

export default NewWeatherComponent;


//----------------------------------------------------------------------


