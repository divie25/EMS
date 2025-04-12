import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const TreeCoverLossModule = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((json) => {
        const transformed = json
          .map((country) => ({
            iso: country.cca3,
            country: country.name.common,
            loss_ha: Math.floor(Math.random() * 1000000), // Fake loss for demo
          }))
          .sort((a, b) => b.loss_ha - a.loss_ha)
          .slice(0, 10); // Top 10

        setData(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("API error:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h5" gutterBottom>
        🌍 Top 10 Countries by Tree Cover Loss (Simulated)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
         <div style={{padding:"100px"}}>
         <Box height={400} mb={4}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="country" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="loss_ha" fill="#FF8042" />
              </BarChart>
            </ResponsiveContainer>
          </Box>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tree Cover Loss Table
              </Typography>
              <Box height={400}>
                <DataGrid
                  rows={data.map((d, i) => ({ id: i + 1, ...d }))}
                  columns={[
                    { field: "iso", headerName: "ISO", flex: 1 },
                    { field: "country", headerName: "Country", flex: 2 },
                    { field: "loss_ha", headerName: "Loss (ha)", flex: 2 },
                  ]}
                  pageSize={10}
                />
              </Box>
            </CardContent>
          </Card>
         </div>
        </>
      )}
    </Box>
  );
};

export default TreeCoverLossModule;
// Show the top 10 countries that have experienced the highest tree cover loss.