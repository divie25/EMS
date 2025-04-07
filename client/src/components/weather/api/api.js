import axios from 'axios';

const API_KEY = '77b16abe37cb52d729344306dbed794f'; // Get it from openweathermap.org
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

export const getWeatherByCity = async (city) => {
  const res = await axios.get(`${BASE_URL}weather?q=${city}&units=metric&appid=${API_KEY}`);
  return res.data;
};

export const getForecastByCity = async (city) => {
  const res = await axios.get(`${BASE_URL}forecast?q=${city}&units=metric&appid=${API_KEY}`);
  return res.data;
};
