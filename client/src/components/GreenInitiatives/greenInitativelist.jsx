import React, { useEffect, useState } from "react";
import InitiativeCard from "./cards/greenCards";
import { Box, Grid, Typography } from "@mui/material";
import axios from "axios";

const GreenInitiativeList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/green-initiatives/all").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom textAlign="center">
        🌱 Green Initiatives
      </Typography>
      <Grid container justifyContent="center">
        {data?.map((item) => (
          <InitiativeCard key={item._id} initiative={item} />
        ))}
      </Grid>
    </Box>
  );
};

export default GreenInitiativeList;
