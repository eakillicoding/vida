import React, { useEffect, useState } from "react";
import { Paper, Typography, List, ListItem, ListItemText, Box } from "@mui/material";

function HealthStatus() {
    const [healthData, setHealthData] = useState(null);

    useEffect(() => {
        const storedData = localStorage.getItem("healthData");
        if (storedData) {
            setHealthData(JSON.parse(storedData));
        }
    }, []);

    return (
        <Paper elevation={3} sx={{ padding: 3, margin: "auto", maxWidth: 500, textAlign: "center" }}>
            <Typography variant="h4" gutterBottom>
                Your Health Status
            </Typography>
            {healthData ? (
                <Box>
                    <Typography variant="h5" color={healthData.health_status === "Healthy" ? "green" : "red"}>
                        {healthData.health_status}
                    </Typography>

                    {/* Display Comfort Level */}
                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Comfort Level: {healthData.comfort_level}
                    </Typography>

                    <Typography variant="h6" sx={{ marginTop: 2 }}>
                        Areas for Improvement:
                    </Typography>
                    <List>
                        {healthData.issues.map((issue, index) => (
                            <ListItem key={index}>
                                <ListItemText primary={`- ${issue}`} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            ) : (
                <Typography>Loading...</Typography>
            )}
        </Paper>
    );
}

export default HealthStatus;