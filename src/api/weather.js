import axios from 'axios';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '5b9492dc5c68adef606be1945f54b3c5';

export const getWeather = async (city) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'uk',
      },
    });
    return {
      name: response.data.name,
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};


