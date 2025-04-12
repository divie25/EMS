import React from 'react';
import { Card, CardContent, Typography, CardMedia, Button, Grid } from '@mui/material';

const LatestNews = ({ articles }) => {
  return (
<CardContent>


  <Grid container spacing={3}>
    {articles.map((article, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column", border: 1, borderColor: 'grey.300', borderRadius: 2 }}>
          <CardMedia
            component="img"
            height="180"
            image={article.urlToImage}
            alt={article.title}
            sx={{ objectFit: 'cover' }}
          />
          <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", p: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold", fontSize: "1rem" }}>
              <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "#1e40af" }}>
                {article.title}
              </a>
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              {article.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Source: {article.source.name}
            </Typography>
            <Button
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              color="primary"
              size="small"
              sx={{ mt: 2, alignSelf: 'flex-start' }}
            >
              Read More
            </Button>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
</CardContent>

  );
};

export default LatestNews;
