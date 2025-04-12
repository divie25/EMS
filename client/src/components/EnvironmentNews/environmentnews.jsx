import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import axios from 'axios';
import { motion } from 'framer-motion';
import LatestNews from './news';

const YOUTUBE_VIDEO_IDS = [
    '9GorqroigqM', // The Story of Stuff
    'X2YgM1Zw4_E', // How to Save the World in 10 Minutes
    'ODni_Bey154', // What is Climate Change?
    'lNJ8OxqN52c', // The Hidden Environmental Cost of Fast Fashion
    '7iwnC5x7-aA', // How We Can End Plastic Pollution

    'U2EXdn2iVK0', // 10 Ways to Live More Sustainably

    'GK_vRtHJZu4&t=32s', // Why Biodiversity Matters

    'F7Id9caYw-Y', // What’s Wrong With Our Food System

    'G4H1N_yXBiA', // How Climate Change is Changing the World

    'JYNpHEVCVb4'  // The Power of Nature in Restoring the Planet
];


const tips = [
    "Turn off lights when not in use.",
    "Use reusable bags and bottles.",
    "Recycle and compost properly.",
    "Save water while brushing teeth.",
    "Plant a tree every year."
];

const NewsAPIKey = '3fad666be93341a8aeb5ad7b1622a935'; // Replace with your NewsAPI key
const NEWS_API_URL = `https://newsapi.org/v2/everything?q=environment&language=en&sortBy=publishedAt&apiKey=${NewsAPIKey}`;

const EnvironmentalDashboard = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(NEWS_API_URL)
            .then(res => setArticles(res.data.articles.slice(0, 5)))
            .catch(err => console.error('News API error:', err));
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {/* Environmental Tips */}
            <motion.div className="col-span-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                <Card className="bg-green-100 shadow-xl">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>🌿 Environmental Tips</Typography>
                        <ul className="list-disc list-inside space-y-1">
                            {tips.map((tip, index) => (
                                <li key={index}>{tip}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            </motion.div>

            {/* News Articles */}
            <motion.div className="col-span-1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }}>
                <Card className="bg-blue-100 shadow-xl">
                    <CardContent>
                        <Typography variant="h6" gutterBottom>📰 Latest Environmental News</Typography>

                        <LatestNews articles={articles} />

                    </CardContent>
                </Card>
            </motion.div>

            {/* YouTube Videos */}
            {/* YouTube Videos */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
            >
                <Card
                    sx={{
                        background: "linear-gradient(to right, #FEF9C3, #FFFBEB, white)",
                        boxShadow: 10,
                        borderRadius: 4,
                        transition: "box-shadow 0.5s ease-in-out",
                        "&:hover": {
                            boxShadow: "0 10px 30px rgba(253, 224, 71, 0.5)",
                        },
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Typography variant="h5" sx={{ color: "#92400e", fontWeight: "bold", mb: 3 }}>
                            📺 Educational Videos
                        </Typography>

                        <Grid container spacing={3}>
                            {YOUTUBE_VIDEO_IDS.map((videoId, index) => (
                                <Grid item xs={12} sm={6} md={4} key={index}>
                                    <Box
                                        sx={{
                                            borderRadius: 3,
                                            overflow: "hidden",
                                            boxShadow: 3,
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                                boxShadow: 6,
                                            },
                                            position: "relative",
                                        }}
                                    >
                                        <iframe
                                            width="100%"
                                            height="220"
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={`Environmental Video ${index + 1}`}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            style={{ borderRadius: "12px" }}
                                        />
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                bottom: 0,
                                                left: 0,
                                                width: "100%",
                                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                                color: "#fff",
                                                fontSize: "0.875rem",
                                                px: 2,
                                                py: 1,
                                            }}
                                        >
                                            Video {index + 1}
                                        </Box>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
};

export default EnvironmentalDashboard;
