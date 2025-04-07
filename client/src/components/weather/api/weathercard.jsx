import { CardContent, Typography } from '@mui/material';
import { motion } from 'framer-motion';

const weatherBackgrounds = {
  Clear: '#FFF9C4',
  Clouds: '#CFD8DC',
  Rain: '#B3E5FC',
  Snow: '#E1F5FE',
  Thunderstorm: '#D1C4E9',
  Drizzle: '#B2EBF2',
  Mist: '#E0E0E0',
  Smoke: '#EEEEEE',
  Haze: '#F5F5F5',
  Dust: '#FFE0B2',
  Fog: '#BDBDBD',
  Sand: '#FFECB3',
  Ash: '#E0E0E0',
  Squall: '#B2EBF2',
  Tornado: '#EF9A9A',
};

export default function WeatherCard({ data }) {
  if (!data) return null;

  const mainWeather = data.weather[0].main;
  const bgColor = weatherBackgrounds[mainWeather] || '#F0F0F0';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        backgroundColor: bgColor,
        borderRadius: '16px',
        padding: '16px',
        marginTop: '24px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <CardContent>
        <Typography variant="h5" fontWeight="bold">
          {data.name}, {data.sys.country}
        </Typography>
        <Typography variant="h3" mt={1}>
          {Math.round(data.main.temp)}°C
        </Typography>
        <Typography variant="subtitle1" textTransform="capitalize" mt={1}>
          {data.weather[0].description}
        </Typography>
        <Typography variant="body2" mt={1}>
          💧 Humidity: {data.main.humidity}% | 🌬️ Wind: {data.wind.speed} m/s
        </Typography>
      </CardContent>
    </motion.div>
  );
}
