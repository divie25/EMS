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
    fetch("https://data-api.globalforestwatch.org/v1/gfw-loss-by-country")
      .then((res) => res.json())
      .then((json) => {
        const result = json.data;

        // Convert and sort
        const transformed = result
          .map((d) => ({
            iso: d.iso,
            country: d.name,
            loss_ha: d.area__ha || 0,
          }))
          .filter((d) => d.loss_ha > 0)
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
        🌍 Top 10 Countries by Tree Cover Loss (ha)
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <>
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
        </>
      )}
    </Box>
  );
};

export default TreeCoverLossModule;
