import axios from 'axios';

const API_KEY = 'b02ad07b3amsh68ae1baa47b6f1ap1ac51cjsn33db446b4a0d';
const API_HOST = 'yahoo-weather5.p.rapidapi.com';

const fetchWeatherData = async (location) => {
  const options = {
    method: 'GET',
    url: `https://${API_HOST}/weather`,
    params: {
      location: location,
      format: 'json',
      u: 'f'
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': API_HOST
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch weather data:', error);
    throw error;
  }
};

export { fetchWeatherData };



