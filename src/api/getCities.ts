import { BASE_URL } from './baseApi';
import axios from 'axios';

export const getCities = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cities`);

    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return [];
  }
};
