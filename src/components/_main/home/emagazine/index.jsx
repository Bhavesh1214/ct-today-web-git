import React from "react";
import {
  Grid,
  Box,
  Typography,
  Paper,
  CardContent,
  Card,
  CardMedia,
  Chip,
  CardActions,
  Button,
} from "@mui/material";

const Emagazine = () => {
  const issues = [
    { month: "April 2025" },
    { month: "March 2025" },
    { month: "February 2025" },
    { month: "January 2025" },
  ];
  return (
    <Box sx={{ padding: "20px", backgroundColor: "#ffff" }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom sx={{ color: "#14265E" }}>
        E-Magazine
      </Typography>

      {/* Grid Container */}
      <Grid container spacing={3} justifyContent="center">
        {issues.map((issue, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Box sx={{ padding: "10px", textAlign: "center" }}>
              {/* Month Heading */}
              <Typography variant="h6" gutterBottom>
                {issue.month}
              </Typography>

              {/* Placeholder for Content (Box to replicate the blank rectangle) */}
              <img
                src="NBMCW-December-2024.webp"
                style={{
                  width: "100%",
                  height: "300px",
                  border: "2px solid #ccc",
                  marginBottom: "10px",
                }}
              />

              {/* <Box
                sx={{
                  height: "250px",
                  border: "1px solid #ccc",
                  marginBottom: "10px",
                }}
                
              ></Box> */}

              {/* Action Buttons */}

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1, backgroundColor: "#14265E", color: "white" }}
                >
                  View Online
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ flex: 1, backgroundColor: "#14265E", color: "white" }}
                >
                  Download PDF
                </Button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Emagazine;
