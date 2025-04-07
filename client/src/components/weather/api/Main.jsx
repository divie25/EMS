import { Container, Typography } from '@mui/material';
import { useState } from 'react';
import SearchBar from './searchbar';
import WeatherCard from './weathercard';
import Forecast from './forecast';
import { getWeatherByCity, getForecastByCity } from './api';

function MainWeather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const handleSearch = async () => {
    const w = await getWeatherByCity(city);
    const f = await getForecastByCity(city);
    setWeather(w);
    setForecast(f);
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h3" align="center" gutterBottom>
        🌤️ Weather Report
      </Typography>
      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />
      <WeatherCard data={weather} />
      <Forecast forecast={forecast} />
    </Container>
  );
}

export default MainWeather;
