import { BASE_URL } from './baseApi';
import axios from 'axios';

export const getWeatherForecast = async (city: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast/${city}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
