import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DataGrid } from "@mui/x-data-grid";
import Papa from "papaparse";
import { Card, CardContent, Typography, Tabs, Tab, Box } from "@mui/material";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28CFE"];

export default function TreeCoverDashboard() {
  const [extentData, setExtentData] = useState([]);
  const [regionLoss, setRegionLoss] = useState([]);
  const [tab, setTab] = useState(0);

  useEffect(() => {
    fetch("/metadata.csv") // Or replace with the correct file name
      .then((res) => res.text())
      .then((data) => {
        const parsed = Papa.parse(data, { header: true });
        const filtered = parsed.data.filter(
          (d) => d["umd_tree_cover_loss__ha"] && !isNaN(parseFloat(d["umd_tree_cover_loss__ha"]))
        );
        setExtentData(filtered);
        setRegionLoss(filtered);
      });
  }, []);

  const totalExtent = extentData.reduce(
    (sum, row) => sum + parseFloat(row["umd_tree_cover_loss__ha"] || 0),
    0
  );

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        🌍 Tree Cover Dashboard
      </Typography>

      <Box display="flex" gap={2} mb={4}>
        <Card sx={{ flex: 1, p: 2 }}>
          <CardContent>
            <Typography variant="h6">Total Tree Cover Loss (2001)</Typography>
            <Typography variant="h5" fontWeight="bold">
              {totalExtent.toLocaleString()} ha
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Tabs
        value={tab}
        onChange={(e, newValue) => setTab(newValue)}
        aria-label="dashboard tabs"
      >
        <Tab label="Bar Chart by Country" />
        <Tab label="Top 5 Pie Chart" />
        <Tab label="Data Table" />
      </Tabs>

      {tab === 0 && (
        <Box mt={4} height={400}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={regionLoss}>
              <XAxis dataKey="iso" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="umd_tree_cover_loss__ha" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}

      {tab === 1 && (
        <Box mt={4} height={400}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={extentData.slice(0, 5)}
                dataKey="umd_tree_cover_loss__ha"
                nameKey="iso"
                outerRadius={150}
                label
              >
                {extentData.slice(0, 5).map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Box>
      )}

      {tab === 2 && (
        <Box mt={4} height={500}>
          <DataGrid
            rows={extentData.map((row, index) => ({ id: index, ...row }))}
            columns={[
              { field: "iso", headerName: "Country Code", flex: 1 },
              {
                field: "umd_tree_cover_loss__ha",
                headerName: "Tree Cover Loss (ha)",
                flex: 1,
              },
              {
                field: "gfw_gross_emissions_co2e_all_gases__Mg",
                headerName: "Emissions (Mg CO₂e)",
                flex: 1,
              },
            ]}
            pageSize={10}
            rowsPerPageOptions={[10]}
          />
        </Box>
      )}
    </Box>
  );
}
