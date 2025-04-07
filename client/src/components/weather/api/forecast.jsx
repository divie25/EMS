import { Grid, CardContent, Typography } from '@mui/material';
import moment from 'moment';
import { motion } from 'framer-motion';

const dayColors = {
  Sun: '#FFCDD2',
  Mon: '#C8E6C9',
  Tue: '#BBDEFB',
  Wed: '#FFF9C4',
  Thu: '#D1C4E9',
  Fri: '#FFECB3',
  Sat: '#B2EBF2',
};

export default function Forecast({ forecast }) {
  if (!forecast) return null;

  const daily = forecast.list.filter((_, idx) => idx % 8 === 0);

  return (
    <Grid container spacing={2} mt={2}>
      {daily.map((day, i) => {
        const dayName = moment(day.dt_txt).format('ddd');
        const bgColor = dayColors[dayName] || '#f5f5f5';

        return (
          <Grid item xs={12} sm={6} md={2.4} key={i}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              whileHover={{ scale: 1.05 }}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: bgColor,
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              }}
            >
              <CardContent>
                <Typography variant="subtitle2" fontWeight="bold">{dayName}</Typography>
                <Typography variant="h6">{Math.round(day.main.temp)}°C</Typography>
                <Typography>{day.weather[0].main}</Typography>
              </CardContent>
            </motion.div>
          </Grid>
        );
      })}
    </Grid>
  );
}
